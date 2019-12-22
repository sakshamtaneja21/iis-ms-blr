import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {header} from './../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import APP_COLORS from '../config/constants';
export default Header = ({name, icon, onPress}) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#e6e9f0', '#ccc']}
      style={header.headerBack}>
      {/* <View style={header.icon}></View> */}
      <View style={{flex: 8, paddingLeft: 20}}>
        <Text style={header.title}>{name}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={header.icon}>
        <View style={{borderRadius: 25}}>
          {icon != '' && (
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              resizeMode="contain"
              source={require('./../images/student1.jpg')}
            />
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
