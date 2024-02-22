import {SafeAreaView, Text} from 'react-native';
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

const LoginScreen = () => {
  const dispatch = useAppDispatch();

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
      <Button mode="contained" onPress={() => getTokenText()}>
        Press me
      </Button>
    </SafeAreaView>
  );
};
export default LoginScreen;
