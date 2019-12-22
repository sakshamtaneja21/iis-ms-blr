'use strict';
var React = require('react-native');
var {StyleSheet, Dimensions} = React;
import APP_COLORS from './../config/constants';
const {width, height} = Dimensions.get('window');

const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.BASE_COLOR,
  },
});

const header = StyleSheet.create({
  icon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBack: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    color: '#4a4a4a',
    letterSpacing: 2,
    // textAlign: 'center',
  },
});

const sideBar = StyleSheet.create({
  drawerContainer: {flex: 1},
  title: {
    color: APP_COLORS.WHITE_SMOKE,
    fontFamily: 'Rubik-Bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  labels: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: APP_COLORS.WHITE_SMOKE,
  },
});

export {main, header, sideBar};
