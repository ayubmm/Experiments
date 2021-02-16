import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import ImageViewer from './imageViewer';

const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onSagaIncrement,
  onGetUsers,
  obj,
  educationInfo,
}) => (
  <View style={{flex: 1, backgroundColor: '#eee', alignItems: 'center'}}>
    <TouchableOpacity
      style={{padding: 10, margin: 10}}
      onPress={onSagaIncrement}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Saga Increment</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{padding: 10, margin: 10}} onPress={onIncrement}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Increment</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{padding: 10, margin: 10}} onPress={onDecrement}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Decrement</Text>
    </TouchableOpacity>
    <Text style={{fontSize: 30, fontWeight: 'bold'}}>
      Clicked: {value} times
    </Text>

    <TouchableOpacity style={{padding: 10, margin: 10}} onPress={onGetUsers}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Get Users</Text>
    </TouchableOpacity>
    {/* <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderStyle: 'solid',
        borderTopColor: 'yellow',
        borderLeftColor: 'green',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BCD4',
      }}
    /> */}
  </View>
);

export default Counter;

// TriangleShapeCSS: {

//     width: 0,
//     height: 0,
//     borderLeftWidth: 60,
//     borderRightWidth: 60,
//     borderBottomWidth: 120,
//     borderStyle: 'solid',
//     backgroundColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: '#00BCD4'
//   }
