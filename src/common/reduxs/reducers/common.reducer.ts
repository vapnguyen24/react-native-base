import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootReducerName} from '~/common/reduxs/reducers/type';
import {CommonState, Notify, NotifyText} from '~/common/models/common.model';
import {ALERT_TYPE} from '~/components/Toast/config/ENV';

const defaultCommonState: CommonState = {
  isLoading: false,
  toast: undefined,
};

const commonSlice = createSlice({
  name: RootReducerName.common,
  initialState: defaultCommonState,
  reducers: {
    showLoading(state: CommonState) {
      state.isLoading = true;
    },
    hideLoading(state: CommonState) {
      state.isLoading = false;
    },
    notifyToast(state: CommonState, action: PayloadAction<Notify>) {
      state.toast = action.payload;
    },
    notifyToastSuccess(state: CommonState, action: PayloadAction<NotifyText>) {
      state.toast = {
        type: ALERT_TYPE.SUCCESS,
        ...action.payload,
      };
    },
    notifyToastDanger(state: CommonState, action: PayloadAction<NotifyText>) {
      state.toast = {
        type: ALERT_TYPE.DANGER,
        ...action.payload,
      };
    },
    notifyToastWarning(state: CommonState, action: PayloadAction<NotifyText>) {
      state.toast = {
        type: ALERT_TYPE.WARNING,
        ...action.payload,
      };
    },
    clearToastState(state: CommonState) {
      state.toast = undefined;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  notifyToast,
  notifyToastSuccess,
  notifyToastDanger,
  notifyToastWarning,
  clearToastState,
} = commonSlice.actions;
export const CommonReducer = commonSlice.reducer;
