import React from 'react';
import {Image} from 'react-native';

const ImageViewer = ({school}) => {
  return <Image style={{width: 75, height: 75}} source={school.logo} />;
};

export default ImageViewer;
