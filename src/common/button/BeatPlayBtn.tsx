import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const BeatPlayBtn = () => {
  return (
    <TouchableOpacity style={styles.playBtnContainer}>
      <Image
        style={styles.play}
        source={require('../../assets/images/play.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playBtnContainer: {
    alignItems: 'center',
  },
  play: {
    width: 300,
    height: 300,
  },
});
export default BeatPlayBtn;
