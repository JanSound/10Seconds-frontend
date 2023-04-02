import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BeatPlayBtn = () => {
  return (
    <>
      <TouchableOpacity style={styles.playBtnContainer}>
        <View style={styles.play}></View>
        <Image
          style={styles.playBtn}
          source={require('../../assets/images/playBtn.png')}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  playBtnContainer: {
    alignItems: 'center',
    flex: 1.5,
    justifyContent: 'center',
  },
  play: {
    width: 300,
    height: 300,
    backgroundColor: '#F2F1F6',
    opacity: 0.2,
    borderRadius: 500,
    alignItems: 'center',
  },
  playBtn: {
    position: 'absolute',
    bottom: 20,
    left: 90,
    transform: [{ scaleX: 0.3 }, { scaleY: 0.3 }],
  },
});
export default BeatPlayBtn;
