import SelectPlayBtn from '../common/button/SelectPlayBtn';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';

interface IInstrument {
  [key: string]: ImageSourcePropType;
}
interface IBeat {
  id: string;
  name: string;
  instType: string;
}

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
};

const BeatListScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    { id: 'beat url', name: '베이스 좡좡', instType: 'base' },
    { id: 'beat url2', name: '피아노 딩동댕', instType: 'piano' },
    { id: 'beat url3', name: '드럼 둥둥', instType: 'drum' },
  ]);

  useEffect(() => {
    // s3에 저장된 user의 비트리스트를 가져온다
  }, []);

  return (
    <>
      <EditHeader navigation={navigation} />
      <View style={styles.beatListContainer}>
        <ScrollView contentContainerStyle={styles.beatList}>
          {beats.map((beat: IBeat, index) => (
            <View style={styles.beat} key={index}>
              <SelectPlayBtn
                beatId={beat.id}
                instType={beat.instType}
                navigation={navigation}
              />
              <Text style={styles.beatContent}>{beat.name}</Text>
              <Image
                style={{ width: 50, height: 50 }}
                source={instrument[beat.instType]}
              ></Image>
            </View>
          ))}
        </ScrollView>
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
  beatList: {
    alignItems: 'center',
  },
  beat: {
    width: 300,
    height: 70,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',
  },
  beatContent: {
    fontSize: 20,
  },
});

export default BeatListScreen;
