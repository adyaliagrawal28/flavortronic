import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import TasteCard from '../Swipe/TasteCard';
const FindTaste = () => {
  const [data, setData] = useState([
    {image: require('../images/apple.jpeg'), id:1, title: 'apple'},
    {image: require('../images/cake.jpeg'), id:2, title: 'cake'},
    {image: require('../images/crossant.jpeg'), id:3, title: 'crossant'},
    {image: require('../images/donut.jpeg'), id:4, title: 'donut'},
    {image: require('../images/pan.jpeg'), id:5, title: 'pan'},
    {image: require('../images/pie.jpeg'), id:6, title: 'pie'},
    {image: require('../images/rool.jpeg'), id:7, title: 'rool'},
    {image: require('../images/sandwich.jpeg'), id:8, title: 'sandwich'},
    {image: require('../images/tea.jpeg'), id:9, title: 'tea'},
  ]);
  useEffect(() => {
    if (!data.length) {
      setData([
        {image: require('../images/apple.jpeg'), id:1, title: 'apple'},
        {image: require('../images/cake.jpeg'), id:2, title: 'cake'},
        {image: require('../images/crossant.jpeg'), id:3, title: 'crossant'},
        {image: require('../images/donut.jpeg'), id:4, title: 'donut'},
        {image: require('../images/pan.jpeg'), id:5, title: 'pan'},
        {image: require('../images/pie.jpeg'), id:6, title: 'pie'},
        {image: require('../images/rool.jpeg'), id:7, title: 'rool'},
        {image: require('../images/sandwich.jpeg'), id:8, title: 'sandwich'},
        {image: require('../images/tea.jpeg'), id:9, title: 'tea'},
      ]);
    }
  }, [data]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handelSelection = useCallback(
    direction => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );
  return (
    <View style={{flex: 1}}>
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHanlders = isFirst ? panResponser.panHandlers : {};
          return (
            <TasteCard
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHanlders}
            />
          );
        })
        .reverse()}

      <View
        style={{
          width: '100%',
          position: 'absolute',
          height: 100,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handelSelection(-1);
          }}>
          <Image
            source={require('../images/cancel.png')}
            style={{width: 34, height: 34}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handelSelection(1);
          }}>
          <Image
            source={require('../images/heart.png')}
            style={{width: 40, height: 40, tintColor: '#00FFC8'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindTaste;