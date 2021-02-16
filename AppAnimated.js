import React, {useRef, useEffect, useState} from 'react';
import {Animated, Easing, Text, View} from 'react-native';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0.09)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotate, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(width, {
          toValue: 400,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 10,
      },
    ).start();
  }, [fadeAnim, rotate, width]);

  let rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    var fade = true;
    setTimeout(() => {
      setInterval(() => {
        if (fade) {
          fade = false;
          Animated.timing(fadeText, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        } else {
          fade = true;
          Animated.timing(fadeText, {
            toValue: 0.06,
            duration: 700,
            useNativeDriver: false,
          }).start();
        }
      }, 1200);
    }, 3000);
  }, [fadeText]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{rotate: rotation}],
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        width: width,
      }}>
      <Animated.Text
        // numberOfLines={1}
        style={{
          fontSize: 28,
          textAlign: 'center',
          margin: 10,
          height: 35,
          color: 'blue',
          fontWeight: 'bold',
          opacity: fadeText,
        }}>
        TEXT
      </Animated.Text>
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{backgroundColor: 'powderblue'}} />
    </View>
  );
};
