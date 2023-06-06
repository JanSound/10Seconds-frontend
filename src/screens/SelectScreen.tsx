import { convertBeat } from '@/apis/userBeat';
import { recoilSelectInstBeatState } from '@/recoil/Beat';
import { IConvertBeat } from '@/types/beat';
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
import { useRecoilState } from 'recoil';

interface IInstrument {
  [key: string]: ImageSourcePropType;
}

const instrument: IInstrument = {
  bass: require('../assets/images/bass.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
};

const SelectScreen = ({ navigation }: any) => {
  const [selectInstBeat, setSelectInstBeat] = useRecoilState(
    recoilSelectInstBeatState,
  );
  const movePlayerScreen = (beat: IConvertBeat) => {
    console.log('SelectScreen playBeat item:', beat);
    navigation.navigate('Player', {
      BeatType: beat.BeatType,
      PresignedUrl: beat.PresignedUrl,
      Key: beat.Key,
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
          keyExtractor={(item, index) => index.toString()}
          data={selectInstBeat}
          contentContainerStyle={{
            alignItems: 'center',
            height: 250,
            marginBottom: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => movePlayerScreen(item)}>
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
