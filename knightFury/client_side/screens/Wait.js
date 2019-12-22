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
  Image,
  View,
  TouchableOpacity,
  Easing,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate} from './../helper/utils';
import Header from './../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
// import LottieView from 'lottie-react-native';
import {Wave} from 'react-animated-text';

class WaitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationDone: false,
      showSuccess: false,
    };
  }

  componentDidMount() {
    var self = this;
    setTimeout(() => {
      self.setState({
        animationDone: true,
      });
    }, 13000);
    setTimeout(() => {
      self.setState({
        showSuccess: true,
      });
    }, 10000);
    this.circularProgress.animate(100, 10000, Easing.quad);
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          main.container,
          {
            backgroundColor: APP_COLORS.WHITE_SMOKE,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View>
          <AnimatedCircularProgress
            ref={ref => (this.circularProgress = ref)}
            arcSweepAngle={270}
            size={250}
            width={15}
            fill={100}
            tintColor="#38f9d7"
            backgroundColor="#ccc"
            padding={10}
            lineCap="round"
            onAnimationComplete={() => {
              console.log('done');
              //   this.setState({
              //     animationDone: true,
              //   });
            }}
            renderCap={({center}) => (
              <Circle cx={center.x} cy={center.y} r="10" fill="#43e97b" />
            )}
          />
          <View
            style={{
              position: 'absolute',
              height: 250,
              width: 250,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Text style={{fontFamily: 'Rubik-Bold', fontSize: 14}}>
              {this.state.showSuccess == false ? 'Hold on' : 'Done!'}
            </Text>
            <Text style={{fontFamily: 'Rubik-Bold', fontSize: 14}}>
              {this.state.showSuccess == false ? 'Finding assistance...' : ''}
            </Text>
          </View>
        </View>
        {this.state.animationDone == true && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#000',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              opacity: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                opacity: 1,
                height: 500,
                width: 300,
                borderRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: APP_COLORS.BASE_COLOR,
                  height: 60,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Bold',
                    color: APP_COLORS.WHITE_SMOKE,
                    fontSize: 16,
                  }}>
                  Mentors
                </Text>
              </View>
              {[
                'Kane Willaim (5.0)',
                'Johne Doe (4.9)',
                'Sarah Jones (4.8)',
                'Kane Willaim (5.0)',
                'Johne Doe (4.9)',
                'Sarah Jones (4.8)',
              ].map((mentor, index) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{height: 30, width: 30, borderRadius: 15}}
                        source={require('./../images/student1.jpg')}
                      />
                      <Text
                        style={{
                          fontFamily: 'Rubik-Bold',
                          fontSize: 12,
                          marginLeft: 10,
                        }}>
                        {mentor}
                      </Text>
                      <View style={{flex: 1}} />
                      <TouchableOpacity
                        onPress={() => navigate(this, 'Chat')}
                        style={{
                          backgroundColor: APP_COLORS.TERTIARY_COLOR,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Rubik-Bold',
                            fontSize: 12,
                            marginLeft: 10,
                            color: APP_COLORS.WHITE_SMOKE,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            paddingRight: 10,
                          }}>
                          Connect
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default WaitScreen;
