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
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate} from './../helper/utils';
import Header from './../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';

class AskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          main.container,
          {
            backgroundColor: APP_COLORS.WHITE_SMOKE,
            // padding: 20,
          },
        ]}>
        <Header
          name="Start asking"
          icon="bars"
          onPress={() => this.props.navigation.toggleDrawer()}
        />
        <View
          style={{
            backgroundColor: APP_COLORS.PRIMARY_COLOR,
            elevation: 4,
            borderRadius: 10,
            margin: 10,
            paddingHorizontal: 10,
          }}>
          <View>
            {/* <Icon
              name="trophy"
              size={50}
              color="#6c7b95"
              style={{position: 'absolute', right: 20, top: 20}}
            /> */}
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: 20,
                paddingVertical: 20,
                fontFamily: 'Rubik-Bold',
                letterSpacing: 2,
              }}>
              Welcome, Akshay
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 8,
                marginVertical: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Rubik-Bold',
                  color: APP_COLORS.PRIMARY_COLOR,
                }}>
                8
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Rubik-Bold',
                  color: APP_COLORS.PRIMARY_COLOR,
                }}>
                Asked
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 8,
                marginVertical: 20,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Rubik-Bold',
                  color: APP_COLORS.PRIMARY_COLOR,
                }}>
                250
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Rubik-Bold',
                  color: APP_COLORS.PRIMARY_COLOR,
                }}>
                Online
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigate(this, 'Snap')}
            style={{
              backgroundColor: '#02a8a8',
              elevation: 4,
              borderRadius: 10,
              margin: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: 40,
                paddingVertical: 50,
                fontFamily: 'Rubik-Black',
                letterSpacing: 2,
                zIndex: 99,
                fontSize: 18,
              }}>
              Capture
            </Text>
            <Icon
              name="camera"
              size={50}
              color="#018383"
              style={{position: 'absolute', right: 20, top: 20}}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#4a47a3',
              elevation: 4,
              borderRadius: 10,
              margin: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: 40,
                paddingVertical: 50,
                fontFamily: 'Rubik-Black',
                letterSpacing: 2,
                zIndex: 99,
                fontSize: 18,
              }}>
              Attach
            </Text>
            <Icon
              name="paperclip"
              size={50}
              color="#413c69"
              style={{position: 'absolute', right: 20, top: 20}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              backgroundColor: '#df654a',
              elevation: 4,
              borderRadius: 10,
              margin: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: 40,
                paddingVertical: 50,
                fontFamily: 'Rubik-Black',
                letterSpacing: 2,
                zIndex: 99,
                fontSize: 18,
              }}>
              Type own
            </Text>
            <Icon
              name="edit"
              size={50}
              color="#eda045"
              style={{position: 'absolute', right: 20, top: 20}}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AskScreen;
