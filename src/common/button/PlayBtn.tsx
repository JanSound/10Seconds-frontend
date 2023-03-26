import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const PlayBtn = (props: { beatId: string; instType: string }) => {
  const { beatId, instType } = props;
  return (
    // navigation.navigate('Play')
    // 재생화면으로 이동
    <TouchableOpacity>
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
