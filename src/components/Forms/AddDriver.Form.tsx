import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import {View} from 'react-native';
import InputField from '~/components/InputField/InputField';
import {Button} from 'react-native-paper';
import {AddDriverBody} from '~/common/models/driver.model';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập ho ten'),
  userName: Yup.string().required('Vui lòng nhập tai khoan'),
});

interface Props {
  handleSubmit: (values: AddDriverBody) => void;
}

const AddDriverForm = (props: Props) => {
  const initialValues: AddDriverBody = {
    fullName: '',
    userName: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.handleSubmit}
      validationSchema={validationSchema}>
      {({handleSubmit}) => {
        return (
          <View style={{margin: 16}}>
            <Field
              name="userName"
              label="Tài khoản"
              component={InputField}
              keyboardType="default"
              placeholder="Nhap ten tai khoan"
            />
            <View style={{height: 12}} />
            <Field
              name="fullName"
              label="Ho va ten"
              component={InputField}
              keyboardType="default"
              placeholder="Nhap ten tai xe"
            />
            <View style={{height: 12}} />
            <Button mode="outlined" onPress={() => handleSubmit()} dark>
              Submit
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};
export default AddDriverForm;
