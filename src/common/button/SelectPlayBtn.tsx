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
    <TouchableOpacity onPress={() => playBeat(instType)}></TouchableOpacity>
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
