import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const PlayBtn = (props: {
  beatId: string;
  instType: string;
  navigation: any;
}) => {
  const { beatId, instType, navigation } = props;
  const handlePlayBtn = (instType: string) => {
    navigation.navigate('Player', { instType: instType });
  };
  return (
    <TouchableOpacity onPress={() => handlePlayBtn(instType)}>
      <Image
        style={styles.guide}
        source={require('../../assets/images/play.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  guide: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
export default PlayBtn;
