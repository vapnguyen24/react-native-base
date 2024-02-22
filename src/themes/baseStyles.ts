import {StyleSheet} from 'react-native';
import Colors from '~/themes/colors';
import Metrics from '~/themes/metrics';

export const baseStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
});

export default baseStyles;
