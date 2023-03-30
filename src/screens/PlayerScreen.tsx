import Header from '@/common/header/Header';
import Footer from '../Footer';
import React from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import BeatPlayBtn from '@/common/button/BeatPlayBtn';
import BeatListHeader from '@/common/header/BeatListHeader';
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
      <BeatListHeader navigation={navigation} />
      <View style={styles.playerContainer}>
        <Image
          style={styles.instrumentImage}
          source={instrument[route.params.instType]}
        />
        <BeatPlayBtn />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.download}>
            <Image source={require('../assets/images/download.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.merge}>
            <Image source={require('../assets/images/merge.png')} />
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  download: {
    flexDirection: 'column',
    marginRight: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    opacity: 0.9,
  },
  merge: {
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.9,
  },
});
export default PlayerScreen;
