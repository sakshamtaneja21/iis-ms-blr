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
  View,
  Text,
  StatusBar,
} from 'react-native';
import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate} from './../helper/utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      navigate(this, 'LoggedInRoutes');
    }, 3000);
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          main.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: APP_COLORS.PRIMARY_COLOR,
          },
        ]}>
        <Text
          style={{
            fontSize: 28,
            fontFamily: 'Rubik-Bold',
            color: '#fff',
            letterSpacing: 4,
          }}>
          QUORUM
        </Text>
      </ScrollView>
    );
  }
}

export default App;
