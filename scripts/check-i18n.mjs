// Compares every dictionary with English: same keys, same array lengths, no empty strings.
// TypeScript already enforces the shape; this also catches empty and untranslated-looking values.
import en from "../src/dictionaries/en.ts";
import ar from "../src/dictionaries/ar.ts";
import zh from "../src/dictionaries/zh.ts";

const problems = [];
const allowedSame = /^(|Kayan|WhatsApp|EN|.*@.*|[+\d\s]+|%s.*|\d+ .* St\.)$/; // brand, contact data, street address

function walk(ref, other, path, lang) {
  if (Array.isArray(ref)) {
    if (!Array.isArray(other)) return problems.push(`${lang}: ${path} should be an array`);
    if (ref.length !== other.length) problems.push(`${lang}: ${path} has ${other.length} items, English has ${ref.length}`);
    ref.forEach((v, i) => walk(v, other[i], `${path}[${i}]`, lang));
  } else if (ref && typeof ref === "object") {
    for (const key of Object.keys(ref)) {
      if (!(key in (other ?? {}))) problems.push(`${lang}: missing ${path}.${key}`);
      else walk(ref[key], other[key], `${path}.${key}`, lang);
    }
  } else if (typeof ref === "string") {
    if (typeof other !== "string") problems.push(`${lang}: ${path} should be a string`);
    else if (ref && !other.trim()) problems.push(`${lang}: ${path} is empty`);
    else if (ref.length > 12 && ref === other && !allowedSame.test(ref)) problems.push(`${lang}: ${path} is identical to English`);
  }
}

walk(en, ar, "ar", "ar");
walk(en, zh, "zh", "zh");

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("i18n: ar and zh match the English dictionary.");
