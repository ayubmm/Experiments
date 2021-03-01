// App.js

import React, {Component, useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ColorPropType,
  TextInput,
  Picker,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
//import ActionButton from 'react-native-circular-action-menu'

import Icon from 'react-native-vector-icons/Ionicons';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
  ActivityIndicator,
} from './AddPosts2';
import {Menu, Divider, Provider} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';

//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from '../navigation/AuthProvider';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import ReactNativePickerModule from 'react-native-picker-module';
import ActionButton from 'react-native-action-button';

//import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableHighlight} from 'react-native-gesture-handler';

const defaultImg = require('./images.jpeg');
const Capture = () => {
  const {user} = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [Valid, setValid] = useState(false);
  const [error1, setError1] = useState('');
  const [error, setError] = useState(false);
  const [vCuburb, setvSuburb] = useState([]);
  const [image, setImage] = useState(null);
  const [UsetextInputValue, SetTextInputValue] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState('');
  const [value, setValue] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [disablebutton, setDisable] = useState('true');
  const [quantity, setQuantity] = useState('');
  //const[_valid,setValid] = useState('')

  const pickerRef = useRef();
  // const [value, setValue] = useState()

  let index = 0;
  const dataset_1 = [
    {key: index++, label: 'Eletronics'},
    {key: index++, label: 'Men Fashion'},
    {key: index++, label: 'Women Fashion'},

    {key: index++, label: 'Toys and Games'},
    {key: index++, label: 'Books and Stationery'},
    {key: index++, label: 'Kitchen Appliances'},
    {key: index++, label: 'Electrics'},
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
  ];
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  function validatePost() {
    if (
      (description == null || description == '') &&
      (categories == null || categories == '') &&
      (price == null || price == '') &&
      quantity == null &&
      quantity == ''
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }
  // useEffect(() => {
  //   uploadImage();
  //   submitPost();
  // }, []);
  function Post({postId}) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('posts')
        .onSnapshot((documentSnapshot) => {
          console.log('User data: ', documentSnapshot.data());
        });
      return () => subscriber();
    }, [postId]);
  }

  const submitPost = async () => {
    if (description == null) {
      setError1('Please enter the description of the item.');
      setValid(false);
    } else if (price == null) {
      setError1('Please key in the price of the item');
      setValid(false);
    } else if (quantity == null) {
      setError1('Please key in the quantity of the item');
      setValid(false);
    } else if (categories == null) {
      setError1('Please choose category of the item');
      setValid(false);
    } else {
      console.log('test 2');
      const imageUrl = await uploadImage();
      //const description = await validatePost();

      console.log('Image Url: ', imageUrl);
      console.log('Post: ', post);

      firestore()
        .collection('posts')
        .add({
          //email:email,
          userId: user.uid,
          post: post,
          description: description,
          quantity: quantity,
          price: price,
          postImg: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
          categories: UsetextInputValue,
        })
        .then(() => {
          console.log('Post Added!');
          Alert.alert(
            'Post published!',
            'Your post has been published Successfully!',
          );
          setPost(null);
        })
        .catch((error) => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    }
  };

  const uploadImage = async () => {
    console.log('test 1');
    if (image == null) {
      Alert.alert('Please fill up the details of the item to continue!');
      // return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(`
      ${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes},
      `);

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <InputWrapper>
          <View>
            {image != null ? (
              <AddImage
                source={{uri: image}}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  //width:'100%'
                }}
              />
            ) : null}

            {uploading ? (
              <View>
                <Text>{transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <Image
                source={image ? {uri: image} : defaultImg}
                style={{height: 200, width: 200}}
              />
            )}
          </View>
        </InputWrapper>

        <Input
          inputContainerStyle={styles.inputContainer}
          onChangeText={(val) => {
            setDescription(val);
          }}
          placeholder="Describe your item"
          value={description}
        />

        <Input
          //ref={NotelRef}
          inputContainerStyle={styles.inputContainer}
          //errorStyle={styles.errorStyle}

          onChangeText={(val) => {
            setQuantity(val);
          }}
          //errorStyle={styles.ErrStyleMsg}
          //errorMessage={usePICPhoneNoErr}
          keyboardType="number-pad"
          placeholder="Quantity of item"
          value={quantity}
        />
        <Input
          //ref={NotelRef}
          inputContainerStyle={styles.inputContainer}
          //errorStyle={styles.errorStyle}

          onChangeText={(val) => {
            setPrice(val);
          }}
          //errorStyle={styles.ErrStyleMsg}
          //errorMessage={usePICPhoneNoErr}
          keyboardType="number-pad"
          placeholder="Price"
          value={price}
        />

        <ModalSelector
          data={dataset_1}
          initValue="Select categories of items"
          supportedOrientations={['landscape']}
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          onChange={(option) => {
            SetTextInputValue(option.label);
          }}>
          <TextInput
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              height: 55,
              width: 350,
            }}
            editable={false}
            placeholder="Select categories of items"
            value={UsetextInputValue}
          />
        </ModalSelector>

        <ActionButton
          useNativeDriver={true}
          buttonColor="#2e64e5"
          position="right"
          //marginTop="20"
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Take Photo"
            onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        {/* <TouchableHighlight
          onPress={()=>{
            console.log('test')
            submitPost()}}
          > */}
        <Button
          color="#5499C7"
          onPress={submitPost}
          buttonStyle={styles.button}
          title={'Submit'}
          // disabled={validatePost}
        />
        {/* </TouchableHighlight> */}
      </View>
    </View>
  );
};
export default Capture;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: wp('60%'),
    height: hp('6.5%'),
    marginTop: 10,
    //margin: 70,
    backgroundColor: '#CD5C5C',
    //backgroundColor: '#5499C7',
    borderRadius: 15,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  btn_container: {
    flex: 1,
    backgroundColor: '#59a6eb',
    justifyContent: 'center',
    width: '100%',
    elevation: 8,
    borderRadius: 5,
    margin: 55,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //smarginBottom:10,
    marginTop: 3,
    //marginVertical: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
