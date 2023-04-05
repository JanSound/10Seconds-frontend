import React from 'react';
import { StyleSheet, View } from 'react-native';

const MergeBeatComponent = () => {
  return (
    <View style={styles.mergeBeatComponentContainer}>
      <View style={styles.mergeBeatContainer}>
        <View style={styles.mergeBeat}></View>
        <View style={styles.mergeBeat}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mergeBeatComponentContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  mergeBeatContainer: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mergeBeat: {
    width: 150,
    height: 100,
    backgroundColor: '#91D8FA',
    borderRadius: 20,
  },
});
export default MergeBeatComponent;
