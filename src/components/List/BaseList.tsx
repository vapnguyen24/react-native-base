// @ts-nocheck
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Colors} from '~/themes';
import {normalize} from '~/themes/normalize';

interface Props {
  data: any;
  renderItem: any;
  initialNumToRender?: number;
  inverted?: boolean;
  numColumns?: number;
  handleLoadMore?: any;
  handleRefresh?: any;
  horizontal?: boolean;
  refreshing?: boolean;
  loading: boolean;
  enableSearch?: boolean;
  searchText?: string;
  onChangeText?: any;
  onPressItem?: any;
  emptyText?: string;
  renderEmpty?: any;
  ListHeaderComponent?: any;
  keyExtractor?: any;
}

class BaseList extends React.Component<Props> {
  // Set default prop values
  static defaultProps = {
    data: [],
    renderItem: () => {
      return <View />;
    },
    initialNumToRender: 20,
    inverted: false,
    numColumns: 1,
    handleLoadMore: () => {},
    handleRefresh: () => {},
    horizontal: false,
    refreshing: false,
    loading: false,
    enableSearch: false,
    searchText: '',
    renderEmpty: undefined,
  };

  constructor(props: Props) {
    super(props);
  }

  //render error view
  renderError = () => {
    return (
      <View>
        <Text selectable={true}>Oops!!!</Text>
      </View>
    );
  };

  //render separator view
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '80%',
          backgroundColor: '#eee',
          alignSelf: 'center',
        }}
      />
    );
  };
  //render footer of list
  renderFooter = () => {
    const {loading} = this.props;
    if (!loading) {
      return null;
    }

    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: normalize(16),
        }}>
        <ActivityIndicator color={Colors.lnh} size="small" />
      </View>
    );
  };

  //render view when list is empty
  renderEmpty = () => {
    const {loading, refreshing, renderEmpty, emptyText} = this.props;
    if (!loading && !refreshing) {
      return (
        (renderEmpty && renderEmpty()) || (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: normalize(20),
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Colors.black,
              }}
              selectable={true}>
              {emptyText || 'Không có dữ liệu'}
            </Text>
          </View>
        )
      );
    } else {
      return null;
    }
  };

  render() {
    const {
      data,
      renderItem,
      initialNumToRender,
      inverted,
      numColumns,
      handleLoadMore,
      handleRefresh,
      horizontal,
      refreshing,
      ListHeaderComponent,
      keyExtractor,
    } = this.props;
    return (
      <FlatList
        style={{
          height: '100%',
          width: '100%',
        }}
        data={data}
        extraData={this.props}
        horizontal={horizontal}
        renderItem={renderItem}
        keyExtractor={keyExtractor || ((item, index) => index.toString())}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        numColumns={numColumns}
        inverted={inverted}
        initialNumToRender={initialNumToRender}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            title="Pull to refresh"
            tintColor={Colors.textPrimary}
            titleColor={Colors.textPrimary}
          />
        }
        {...this.props}
      />
    );
  }
}

export default BaseList;
