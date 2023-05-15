import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IInstrument {
  [key: string]: ImageSourcePropType;
}

interface IBeat {
  ID: string;
  BeatType: string;
  PresignedUrl: string;
  RegTs: string;
}

// const instrumentId: IInstrument = {
//   base: 'same beat base url',
//   piano: 'same beat paino url',
//   kick: 'same beat drum url',
//   snare: 'same beat snare url',
//   hihat: 'same beat hat url',
// };

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  kick: require('../assets/images/kick.png'),
  snare: require('../assets/images/snare.png'),
  hihat: require('../assets/images/hihat.png'),
};

const SelectScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    {
      ID: '1',
      BeatType: 'base',
      RegTs: '2023-05-01T12:43:23Z',
      PresignedUrl: 'a',
    },
    {
      ID: '2',
      BeatType: 'piano',
      RegTs: '2023-05-02T12:43:23Z',
      PresignedUrl: 'ab',
    },
    {
      ID: '3',
      BeatType: 'kick',
      RegTs: '2023-05-03T12:43:23Z',
      PresignedUrl: 'abc',
    },
    {
      ID: '4',
      BeatType: 'snare',
      RegTs: '2023-05-04T12:43:23Z',
      PresignedUrl: 'abcd',
    },
    {
      ID: '5',
      BeatType: 'hihat',
      RegTs: '2023-05-05T12:43:23Z',
      PresignedUrl: 'abcde',
    },
  ]);
  // input: 악기 선택(BeatType 선택)
  const playBeat = (beat: IBeat) => {
    navigation.navigate('Player', {
      beatId: beat.ID,
      beatType: beat.BeatType,
      createdAt: beat.RegTs,
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
        <FlatList
          keyExtractor={(item) => item.PresignedUrl}
          data={beats}
          contentContainerStyle={{
            alignItems: 'center',
            width: 370,
            marginLeft: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => playBeat(item)}>
              <View style={styles.container}>
                <Image style={styles.inst} source={instrument[item.BeatType]} />
                <Text style={styles.instTypeText}>{item.BeatType}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
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
    marginTop: 60,
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
  inst: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: 180,
    height: 190,
  },
  instTypeText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SelectScreen;
