import { card } from "./card";
import { escapeVcard } from "./format";

export function buildVcard() {
  const { person, email, website } = card;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVcard(person.lastName)};${escapeVcard(person.firstName)};;;`,
    `FN:${escapeVcard(person.name)}`,
    ...(person.company ? [`ORG:${escapeVcard(person.company)}`] : []),
    ...(person.role ? [`TITLE:${escapeVcard(person.role)}`] : []),
    ...(email ? [`EMAIL;TYPE=INTERNET,WORK:${email}`] : []),
    ...(website ? [`URL;TYPE=WORK:${website}`] : []),
    "END:VCARD",
  ].join("\r\n");
}

export function downloadVcard() {
  const blob = new Blob([buildVcard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${card.fileStem}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}
