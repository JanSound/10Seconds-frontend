import React from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions, View, Text, TouchableOpacity, Image } from 'react-native';

const { width } = Dimensions.get('screen');

const MenuBtn = () => {
  return (
    <TouchableOpacity style={styles.menuBtn}>
      <Image
        style={styles.menuBtnImage}
        source={require('./assets/images/hamburger.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtnImage: { width: 30, height: 30 },
});

export default MenuBtn;
