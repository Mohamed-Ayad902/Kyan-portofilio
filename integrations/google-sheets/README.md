# Quote requests → Google Sheet + email

`Code.gs` is a Google Apps Script web app. The website's `/api/quote` route sends it every validated quote request; the script adds a row to a Google Sheet (timestamp plus every form field) and emails the request to `kayanequipment@gmail.com`, with Reply-To set to the visitor's email. It is free and runs on the Google account that owns the sheet.

The site only shows "sent" when the script answers `{ "ok": true }`, which means the row was saved, the email was sent, or both. Anything else (wrong secret, script error, timeout) shows the error box with the email / WhatsApp / phone fallbacks.

## Set it up (once, about 10 minutes)

Do this signed in to the Google account that should own the sheet. Using `kayanequipment@gmail.com` itself is best: the notification emails are then sent from Kayan's own address.

1. Open [sheets.new](https://sheets.new) and name the spreadsheet, e.g. "Kayan quote requests".
2. In the sheet, open **Extensions → Apps Script**. Delete what is in `Code.gs` and paste the whole of `integrations/google-sheets/Code.gs` from this repo. Save (Ctrl/Cmd + S).
3. In the function dropdown next to **Run**, pick `setup` and click **Run**. Google asks for permission: choose your account, then **Advanced → Go to (project name) (unsafe) → Allow**. This is your own script asking for access to your sheet and to send email as you.
4. Open **View → Execution log** (or the log panel that opens). Copy the long code after `QUOTE_SHEET_SECRET for Vercel:`. A "Quote requests" tab with headers now exists in the sheet.
5. Click **Deploy → New deployment**. Under the gear icon pick **Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
6. In Vercel, open project **kyan → Settings → Environment Variables** and add, for Production (and Preview if you want previews to send too):
   - `QUOTE_SHEET_URL` = the Web app URL from step 5
   - `QUOTE_SHEET_SECRET` = the code from step 4
7. Redeploy: **Deployments → latest production deployment → ⋯ → Redeploy**. Environment variables only apply to new deployments.
8. Send a test request from the contact page. A row should appear in the sheet and an email in the inbox within a few seconds.

"Anyone" access is safe here: the script refuses any request without the secret, and the secret only lives in Vercel and in the script's properties.

## Changing things later

- **Different recipient:** in Apps Script, **Project Settings → Script Properties**, edit `QUOTE_TO_EMAIL`. Several addresses can be comma-separated.
- **New secret:** delete the `QUOTE_SECRET` property, run `setup` again, and update `QUOTE_SHEET_SECRET` in Vercel.
- **Editing `Code.gs`:** after saving, use **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. This keeps the same URL. A *new* deployment would give a new URL that Vercel doesn't know.

## Limits

A free Gmail account can send about 100 emails a day through Apps Script (Google Workspace: 1,500). If that runs out, rows are still saved and the visitor still gets "sent"; the email for those requests just doesn't go out until the next day's quota. Check the sheet if the inbox seems quiet.
