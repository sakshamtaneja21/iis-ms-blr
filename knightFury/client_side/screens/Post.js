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
  TouchableOpacity,
  Picker,
  Image,
} from 'react-native';
import APP_COLORS from '../config/constants';
import {main} from './../styles/styles';
import {navigate} from './../helper/utils';
import Header from './../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import TagInput from 'react-native-tags-input';

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: ['history', 'WWII'],
        subject: '',
      },
    };
  }

  updateTagState = state => {
    this.setState({
      tags: state,
    });
  };

  render() {
    const params = this.props.navigation.state.params;
    console.log(params.extra.imageUri);
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
          name="Create Post"
          icon=""
          onPress={() => this.props.navigation.toggleDrawer()}
        />
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            minHeight: 100,
            borderBottomColor: '#EAEAEA',
            borderBottomWidth: 1,
          }}>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              resizeMode="contain"
              source={require('./../images/student1.jpg')}
            />
          </View>
          <View style={{flex: 8}}>
            <TextInput
              autoFocus={true}
              style={{fontFamily: 'Rubik-Regular'}}
              placeholder="Add title to your query..."
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Rubik-Bold',
            fontSize: 12,
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          SNAPS
        </Text>
        <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
          <View style={{marginHorizontal: 10}}>
            <Image
              resizeMode="contain"
              source={{uri: params.extra.imageUri, isStatic: true}}
              style={{height: 80, width: 70}}
            />
          </View>
          <View
            style={{
              height: 80,
              width: 70,
              borderColor: '#ccc',
              borderStyle: 'dotted',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="plus" size={30} color="#ccc" />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
            backgroundColor: '#f5f7fa',
            borderWidth: 1,
            borderColor: '#EAEAEA',
            paddingBottom: 10,
          }}>
          <TagInput
            placeholder="Add more tags for visibility..."
            label="TAGS"
            labelStyle={{fontFamily: 'Rubik-Bold'}}
            updateState={this.updateTagState}
            tags={this.state.tags}
            tagStyle={{backgroundColor: APP_COLORS.BACKGROUND_COLOR}}
            tagTextStyle={{
              color: APP_COLORS.WHITE_SMOKE,
              fontFamily: 'Rubik-Regular',
            }}
            inputStyle={{fontFamily: 'Rubik-Regular', fontSize: 14}}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Rubik-Bold',
            fontSize: 12,
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          SUBJECT
        </Text>
        <Picker
          selectedValue={this.state.subject}
          prompt="Select a subject"
          style={{
            height: 50,
            width: 200,
            // marginVertical: 20,
            marginHorizontal: 20,
          }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({subject: itemValue})
          }>
          <Picker.Item label="Maths" value="java" />
          <Picker.Item label="Physics" value="js" />
        </Picker>
        <TouchableOpacity
          onPress={() => navigate(this, 'Wait')}
          style={{
            backgroundColor: APP_COLORS.BASE_COLOR,
            width: 200,
            alignSelf: 'flex-end',
            marginRight: 20,
            elevation: 4,
            borderRadius: 10,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Rubik-Bold',
              fontSize: 16,
              color: '#fff',
              padding: 10,
              textAlign: 'center',
            }}>
            POST
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default PostScreen;
