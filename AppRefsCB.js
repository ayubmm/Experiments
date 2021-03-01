import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const array = [
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
  'ayub',
  'faris',
  'teddi',
  'ihsan',
  'rijlan',
];

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const refs = [];

  function focus(ref) {
    ref.focus();
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        {array.map((v, i) => (
          <Button
            key={i}
            onPress={() => focus(refs[i])}
            title={`ref input ${v}`}
          />
        ))}
        {array.map((v, i) => (
          <TextInput
            key={i}
            placeholder={v}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            ref={(ref) => {
              refs[i] = ref;
            }}
            blurOnSubmit={i !== array.length - 1 ? false : true}
            onSubmitEditing={() => {
              if (i !== array.length - 1) {
                focus(refs[i + 1]);
              }
            }}
          />
        ))}
        {/* <Button onPress={() => focus(refs[0])} title={'ref input email'} />
      <Button onPress={() => focus(refs[1])} title={'ref input password'} />
      <TextInput
      placeholder={'email'}
      value={email}
      onChangeText={setEmail}
      style={styles.input}
        ref={(ref) => {
          refs[0] = ref;
        }}
        />
        <TextInput
        placeholder={'password'}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        ref={(ref) => {
          refs[1] = ref;
        }}
      /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7498b2ff',
    paddingHorizontal: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
