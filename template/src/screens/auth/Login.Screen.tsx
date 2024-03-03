import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {styles} from '~/screens/auth/styles';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '~/hooks/useRedux';
import {useMutation} from 'react-query';
import {LoginBody, LoginResponse} from '~/common/models/auth.model';
import {getUserInfo} from '~/common/reduxs/reducers/auth.reducer';
import {getCurrentUser, login} from '~/common/api/auth.api';
import {requestReplaceRoute} from '~/services/NavigationService';
import Storage from '~/utils/storage';
import {notifyToastWarning} from '~/common/reduxs/reducers/common.reducer';
import {useTheme} from '~/themes/themes';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();

  const LoginMutation = useMutation<LoginResponse, unknown, LoginBody, unknown>(
    login,
    {
      onSuccess: async data => {
        if (data.statusCode === 201) {
          const response: any = await getCurrentUser();
          console.log(response.data.company.id);
          await Storage.setItem('hashInfo', {
            idUser: response?.data?.id,
            idCompany: response?.data?.company?.id,
            userName: response?.data?.userName,
          });
          dispatch(getUserInfo(response.data));
          requestReplaceRoute('Home');
        } else {
          dispatch(
            notifyToastWarning({
              title: 'Login failed',
              textBody: data.message,
            }),
          );
        }
      },
    },
  );

  const getTokenText = async () => {
    // await LoginMutation.mutateAsync({
    //   username: 'admin',
    //   password: '@Password123',
    // });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Login Screen</Text>
      <Button
        style={{backgroundColor: colors.primary}}
        mode="contained"
        onPress={() => getTokenText()}>
        Press me
      </Button>

      <View style={{}} />
    </SafeAreaView>
  );
};
export default LoginScreen;

const {colors} = useTheme();
const stylesV1 = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: 200,
    height: 200,
  },
});
