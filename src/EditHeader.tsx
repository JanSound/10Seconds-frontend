import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';

const EditHeader = ({ navigation }: any) => {
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        {/* <GuideBtn /> */}
        <Text style={styles.title}>10Seconds</Text>
        {/* <MenuBtn navigation={navigation} /> */}
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
});

export default EditHeader;
