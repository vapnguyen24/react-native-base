import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthReducer} from '~/common/reduxs/reducers/auth.reducer';
import {RootReducerName} from '~/common/reduxs/reducers/type';
import {CommonReducer} from '~/common/reduxs/reducers/common.reducer';

const rootReducer = combineReducers({
  [RootReducerName.auth]: AuthReducer,
  [RootReducerName.common]: CommonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  timeout: 30000,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
