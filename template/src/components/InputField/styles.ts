import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '~/themes';
import {normalize} from '~/themes/normalize';

export const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    flex: 1,
    marginLeft: 6,
    fontSize: normalize(12),
    color: Colors.error,
    fontFamily: FontFamily.regular,
  },
});
