import {RootReducerName} from '~/common/reduxs/reducers/type';
import {CommonState} from '~/common/models/common.model';

export const getLoadingState = (state: {
  root: {[RootReducerName.common]: CommonState};
}) => state.root.common.isLoading;

export const getToastMessage = (state: {
  root: {[RootReducerName.common]: CommonState};
}) => state.root.common.toast;
