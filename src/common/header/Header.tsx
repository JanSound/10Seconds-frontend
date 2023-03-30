import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import GuideBtn from '../button/GuideBtn';
import MenuBtn from '../button/MenuBtn';

StatusBar.setBarStyle('light-content');

const Header = (props: any) => {
  const { toggleModal, navigation } = props;
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <GuideBtn toggleModal={toggleModal} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.title}>10Seconds</Text>
        </TouchableOpacity>
        <MenuBtn navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Header;
