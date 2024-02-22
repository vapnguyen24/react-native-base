import {ALERT_TYPE} from '~/components/Toast/config/ENV';

export interface NotifyText {
  title: string;
  textBody: string;
}

export interface Notify extends NotifyText {
  type: ALERT_TYPE;
}

export interface CommonState {
  toast?: Notify;
  isLoading?: boolean;
}
