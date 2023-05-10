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
          source={require('../../assets/images/playSmallBtn.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playBtnContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    position: 'absolute',
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});
export default BeatPlaySmallBtn;
