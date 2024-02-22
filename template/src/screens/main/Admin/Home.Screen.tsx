import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {styles} from '~/screens/main/Admin/styles';
import {Button, Divider, FAB} from 'react-native-paper';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getALLDriver} from '~/common/api/driver.api';
import {Driver} from '~/common/models/driver.model';
import {requestNavigate} from '~/services/NavigationService';
import BaseList from '~/components/List/BaseList';
import {useEffect, useState} from 'react';

const HomeScreen = () => {
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['listAllDriver'], getALLDriver, {
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPage ? lastPage.page + 1 : undefined,
  });

  useEffect(() => {
    if (data?.pages) {
      let temp: Driver[] = [];
      data?.pages.forEach(item => {
        temp = [...temp, ...item.data];
      });
      setDriverList(temp);
    }
  }, [data?.pages]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleRefresh = async () => {
    await refetch();
  };

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  const _renderItem = ({item}: {item: Driver}) => {
    return (
      <View style={{margin: 20}}>
        <Text>{item.id}</Text>
        <View style={{height: 10}} />
        <Text>{item.fullName}</Text>
        <View style={{height: 10}} />
        <Text>{item.userName}</Text>
        <View style={{height: 10}} />
        <Divider />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BaseList
        data={driverList}
        renderItem={_renderItem}
        keyExtractor={(item: Driver) => item.id.toString()}
        handleRefresh={handleRefresh}
        handleLoadMore={handleLoadMore}
      />
      <FAB
        style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
        icon="plus"
        onPress={() => requestNavigate('HomeDetail')}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
