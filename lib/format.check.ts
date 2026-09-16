import assert from "node:assert/strict";
import {
  escapeVcard,
  fillIntro,
  formatMeetTime,
  isE164,
  calEmbedLink,
  isCalLink,
  isEmail,
  isWhatsAppUrl,
  safeHttpsUrl,
  smsHref,
  vcardFilename,
} from "./format.ts";

assert.equal(escapeVcard("Yaltopia; Tech, Inc"), "Yaltopia\\; Tech\\, Inc");
assert.equal(escapeVcard("line\r\ninject"), "line\\ninject");
assert.equal(vcardFilename('mikias"; filename=evil'), "mikiasfilenameevil.vcf");
assert.equal(isE164("+251947357283"), true);
assert.equal(isE164(""), false);
assert.equal(isEmail("mikias-ayenew@yaltopia.com"), true);
assert.equal(isEmail("x@y\nz.com"), false);
assert.equal(safeHttpsUrl("javascript:alert(1)"), "");
assert.equal(safeHttpsUrl("http://yaltopiatech.com"), "");
assert.equal(safeHttpsUrl("https://www.yaltopiatech.com"), "https://www.yaltopiatech.com/");
assert.equal(isWhatsAppUrl("https://wa.me/251947357283"), true);
assert.equal(isWhatsAppUrl("https://evil.example/wa.me"), false);
assert.equal(isCalLink("kirubel-mesfin-yaltopia/30min"), true);
assert.equal(isCalLink("https://cal.com/hiskel/15min"), true);
assert.equal(calEmbedLink("https://cal.com/hiskel/15min"), "hiskel/15min");
assert.equal(calEmbedLink("https://app.cal.com/hiskel/15min"), "hiskel/15min");
assert.equal(isCalLink("https://evil.example/hiskel/15min"), false);
assert.equal(isCalLink("javascript:alert(1)"), false);
assert.equal(smsHref("not-a-phone", "hi"), "");
assert.equal(fillIntro("Hi — we met on {when}.", "Thursday, 10 Sep 2026 at 4:47 pm"), "Hi — we met on Thursday, 10 Sep 2026 at 4:47 pm.");

const when = formatMeetTime(new Date("2026-09-10T16:47:00"));
assert.match(when, /2026/);
assert.match(when, /10/);

assert.equal(
  smsHref("+251983032475", "hello world", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)"),
  "sms:+251983032475&body=hello%20world",
);
assert.equal(
  smsHref("+251983032475", "hello world", "Mozilla/5.0 (Linux; Android 14)"),
  "sms:+251983032475?body=hello%20world",
);

console.log("ok");
