import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [fav, setFav] = useState([]);
  const [newFav, setNewFav] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('favorites')
      .then((res) => {
        if (res) {
          let favorites = JSON.parse(res);

          setFav(favorites);
        } else {
          console.log('ini isi async get favorites == ', res);
        }
      })
      .catch((e) => console.log('catch async get', e));
  }, []);

  useEffect(() => {
    let saveFav = JSON.stringify(fav);

    AsyncStorage.setItem('favorites', saveFav).catch((e) =>
      console.log('catch async fav', e),
    );
  }, [fav]);

  const addFav = (input) => {
    let data = {text: input, status: true};
    let Favs = [...fav, data];

    setNewFav('');
    setFav(Favs);
  };

  const delFav = (index) => {
    setFav((prevFav) => {
      let newFavs = Array.from(prevFav);

      let c_status = {...newFavs[index], status: false};

      newFavs.splice(index, 1, c_status);

      return newFavs;
    });
  };

  const mkFav = (index) => {
    setFav((prevFav) => {
      let newFavs = Array.from(prevFav);

      let c_status = {...newFavs[index], status: true};

      newFavs.splice(index, 1, c_status);

      return newFavs;
    });
  };

  const toggleStatus = (status, index) => {
    console.log('status == ', status, 'index == ', index);

    if (status) {
      delFav(index);
    } else {
      mkFav(index);
    }
  };

  const delAllFav = () => {
    setFav([]);

    AsyncStorage.removeItem('favorites').catch((e) =>
      console.log('catch asunc remove == ', e),
    );
  };

  const allFav = fav.map((v, i) => {
    function style() {
      if (v.status) {
        return styles.favorites;
      } else {
        return styles.unfavorites;
      }
    }

    return (
      <TouchableOpacity key={i} onPress={() => toggleStatus(v.status, i)}>
        <Text style={style()}>{v.text}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      {fav.length > 0 ? allFav : <Text>No Favorites</Text>}
      <TextInput
        style={styles.input}
        value={newFav}
        onChangeText={(text) => setNewFav(text)}
        placeholder={'Favorite'}
      />
      <Button title={'Add Fav'} onPress={() => addFav(newFav)} />
      <Button title={'Del All Fav'} onPress={() => delAllFav()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: '#c4c4c4',
    width: '80%',
    marginVertical: 10,
  },
  favorites: {
    fontSize: 25,
    marginVertical: 5,
  },
  unfavorites: {
    fontSize: 25,
    marginVertical: 5,
    backgroundColor: 'red',
  },
});
