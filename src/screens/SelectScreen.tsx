import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Footer from '../Footer';
import Header from '../common/header/Header';

interface IInstrument {
  [key: string]: string;
}
const instrumentId: IInstrument = {
  base: 'same beat base url',
  piano: 'same beat paino url',
  drum: 'same beat drum url',
};

const SelectScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    {
      id: 'same beat other instType url',
      instType: 'base',
    },
    {
      id: 'same beat other instType url2',
      instType: 'piano',
    },
    {
      id: 'same beat other instType url3',
      instType: 'drum',
    },
  ]);
  // input: 악기 선택(instType 선택)
  const playBeat = (instType: string) => {
    navigation.navigate('Player', {
      beatId: instrumentId[instType],
      instType: instType,
    });
  };

  return (
    <>
      <Header />
      <View style={styles.instrumentContainer}>
        <TouchableOpacity
          style={styles.baseContainer}
          onPress={() => playBeat('base')}
        >
          <Image
            style={styles.base}
            source={require('../assets/images/base.png')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>base</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pianoContainer}
          onPress={() => playBeat('piano')}
        >
          <Image
            style={styles.piano}
            source={require('../assets/images/piano.png')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>piano</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drumContainer}
          onPress={() => playBeat('drum')}
        >
          <Image
            style={styles.drum}
            source={require('../assets/images/drum.png')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>drum</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  instrumentContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  base: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  pianoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piano: {
    width: 150,
    height: 150,
  },
  drumContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drum: {
    width: 150,
    height: 150,
  },
});

export default SelectScreen;
