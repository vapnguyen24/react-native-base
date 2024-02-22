import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BaseStyles, Metrics} from '~/themes';
import {TextInput} from 'react-native-paper';

const TestScreen = () => {
  const height = useSharedValue(180);
  const heightSubHeader = useSharedValue(0);

  const scaleHeaderAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(height.value, [0, 180], [0, 1]);
    return {
      height: withTiming(height.value),
      opacity: withTiming(opacity),
    };
  });

  const scaleSubHeaderAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(heightSubHeader.value, [0, 80], [0, 1]);
    return {
      height: withTiming(heightSubHeader.value),
      opacity: withTiming(opacity),
    };
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    if (event.contentOffset.y > 120) {
      height.value = withTiming(0);
      heightSubHeader.value = withTiming(80);
    } else if (event.contentOffset.y < 10) {
      height.value = withTiming(180);
      heightSubHeader.value = withTiming(0);
    }
  });

  const Header = () => {
    return (
      <Animated.View style={[scaleHeaderAnimatedStyle, {overflow: 'hidden'}]}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
              height: 80,
            },
          ]}>
          <View
            style={{
              width: 80,
              height: '100%',
              backgroundColor: 'rgba(52,135,218,0.64)',
              borderRadius: 6,
            }}
          />

          <View
            style={{
              width: 80,
              height: '100%',
              backgroundColor: 'rgba(52,135,218,0.64)',
              borderRadius: 6,
            }}
          />

          <View
            style={{
              width: 80,
              height: '100%',
              backgroundColor: 'rgba(52,135,218,0.64)',
              borderRadius: 6,
            }}
          />
        </Animated.View>

        <TextInput
          style={{marginHorizontal: 20, marginTop: 16}}
          placeholder={'Search...'}
        />
      </Animated.View>
    );
  };
  const SubHeader = () => {
    return (
      <Animated.View
        style={[{backgroundColor: '#ec6b6b'}, scaleSubHeaderAnimatedStyle]}
      />
    );
  };

  return (
    <SafeAreaView style={BaseStyles.mainContainer}>
      <SubHeader />
      <Header />
      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({item, index}) => (
          <Animated.View
            entering={FadeInDown.duration(500 * index)}
            style={{
              height: 120,
              marginTop: 16,
              marginHorizontal: 20,
              backgroundColor: '#deecde',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 24}}>{item.toString()}</Text>
          </Animated.View>
        )}
        keyExtractor={item => item.toString()}
        onScroll={scrollHandler}
      />
    </SafeAreaView>
  );
};
export default TestScreen;

const styles = StyleSheet.create({
  box: {
    width: Metrics.WIDTH,
    height: 400,
    backgroundColor: '#e7d8d8',
    borderRadius: 12,
  },
  heart: {
    width: 40,
    height: 40,
    backgroundColor: '#e35656',
    borderRadius: 4,
    zIndex: 99,
    position: 'absolute',
    top: Metrics.HEIGHT / 2 - 20,
    left: Metrics.WIDTH / 2 - 20,
  },
  button: {
    marginTop: 20,
    width: '60%',
  },
});
