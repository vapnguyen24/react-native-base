import {colors, ThemeColor} from '~/themes/colors';
import {useAppSelector} from '~/hooks/useRedux';

export type ThemeColors = {[key: string]: string};

export type Theme = {
  colors: ThemeColors | ThemeColor['light'];
};

export const theme = {
  light: {
    colors: colors.light,
  },
  dark: {
    colors: colors.dark,
  },
};

export const useTheme = () => {
  const {theme: themeStore} = useAppSelector(state => state.root.theme);
  return {colors: theme[themeStore].colors} as Theme; // here
};
