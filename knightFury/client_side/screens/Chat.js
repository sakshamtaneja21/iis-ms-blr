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
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate, detectInterest} from './../helper/utils';
import Header from './../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GiftedChat, Send} from 'react-native-gifted-chat';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <Icon
          name="send"
          //   size={12}
          //   color={APP_COLORS.BASE_COLOR}
          style={{color: APP_COLORS.BASE_COLOR}}
        />
      </Send>
    );
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text:
            'Hello Akshay\nI have a solution and would like to share it with you.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Akshay',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    var self = this;
    console.log(messages);
    // chat logic starts
    let messageText = detectInterest(messages[0].text);
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      console.log(this.state.messages),
    );
    setTimeout(() => {
      this.setState(
        previousState => ({
          messages: GiftedChat.append(previousState.messages, [messageText]),
        }),

        console.log(this.state.messages),
      );
    }, 2000);
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
        <View
          style={{
            height: 80,
            width: Dimensions.get('window').width,
            backgroundColor: APP_COLORS.BASE_COLOR,
            justifyContent: 'center',
            padding: 20,
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
            <View>
              <Text
                style={{
                  fontFamily: 'Rubik-Bold',
                  fontSize: 12,
                  marginLeft: 10,
                  letterSpacing: 1,
                  color: APP_COLORS.WHITE_SMOKE,
                }}>
                John Doe
              </Text>
              <Text
                style={{
                  fontFamily: 'Rubik-Regular',
                  fontSize: 12,
                  marginLeft: 10,
                  marginTop: 3,
                  color: APP_COLORS.WHITE_SMOKE,
                  letterSpacing: 1,
                }}>
                Online
              </Text>
            </View>

            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="phone" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
              }}>
              <Icon name="video-camera" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
                backgroundColor: APP_COLORS.WHITE_SMOKE,
                borderRadius: 3,
              }}>
              <Text
                style={{
                  color: APP_COLORS.BASE_COLOR,
                  fontFamily: 'Rubik-Bold',
                  padding: 3,
                  paddingHorizontal: 5,
                }}>
                End
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* body of chat */}
        <GiftedChat
          messages={this.state.messages}
          placeholder="Type doubts here..."
          onSend={messages => this.onSend(messages)}
          keyboardShouldPersistTaps="never"
          showUserAvatar={true}
          user={{
            _id: 1,
          }}
          //   bottomOffset={40}
          //   renderSend={() => this.renderSend()}
        />
      </ScrollView>
    );
  }
}

export default ChatScreen;
