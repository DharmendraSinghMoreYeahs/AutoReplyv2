import moment from 'moment';

export const getFromToDate = (from, to) => {
  let fromm = new Date(from);
  let too = new Date(to);
  let fromDate = moment(fromm).format('MMM DD');
  let toDate = moment(too).format('MMM DD');
  console.log(toDate);
  if (toDate == 'Invalid date' || fromDate == 'Invalid date') {
    return '';
  }

  return `From ${fromDate} To ${toDate}`;
};

export const toCurrentTimeZone = date => {
  let dt = moment(date);
  let timeOffset = new Date().getTimezoneOffset();
  if (timeOffset > 0) {
    dt.add(Math.abs(timeOffset), 'minute');
  } else {
    dt.subtract(Math.abs(timeOffset), 'minute');
  }
  return dt.toDate();
};

export const filterArrOnDate = arr => {
  return arr.sort(function compare(a, b) {
    var dateA = new Date(a.createdAt);
    var dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
};

export const timezoneToUTC = actualDT => {
  let value = new Date();
  if (actualDT) {
    value = new Date(actualDT);
  }
  let diff = new Date().getTimezoneOffset() * 60000;
  return new Date(value.getTime() + diff);
};

export const wait = async (time = 1000) => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });
};

export const dateTimeAgo = (dateTime = new Date()) => {
  let momentCreatedData = moment(dateTime);
  let currentMoment = moment();
  let agoText = '';
  let minute = currentMoment.diff(momentCreatedData, 'minute');
  let passedMinutes = currentMoment.diff(momentCreatedData, 'minutes');
  let passedHours = currentMoment.diff(momentCreatedData, 'hours');
  let passedDays = currentMoment.diff(momentCreatedData, 'days');
  let passedMonths = currentMoment.diff(momentCreatedData, 'months');
  let passedYears = currentMoment.diff(momentCreatedData, 'years');
  console.log(minute, passedMinutes);
  if (minute == 0 || minute == -1) {
    agoText = 'added recently';
  } else if (passedMinutes < 60) {
    agoText = `${passedMinutes} minute${passedMinutes > 1 ? 's' : ''} ago`;
  } else if (passedHours < 24) {
    agoText = `${passedHours} hour${passedHours > 1 ? 's' : ''} ago`;
  } else if (passedDays < 31) {
    agoText = `${passedDays} day${passedDays > 1 ? 's' : ''} ago`;
  } else if (passedMonths > 0 && passedMonths < 12) {
    agoText = `${passedMonths} month${passedMonths > 1 ? 's' : ''} ago`;
  } else {
    agoText = `${passedYears} year${passedYears > 1 ? 's' : ''} ago`;
  }
  return agoText;
};
