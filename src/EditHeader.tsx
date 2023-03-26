import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import EditBtn from './EditBtn';

const EditHeader = ({ navigation }: any) => {
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <EditBtn />
        <Text style={styles.title}>10Seconds</Text>
        <View style={styles.whiteSpace}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  whiteSpace: {
    width: 50,
    height: 50,
  },
});

export default EditHeader;
