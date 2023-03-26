import PlayBtn from '../common/button/PlayBtn';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';

const BeatListScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    { id: 'beat url', name: 'beat name', instType: 'base' },
    { id: 'beat url2', name: 'beat name2', instType: 'piano' },
    { id: 'beat url3', name: 'beat name3', instType: 'drum' },
  ]);

  useEffect(() => {
    // s3에 저장된 user의 비트리스트를 가져온다
  }, []);
  return (
    <>
      <EditHeader navigation={navigation} />
      <View style={styles.beatListContainer}>
        <ScrollView contentContainerStyle={styles.beatList}>
          {beats.map(
            (
              beat: {
                id: string;
                name: string;
                instType: string;
              },
              index,
            ) => (
              <View style={styles.beat} key={index}>
                <PlayBtn beatId={beat.id} instType={beat.instType} />
                <Text style={styles.beatContent}>{beat.name}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../assets/images/base.png')}
                ></Image>
              </View>
            ),
          )}
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
