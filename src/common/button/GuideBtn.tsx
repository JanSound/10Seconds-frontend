import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const GuideBtn = (props: any) => {
  const { toggleModal } = props;
  return (
    <TouchableOpacity onPress={toggleModal}>
      <Image
        style={styles.guide}
        source={require('../../assets/images/guide.png')}
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
export default GuideBtn;
