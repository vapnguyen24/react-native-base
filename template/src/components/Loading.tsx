import {useAppSelector} from '~/hooks/useRedux';
import {getLoadingState} from '~/common/reduxs/selectors/common.selector';
import {ActivityIndicator, Text, View} from 'react-native';
import {BaseStyles} from '~/themes';
import colors from '~/themes/colors';
import React from 'react';

const Loading = () => {
  const isLoading = useAppSelector(getLoadingState);
  return (
    <>
      {isLoading ? (
        <View style={BaseStyles.loadingContainer}>
          <View style={BaseStyles.row}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={{color: colors.primary, marginLeft: 20}}>
              Đang xử lý
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};
export default Loading;
