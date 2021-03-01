import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import image from './FVdLas.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const {UIManager} = NativeModules;

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  state = {
    w: 50,
    h: 50,
    add: 20,
    size: 'small',
  };

  _onPress = () => {
    // // Animate the update
    // LayoutAnimation.easeInEaseOut();
    // this.setState({add: this.state.add * 2}, () => {
    //   this.setState({
    //     w: '100%',
    //     h: this.state.h + this.state.add,
    //   });
    // });
    this.setState({size: 'big'});
  };

  size = () => {
    LayoutAnimation.easeInEaseOut();
    if (this.state.size === 'small') {
      return {width: 100, height: 100};
    } else if (this.state.size === 'big') {
      return {flex: 1, width: '100%'};
    }
  };

  _onPressSmall = () => {
    // Animate the update
    // LayoutAnimation.easeInEaseOut();
    // this.setState({
    //   w: this.state.w - this.state.add,
    //   h: this.state.h - this.state.add,
    //   add: this.state.add / 2,
    // });
    this.setState({size: 'small'});
  };

  render() {
    console.log('state add = ', this.state.add);
    console.log('state w = ', this.state.w);
    console.log('state h = ', this.state.h);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Bigger!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressSmall}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Smaller!</Text>
          </View>
        </TouchableOpacity>
        <View style={this.size()}>
          <Image style={styles.img} source={image} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  box: {
    backgroundColor: 'red',
    // maxWidth: '100%',
    // maxHeight: '100%',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
