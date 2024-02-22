import React, {useEffect} from 'react';
import {AppState, AppStateStatus, Platform, View} from 'react-native';
import AppStack from './AppStack';
import SplashScreen from 'react-native-splash-screen';
import {BaseStyles} from '~/themes';
import {useAppDispatch, useAppSelector} from '~/hooks/useRedux';
import {getToastMessage} from '~/common/reduxs/selectors/common.selector';
import {Toast} from '~/components/Toast/containers/Toast';
import {clearToastState} from '~/common/reduxs/reducers/common.reducer';
import Loading from '~/components/Loading';
import {focusManager} from 'react-query';

export type StackParamList = {
  Test: undefined;
  Login: undefined;
  Home: undefined;
  HomeDetail: undefined;
};

const AppContainer = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const dispatch = useAppDispatch();
  const toastMessage = useAppSelector(getToastMessage);

  /**
   * This useEffect hook is responsible for displaying a toast message whenever one is available.
   * It listens for changes in the `dispatch` and `toastMessage` variables.
   *
   * @effect
   *
   * @listens dispatch - The dispatch function from Redux.
   * @listens toastMessage - The toast message object from the Redux state.
   *
   * @callback
   * If `toastMessage` is truthy, it calls the `Toast.show` function with an object containing the following properties:
   * - type: The type of the toast message.
   * - title: The title of the toast message.
   * - textBody: The body text of the toast message.
   * - onHide: A callback function that dispatches the `clearToastState` action when the toast is hidden.
   */
  useEffect(() => {
    if (toastMessage) {
      Toast.show({
        type: toastMessage.type,
        title: toastMessage.title,
        textBody: toastMessage.textBody,
        onHide: () => dispatch(clearToastState()),
      });
    }
  }, [dispatch, toastMessage]);

  /**
   * This function is triggered when the app's state changes.
   * It sets the focus of the app based on the current state.
   *
   * @param {AppStateStatus} status - The current state of the app.
   */
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  /**
   * This useEffect hook is responsible for listening to changes in the app's state.
   * It adds an event listener for the 'change' event of the AppState.
   * When the component is unmounted, it removes the event listener.
   *
   * @effect
   *
   * @listens AppState.change - The 'change' event of the AppState.
   *
   * @callback
   * Calls the `onAppStateChange` function when the 'change' event is triggered.
   * Removes the event listener when the component is unmounted.
   */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={BaseStyles.mainContainer}>
      <AppStack />
      <Loading />
    </View>
  );
};

export default AppContainer;
