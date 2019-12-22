import React from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {sideBar, main} from '../styles/styles';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={sideBar.drawerContainer}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View
        style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={sideBar.title}>Quorum</Text>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export default CustomDrawerContentComponent;
