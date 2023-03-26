import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const EditBtn = () => {
  return (
    <TouchableOpacity>
      <Image
        style={styles.guide}
        source={require('../../assets/images/edit.png')}
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
export default EditBtn;
