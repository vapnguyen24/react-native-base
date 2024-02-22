import type {ImageRequireSource} from 'react-native';
import {ALERT_TYPE} from '../config/ENV';
import images from '~/themes/images';

export const getImage = (type: ALERT_TYPE): ImageRequireSource => {
  switch (type) {
    case ALERT_TYPE.SUCCESS:
      return images.success;
    case ALERT_TYPE.WARNING:
      return images.warning;
    case ALERT_TYPE.DANGER:
      return images.danger;
    case ALERT_TYPE.INFO:
      return images.info;
  }
};
