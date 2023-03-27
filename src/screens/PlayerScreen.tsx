import Header from '@/common/header/Header';
import Footer from '../Footer';
import React from 'react';
import { StyleSheet, View, ImageSourcePropType, Image } from 'react-native';
import BeatPlayBtn from '@/common/button/BeatPlayBtn';
interface IInstrument {
  [key: string]: ImageSourcePropType;
}

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
};

const PlayerScreen = (props: any) => {
  const { route, navigation } = props;

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.playerContainer}>
        <Image
          style={styles.instrumentImage}
          source={instrument[route.params.instType]}
        />
        <BeatPlayBtn />
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  instrumentImage: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
export default PlayerScreen;
