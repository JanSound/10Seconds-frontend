import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';

const BeatListScreen = ({ navigation }: any) => {
  return (
    <>
      <EditHeader navigation={navigation} />
      <View style={styles.beatListContainer}>
        <Image source={require('../assets/images/drum.png')} />
      </View>

      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  beatListContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default BeatListScreen;
