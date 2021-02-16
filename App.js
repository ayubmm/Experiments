import React, {useContext, createContext} from 'react';
import {View, Text} from 'react-native';

const MyNumber = createContext();
const MyID = createContext();

function MyApp() {
  const number = useContext(MyNumber);
  const id = useContext(MyID);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Nilai Context Angka sekarang {number}</Text>
      <Text>Nilai Context ID sekarang {id}</Text>
    </View>
  );
}

const App = () => {
  return (
    <MyNumber.Provider value={753}>
      <MyID.Provider value={'Ayub'}>
        <MyApp />
      </MyID.Provider>
    </MyNumber.Provider>
  );
};

export default App;
