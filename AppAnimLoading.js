import React, {Component} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';

class App extends Component {
  animatedValue = new Animated.Value(-300);
  AnimatedOpacity = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear(),
    }).start();
    Animated.timing(this.AnimatedOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.linear(),
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.loadBar}>
          <Animated.View
            style={[
              styles.loadAmount,
              {transform: [{translateX: this.animatedValue}]},
            ]}
          />
        </View> */}
        <View style={styles.newBar}>
          <Animated.View
            style={[styles.fadeAmount, {opacity: this.AnimatedOpacity}]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  loadBar: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  newBar: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  fadeAmount: {
    // position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'purple',
  },
  loadAmount: {
    // position: 'absolute',
    width: 300,
    height: 40,
    backgroundColor: 'red',
  },
});

export default App;
