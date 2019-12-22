/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate} from './../helper/utils';
import Header from './../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
const {width, height} = Dimensions.get('window');

class SnapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      navigate(this, 'Post', {imageUri: data.uri});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'black',
              width: width,
              opacity: 0.4,
            }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}>
              <Icon
                name="camera"
                size={30}
                color="#000"
                style={{position: 'absolute'}}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    opacity: 1,
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SnapScreen;
