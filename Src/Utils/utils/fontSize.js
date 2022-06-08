import {getWp} from './viewUtils';

const computeFontSize = (maxFont = 60) => {
  let key = 'Text';
  let obj = {};
  for (let i = 1; i <= maxFont; i++) {
    obj = {...obj, [`${key}${i}`]: getWp(i)};
  }
  return obj;
};
export const FONTSIZE = {
  ...computeFontSize(),
};

export const FONTFAMILY = {
  AvenirNextRegular: 'AvenirNext-Regular',
  AvenirNextBold: 'AvenirNext-Bold',
  AvenirNextBoldItalic: 'AvenirNext-BoldItalic',
  AvenirNextDemiBold: 'AvenirNext-DemiBold',
  AvenirNextDemiBoldItalic: 'AvenirNext-DemiBoldItalic',
  AvenirNextHeavy: 'AvenirNext-Heavy',
  AvenirNextHeavyItalic: 'AvenirNext-HeavyItalic',
  AvenirNextItalic: 'AvenirNext-Italic',
  AvenirNextMediumItalic: 'AvenirNext-MediumItalic',
  AvenirNextBold: 'AvenirNext-Bold',
  AvenirNextMedium: 'AvenirNext-Medium',
  AvenirNextRegular: 'AvenirNext-Regular',
  AvenirNextUltraLight: 'AvenirNext-UltraLight',
};
