import moment from 'moment';
// import {Placeholder} from '../../assets';
// import {timezoneToUTC} from './dateTime';

export const maxNumberArrOfObj = (array, key) => {
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o[key];
    }),
  );
};

export const removeDuplicateFromArr = (array, key) => {
  const counterVar = new Set();

  const filteredArr = array.filter(el => {
    const duplicate = counterVar.has(el[key]);
    counterVar.add(el[key]);
    return !duplicate;
  });
  return filteredArr;
};

export const sortArrayAlphabatically = (arr, key) => {
  return arr.slice().sort((i, j) => {
    if (i[key] > j[key]) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getFirstKeyValueFromObject = obj => {};
export const getTicketRange = tickets => {
  try {
    let range = `$`;
    if (tickets.length == 0) {
      return '';
    }
    if (tickets.length == 1) {
      return range + ' ' + tickets[0].price;
    }
    tickets = tickets.map(t => ({...t, price: Number(t.price)}));
    let sortedPrice = sortArrayAlphabatically(tickets, 'price');
    return (
      range +
      sortedPrice[0].price +
      '-' +
      sortedPrice[sortedPrice.length - 1].price
    );
  } catch (error) {
    console.log(error);
    return '';
  }
};
export const getPartyPhotoInSequence = (partyGallery = []) => {
  let isContainsFileSequence = true;
  partyGallery.map(gal => {
    if (!('fileSequence' in gal) && isContainsFileSequence) {
      isContainsFileSequence = false;
    }
  });
  if (!isContainsFileSequence) {
    return partyGallery;
  }
  return sortArrayAlphabatically(partyGallery.slice(), 'fileSequence');
};
export const getPartyCoverPhoto = (partyGallery = []) => {
  try {
    if (!partyGallery) {
      return Placeholder;
    }
    if (partyGallery && partyGallery?.length == 0) {
      return Placeholder;
    }
    let isContainsFileSequence = true;
    partyGallery.map(gal => {
      if (!('fileSequence' in gal) && isContainsFileSequence) {
        isContainsFileSequence = false;
      }
    });
    if (!isContainsFileSequence) {
      return {uri: partyGallery[0].filePath} ?? Placeholder;
    }
    let sortedGallery = sortArrayAlphabatically(
      partyGallery.slice(),
      'fileSequence',
    );
    if (sortedGallery[0] && typeof sortedGallery[0] == 'object') {
      return {uri: sortedGallery[0].filePath};
    } else {
      return Placeholder;
    }
  } catch (error) {
    return Placeholder;
  }
};

export const filterArrayByDate = (
  arr = [],
  mode = 'desc',
  dateKey = 'createdAt',
) => {
  return arr.sort(function (a, b) {
    if (
      a != null &&
      b != null &&
      typeof a == 'object' &&
      typeof b == 'object' &&
      dateKey in a &&
      dateKey in b
    ) {
      if (mode == 'desc') {
        return moment(a[dateKey]).isBefore(moment(b[dateKey]));
      } else {
        return moment(b[dateKey]).isBefore(moment(a[dateKey]));
      }
    } else {
      return false;
    }
  });
};

export const filterPartyOnFutureAndPast = (parties = []) => {
  let futureParties = [];
  let pastParties = [];

  parties.map(party => {
    let partyTime = timezoneToUTC(party.date);
    let currentTime = new Date();
    if (partyTime.getTime() > currentTime.getTime()) {
      futureParties.push(party);
    } else {
      pastParties.push(party);
    }
  });
  futureParties = filterArrayByDate(futureParties, 'desc', 'date');
  pastParties = filterArrayByDate(pastParties, 'desc', 'date');
  return {
    futureParties,
    pastParties,
  };
};

/*

let pDate = new Date('2021-08-13T17:15:27.000Z');
    let cDate = new Date();
    console.log("PARTY_DATE - ", pDate);
    console.log("CURERNT_DATe - ", cDate); 
    console.log("PTIMETO_IN_UTC - ", timezoneToUTC(pDate));
    */
