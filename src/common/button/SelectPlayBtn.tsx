import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const SelectPlayBtn = (props: {
  beatId: string;
  instType: string;
  navigation?: any;
}) => {
  const { beatId, instType, navigation } = props;

  const playBeat = (instType: string) => {
    navigation.navigate('Player', { beatId: beatId, instType: instType });
  };
  return (
    <TouchableOpacity onPress={() => playBeat(instType)}>
      <Image
        style={styles.play}
        source={require('../../assets/images/play.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  play: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
export default SelectPlayBtn;
