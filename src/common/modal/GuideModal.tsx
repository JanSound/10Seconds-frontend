import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuideModal = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.dialog}></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>드럼 소리가 잘 안나오시죠 ?</Text>
        <Text style={styles.text}>잔 : 좡좡</Text>
        <Text style={styles.text}>소 : 챙챙</Text>
        <Text style={styles.text}>리 : 두둥탁</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 1,
    top: 10,
  },
  dialog: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    marginLeft: 30,
    marginTop: 20,
    transform: [{ rotate: '45deg' }],
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: 560,
    left: 10,
    top: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    padding: 50,
  },
});
export default GuideModal;
