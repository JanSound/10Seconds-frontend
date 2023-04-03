import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BeatListModal = () => {
  return (
    <View style={styles.beatListContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>내음악</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>편집</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  beatListContainer: {
    backgroundColor: 'white',
    height: 250,
    borderRadius: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Bold',
  },
  editBtn: {
    backgroundColor: '#4FACF9',
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default BeatListModal;
