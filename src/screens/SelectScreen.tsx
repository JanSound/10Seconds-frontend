import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

interface IConvertBeat {
  BeatType: string;
  PresignedUrl: string;
  Key: string;
}

// const instrumentId: IInstrument = {
//   base: 'same beat base url',
//   piano: 'same beat paino url',
//   drum: 'same beat drum url',
//   kick: 'same beat drum url',
//   snare: 'same beat snare url',
//   hihat: 'same beat hat url',
// };

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
  // kick: require('../assets/images/kick.png'),
  snare: require('../assets/images/snare.png'),
  hihat: require('../assets/images/hihat.png'),
};

const SelectScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([] as any);
  const playBeat = (beat: IConvertBeat) => {
    navigation.navigate('Player', {
      BeatType: beat.BeatType,
      PresignedUrl: beat.PresignedUrl,
      Key: beat.Key,
    });
  };

  const convertBeat = async () => {
    try {
      const result = await axios
        .post('http://43.200.7.58:8001/api/v1/beats/presigned-url/put')
        .catch(() => {
          throw 'PRESIGNED-ERROR';
        });
      const AUDIO_KEY = result.data['key'];
      const convertBeatList = await axios
        .post('http://43.200.7.58:8001/api/v1/convert-beat', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },

          key: AUDIO_KEY,
        })
        .catch(() => {
          throw 'DB-ERROR';
        });
      setBeats(convertBeatList.data);
    } catch (e: any) {
      if (e === 'PRESIGNED-ERROR') console.log('presigned-url 가져오기 실패');
      if (e === 'UPLOAD-ERROR') console.log('AWS S3 업로드 실패');
      if (e === 'DB-ERROR') console.log('DB 저장 실패');
      else console.log('error:', e);
    }
  };
  useEffect(() => {
    convertBeat();
  }, []);

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
          keyExtractor={(item) => item.Key}
          data={beats}
          contentContainerStyle={{
            alignItems: 'center',
            width: 370,
            height: 230,
            marginBottom: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => playBeat(item)}>
              <View style={styles.container}>
                <Image style={styles.inst} source={instrument[item.BeatType]} />
                <Text style={styles.instTypeText}>{item.BeatType}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
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
    fontSize: 25,
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
    width: 150,
    height: 160,
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
