import * as React from 'react';
import {ReactElement, useContext} from 'react';
import RN, {StyleSheet, View} from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {IConfigToast, Toast} from './Toast';
import {Dialog, IConfigDialog} from './Dialog';
import {Color, IColors} from '../service';

type IProps = {
  toastConfig?: Pick<
    IConfigToast,
    'autoClose' | 'titleStyle' | 'textBodyStyle'
  >;
  dialogConfig?: Pick<IConfigDialog, 'closeOnOverlayTap' | 'autoClose'>;
  theme?: 'light' | 'dark';
  colors?: [IColors, IColors] /** ['light_colors' , 'dark_colors'] */;
  children: ReactElement | ReactElement[];
};

export const Root: React.FunctionComponent<IProps> = ({
  theme,
  colors,
  children,
  toastConfig,
  dialogConfig,
}) => {
  const colorScheme = RN.useColorScheme?.();
  const safeAreaInsetsContext = useContext(SafeAreaInsetsContext);
  Color.colorsCustom = colors;

  const isDark = (theme ?? colorScheme) === 'dark';

  if (safeAreaInsetsContext === null) {
    return (
      <SafeAreaProvider>
        <View style={styles.content}>
          <React.Fragment>
            <Toast ref={Toast.instance} isDark={isDark} config={toastConfig} />
            <Dialog
              ref={Dialog.instance}
              isDark={isDark}
              config={dialogConfig}
            />
            {children}
          </React.Fragment>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <View style={styles.content}>
      <React.Fragment>
        <Toast ref={Toast.instance} isDark={isDark} config={toastConfig} />
        <Dialog ref={Dialog.instance} isDark={isDark} config={dialogConfig} />
        {children}
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
