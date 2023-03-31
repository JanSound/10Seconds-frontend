import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';
import BeatListItem from '@/BeatListItem';

interface IBeat {
  id: string;
  name: string;
  instType: string;
}

const BeatListScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    { id: 'beat url', name: '베이스 좡좡', instType: 'base' },
    { id: 'beat url2', name: '피아노 딩동댕', instType: 'piano' },
    { id: 'beat url3', name: '드럼 둥둥', instType: 'drum' },
  ]);

  const [isChecked, setIsChecked] = useState(false);
  const isSelected = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    // s3에 저장된 user의 비트리스트를 가져온다
  }, []);

  return (
    <>
      <EditHeader navigation={navigation} />
      <View style={styles.beatListContainer}>
        <ScrollView contentContainerStyle={styles.beatList}>
          {beats.map((beat: IBeat, index) => (
            <BeatListItem
              beat={beat}
              key={index}
              navigation={navigation}
              isSelected={isSelected}
            />
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
});

export default BeatListScreen;
