import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BeatPlaySmallBtn = (props: any) => {
  const { beat, handleBeatClick } = props;
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.playBtnContainer}
        onPress={() => handleBeatClick(beat.id)}
      >
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
    width: 50,
    height: 50,
    backgroundColor: '#4FACF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  playBtn: {
    position: 'absolute',
    transform: [{ scaleX: 0.1 }, { scaleY: 0.1 }],
  },
});
export default BeatPlaySmallBtn;
