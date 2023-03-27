import Header from '@/common/header/Header';
import Footer from '../Footer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlayerScreen = (props: any) => {
  const { route, navigation } = props;
  return (
    <View style={styles.playerContainer}>
      <Header navigation={navigation} />
      <Text>{route.params.instType}</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
  },
});
export default PlayerScreen;
