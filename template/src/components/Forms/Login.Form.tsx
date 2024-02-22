import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import {View} from 'react-native';
import InputField from '~/components/InputField/InputField';
import {Button} from 'react-native-paper';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Vui lòng nhập tài khoản'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
});

interface Props {}

interface LoginFormType {
  username: string;
  password: string;
}

const LoginForm = (props: Props) => {
  const initialValues: LoginFormType = {
    username: '',
    password: '',
  };
  const handleSubmit1 = (values: LoginFormType) => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit1}
      validationSchema={validationSchema}>
      {({handleSubmit}) => {
        return (
          <View>
            <Field
              name="username"
              label="Tài khoản"
              component={InputField}
              keyboardType="default"
              placeholder="Tài khoản"
              isNumberMode
              secureTextEntry={true}
            />
            <Button mode="outlined" onPress={() => handleSubmit()} dark>
              Submit
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};
export default LoginForm;
