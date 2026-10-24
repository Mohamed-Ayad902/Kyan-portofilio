/**
 * Kayan website: quote requests → Google Sheet + email.
 *
 * Paste this file into the Apps Script editor of the spreadsheet that should collect the requests
 * (Extensions → Apps Script), run `setup` once, then deploy it as a web app. Full steps are in
 * integrations/google-sheets/README.md. The website's /api/quote route posts each validated request
 * here and only tells the visitor it was sent when this script answers { ok: true }.
 */

const SHEET_NAME = "Quote requests";
const DEFAULT_TO = "kayanequipment@gmail.com";
const TIME_ZONE = "Africa/Cairo";

// Column order in the sheet. Keys match the `fields` object the website sends.
const COLUMNS = [
  ["timestamp", "Timestamp"],
  ["name", "Name"],
  ["company", "Company"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["equipment", "Equipment"],
  ["location", "Project location"],
  ["duration", "Rental period"],
  ["startDate", "Start date"],
  ["operator", "Operator"],
  ["preferred", "Preferred contact"],
  ["message", "Project description"],
  ["locale", "Site language"],
  ["id", "Request ID"],
];

/** Run once from the editor: creates the tab and header row, sets the time zone, makes the secret. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIME_ZONE);
  sheet_();
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty("QUOTE_SECRET");
  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
    props.setProperty("QUOTE_SECRET", secret);
  }
  if (!props.getProperty("QUOTE_TO_EMAIL")) props.setProperty("QUOTE_TO_EMAIL", DEFAULT_TO);
  console.log("QUOTE_SHEET_SECRET for Vercel:\n" + secret);
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_({ ok: false, error: "bad_request" });
  }
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty("QUOTE_SECRET");
  if (!secret || !data || data.secret !== secret || !data.fields) return reply_({ ok: false, error: "forbidden" });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    // The site retries with the same id after a timeout; don't record the same request twice.
    const cache = CacheService.getScriptCache();
    const cacheKey = data.id ? "quote:" + String(data.id).slice(0, 80) : "";
    if (cacheKey && cache.get(cacheKey)) return reply_({ ok: true, duplicate: true });

    const now = new Date();
    let saved = false;
    let emailed = false;
    try {
      append_(data, now);
      saved = true;
    } catch (err) {
      console.error("append failed: " + err);
    }
    try {
      mail_(data, now, props.getProperty("QUOTE_TO_EMAIL") || DEFAULT_TO);
      emailed = true;
    } catch (err) {
      console.error("email failed: " + err);
    }
    if ((saved || emailed) && cacheKey) cache.put(cacheKey, "1", 21600);
    return reply_({ ok: saved || emailed, saved: saved, emailed: emailed });
  } finally {
    lock.releaseLock();
  }
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map((c) => c[1]));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");
  }
  return sheet;
}

function append_(data, now) {
  const f = data.fields;
  const row = COLUMNS.map(([key]) => {
    if (key === "timestamp") return now;
    if (key === "id") return cell_(data.id);
    return cell_(f[key]);
  });
  sheet_().appendRow(row);
}

function mail_(data, now, to) {
  const when = Utilities.formatDate(now, TIME_ZONE, "yyyy-MM-dd HH:mm") + " (Cairo)";
  const options = { name: "Kayan website" };
  const email = String(data.fields.email || "");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) options.replyTo = email;
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const body = String(data.text || "") + "\n\nReceived: " + when + "\nAll requests: " + url;
  MailApp.sendEmail(to, String(data.subject || "Quote request").slice(0, 200), body, options);
}

// Text that starts with = + - @ would be run as a formula (a phone like +20… included). Keep it text.
function cell_(value) {
  const text = value == null ? "" : String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
