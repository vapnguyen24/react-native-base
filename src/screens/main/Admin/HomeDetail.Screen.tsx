import {SafeAreaView, Text} from 'react-native';
import {styles} from '~/screens/main/Admin/styles';
import AddDriverForm from '~/components/Forms/AddDriver.Form';
import {AddDriverBody} from '~/common/models/driver.model';
import {useMutation, useQueryClient} from 'react-query';
import {addDriver} from '~/common/api/driver.api';

const HomeDetailScreen = () => {
  const queryClient = useQueryClient();
  const AddDriverMutation = useMutation(addDriver, {
    onSuccess: async data => {
      console.log('data', data);
      await queryClient.invalidateQueries('listAllDriver');
    },
    onError: error => {
      console.log('error', error);
    },
  });
  const handleSubmit = async (values: AddDriverBody) => {
    await AddDriverMutation.mutateAsync(values);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <AddDriverForm handleSubmit={handleSubmit} />
    </SafeAreaView>
  );
};
export default HomeDetailScreen;
