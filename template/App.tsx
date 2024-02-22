/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Root as AlertNotificationRoot} from '~/components/Toast/containers/Root';
import AppContainer from '~/navigator/AppContainer';
import {store, persistor} from '~/common/reduxs/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertNotificationRoot>
            <AppContainer />
          </AlertNotificationRoot>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};
export default App;
