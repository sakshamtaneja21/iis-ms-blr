import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sideBar} from '../styles/styles';
import APP_COLORS from '../config/constants';

export function navigate(context, route, value = {}) {
  context.props.navigation.navigate(route, {extra: value});
}

export function resetStack(context, route) {
  const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: route})],
  });
  context.props.navigation.dispatch(actionToDispatch);
}

export const ICON = ({name, size, color}) => {
  return <Icon name={name} size={size} color={color} />;
};

function detectWorkExistence(listOfProbableWords, chatText) {
  console.log(chatText);
  var str = chatText;
  var bots = listOfProbableWords;
  var isBot = false;

  for (var i = 0, ln = bots.length; i < ln; i++) {
    if (str.indexOf(bots[i]) !== -1) {
      isBot = true;
      break;
    }
  }

  return isBot;
}

export function detectInterest(incomingText) {
  if (detectWorkExistence(['help'], incomingText)) {
    let response = {
      text:
        'Sure, refer to attached picture of the solution and then I will explain you',
      _id: generateUUID(),
      createdAt: new Date(),
      image: 'https://i.ytimg.com/vi/pIfpHdGVwLU/maxresdefault.jpg',
      user: {
        _id: 2,
        name: 'Akshay',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };
    return response;
  } else {
    let response = {
      text: 'Did not understand your query, can you try again',
      _id: generateUUID(),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Akshay',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };
    return response;
  }
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
