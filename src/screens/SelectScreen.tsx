import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
      id: 'same beat other beatType url',
      beatType: 'base',
      createdAt: '2023-05-01T12:43:23Z',
    },
    {
      id: 'same beat other beatType url2',
      beatType: 'piano',
      createdAt: '2023-05-02T12:43:23Z',
    },
    {
      id: 'same beat other beatType url3',
      beatType: 'drum',
      createdAt: '2023-05-02T12:43:23Z',
    },
  ]);
  // input: 악기 선택(beatType 선택)
  const playBeat = (beatType: string, createdAt: string) => {
    navigation.navigate('Player', {
      beatId: instrumentId[beatType],
      beatType,
      createdAt,
    });
  };

  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.instrumentContainer}
      >
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>악기를 선택해주세요</Text>
        </View>
        <TouchableOpacity
          style={styles.baseContainer}
          onPress={() => playBeat('base', beats[0].createdAt)}
        >
          <Image
            style={styles.base}
            source={require('../assets/images/base.png')}
          />
          <Text style={styles.instTypeText}>base</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pianoContainer}
          onPress={() => playBeat('piano', beats[1].createdAt)}
        >
          <Image
            style={styles.piano}
            source={require('../assets/images/piano.png')}
          />
          <Text style={styles.instTypeText}>piano</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drumContainer}
          onPress={() => playBeat('drum', beats[2].createdAt)}
        >
          <Image
            style={styles.drum}
            source={require('../assets/images/drum.png')}
          />
          <Text style={styles.instTypeText}>drum</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  instrumentContainer: {
    flex: 1,
  },
  descriptionContainer: {},
  description: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 30,
    lineHeight: 50,
    textAlign: 'center',
    marginTop: 50,
  },
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instTypeText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    marginTop: 10,
  },
  base: {
    width: 150,
    height: 150,
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
