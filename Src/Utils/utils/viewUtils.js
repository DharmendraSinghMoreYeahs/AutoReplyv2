import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native'
import ViewPort from '../constants/viewPortSizes';

const getHp = (pixels = ViewPort.height) => {
  return hp(((pixels / ViewPort.height) * 100).toFixed(2));
};

const getWp = (pixels = ViewPort.width) => {
  return wp(((pixels / ViewPort.width) * 100).toFixed(2));
};

const { height, width } = Dimensions.get('screen')

export { wp, hp, getHp, getWp, width, height };