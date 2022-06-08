import { wp, hp, getHp, getWp, width, height } from "./viewUtils";
import { FONTSIZE, FONTFAMILY } from "./fontSize";
import { DRAWERNAV, setDrawerNav } from "./navigationService";
import { transformFirebaseValues, getLargeNum } from "./firebaseUtils";
import {
  maxNumberArrOfObj,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
  getTicketRange,
  getPartyCoverPhoto,
  getPartyPhotoInSequence,
  filterArrayByDate,
  filterPartyOnFutureAndPast,
} from "./array";
import {
  getFromToDate,
  toCurrentTimeZone,
  filterArrOnDate,
  timezoneToUTC,
  wait,
  dateTimeAgo,
} from "./dateTime";
import { smallHitSlop, bigHitSlop } from "./hitSlop";
import { validateEmail, validatePass } from "./validation";
import Strings from "./String";
import RegexCollection from "./regexCollection";

export {
  RegexCollection,
  Strings,
  wait,
  filterPartyOnFutureAndPast,
  filterArrayByDate,
  getPartyPhotoInSequence,
  getPartyCoverPhoto,
  FONTFAMILY,
  validateEmail,
  validatePass,
  width,
  height,
  smallHitSlop,
  bigHitSlop,
  wp,
  hp,
  getHp,
  getWp,
  FONTSIZE,
  transformFirebaseValues,
  maxNumberArrOfObj,
  getFromToDate,
  getLargeNum,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
  toCurrentTimeZone,
  filterArrOnDate,
  timezoneToUTC,
  getTicketRange,
  dateTimeAgo,
};
