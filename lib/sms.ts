import { card } from "./card";
import { fillIntro, formatMeetTime, smsHref } from "./format";

export { formatMeetTime, smsHref };

export function smsIntroBody(now = new Date()) {
  return fillIntro(card.smsIntro, formatMeetTime(now));
}

export function exchangeSmsHref(now = new Date(), userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent) {
  return smsHref(card.phone, smsIntroBody(now), userAgent);
}
