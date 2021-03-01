import React, {useContext, createContext, useState} from 'react';
import {View, Text, TextInput} from 'react-native';

const MyNumber = createContext();
const MyID = createContext();

// if this component is in another file, you must import the
// context (ex: export MyNumber or export const number)
function MyApp({setId, setNumber}) {
  const number = useContext(MyNumber);
  const id = useContext(MyID);

  const [newid, setnewId] = useState('');
  const [newnumber, setnewNumber] = useState('0');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Nilai Context Angka sekarang {number}</Text>
      <Text>Nilai Context ID sekarang {id}</Text>
      <TextInput
        style={{width: '100%', padding: 10, borderWidth: 0.3, borderRadius: 10}}
        placeholder={'Masukkan nilai baru Context Angka'}
        value={newnumber}
        onChangeText={(text) => setnewNumber(text)}
        onSubmitEditing={() => setNumber(newnumber)}
      />
      <TextInput
        style={{width: '100%', padding: 10, borderWidth: 0.3, borderRadius: 10}}
        placeholder={'Masukkan nilai baru Context ID'}
        value={newid}
        onChangeText={(text) => setnewId(text)}
        onSubmitEditing={() => setId(newid)}
      />
    </View>
  );
}

const App = () => {
  const [id, setId] = useState('');
  const [number, setNumber] = useState(0);
  return (
    <MyNumber.Provider value={number}>
      <MyID.Provider value={id}>
        <MyApp
          setId={(text) => setId(text)}
          setNumber={(text) => setNumber(text)}
        />
      </MyID.Provider>
    </MyNumber.Provider>
  );
};

export default App;
