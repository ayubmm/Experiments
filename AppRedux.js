import React, {useState} from 'react';
import {View, Text, Button, TextInput, ToastAndroid} from 'react-native';
import {useSelector, useDispatch, Provider} from 'react-redux';
import store from './src/redux/store/store';

const Test = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const user = useSelector((state) => state.userReducer);

  const addUser = useDispatch();

  const handleAddUser = () => {
    if (name && email) {
      addUser({
        type: 'ADD/USER',
        payload: {name: name, email: email},
      });
    } else {
      ToastAndroid.show('Isi nama dan email dengan benar!', 1000);
    }
  };

  console.log('this is user = ', user);

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text>REDUX</Text>
      <Text>All Users</Text>
      {user.map((v, i) => {
        return <Text key={i}>{v.name}</Text>;
      })}
      <TextInput
        placeholder={'Name'}
        value={name}
        style={{
          backgroundColor:'#eee',
          borderWidth: 0.3,
          width: '100%',
          borderRadius: 10,
          marginVertical: 5,
        }}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder={'Email'}
        style={{
          backgroundColor:'#eee',
          borderWidth: 0.3,
          width: '100%',
          borderRadius: 10,
          marginVertical: 5,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title={'Add User'} onPress={handleAddUser} />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

export default App;
