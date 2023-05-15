import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BeatPlayBtn = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.playBtnContainer}>
        <Image
          style={styles.playBtn}
          source={require('../../assets/images/playBtn.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playBtnContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#4FACF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
    margin: 30,
  },
  playBtn: {
    position: 'absolute',
    left: 1,
    transform: [{ scaleX: 0.25 }, { scaleY: 0.25 }],
  },
});
export default BeatPlayBtn;
