import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const EditBtn = (props: any) => {
  const { isEditing, handleEditBtnClick } = props;
  return (
    <TouchableOpacity style={styles.editBtn} onPress={handleEditBtnClick}>
      {isEditing ? (
        <Image
          style={[styles.editBtnImage, { width: 20, height: 20 }]}
          source={require('../../assets/images/close.png')}
        />
      ) : (
        <Image
          style={styles.editBtnImage}
          source={require('../../assets/images/edit.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editBtn: {
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnImage: {
    width: 30,
    height: 30,
  },
});
export default EditBtn;
