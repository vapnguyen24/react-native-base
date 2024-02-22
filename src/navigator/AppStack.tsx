import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './AppContainer';
import React from 'react';
import {navigationRef} from '~/services/NavigationService';
import routes from '~/navigator/routes';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '~/screens/auth/Login.Screen';
import HomeScreen from '~/screens/main/Admin/Home.Screen';
import HomeDetailScreen from '~/screens/main/Admin/HomeDetail.Screen';
import TestScreen from '../../TestScreen';

const Stack = createStackNavigator<StackParamList>();

const AppStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/*<Stack.Screen name={routes.TEST} component={TestScreen} />*/}
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={routes.HOME} component={HomeScreen} />
        <Stack.Screen name={routes.HOME_DETAIL} component={HomeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppStack;
