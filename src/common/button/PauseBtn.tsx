import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PauseBtn = () => {
  return (
    <View>
      <TouchableOpacity style={styles.recordingContainer}>
        <View style={styles.recordBtnContainer}>
          <View style={styles.pauseBtnOne}></View>
          <View style={styles.pauseBtnTwo}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingContainer: {
    alignItems: 'center',
  },
  recordBtnContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#4FACF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
    margin: 30,
  },
  pauseBtnOne: {
    width: 20,
    height: 90,
    backgroundColor: 'white',
    marginRight: 40,
    borderRadius: 30,
  },
  pauseBtnTwo: {
    width: 20,
    height: 90,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default PauseBtn;
