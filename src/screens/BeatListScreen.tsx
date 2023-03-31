import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';
import BeatList from '@/BeatList';

const BeatListScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    { id: 'beat url', name: '베이스 좡좡', instType: 'base', checked: false },
    {
      id: 'beat url2',
      name: '피아노 딩동댕',
      instType: 'piano',
      checked: false,
    },
    { id: 'beat url3', name: '드럼 둥둥', instType: 'drum', checked: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const handleIsChecked = (id: string) => {
    setBeats(
      beats.map((beat) => {
        return beat.id === id ? { ...beat, checked: !beat.checked } : beat;
      }),
    );

    // setIsChecked(!isChecked);
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteBeats = () => {
    console.log(beats);
    setBeats(beats.filter((beat) => beat.checked === false));
  };

  useEffect(() => {
    // s3에 저장된 user의 비트리스트를 가져온다
  }, []);

  return (
    <>
      <EditHeader navigation={navigation} handleIsEditing={handleIsEditing} />
      <View style={styles.beatListContainer}>
        <Button title="delete" onPress={handleDeleteBeats} />
        <ScrollView contentContainerStyle={styles.beatList}>
          <BeatList
            beats={beats}
            navigation={navigation}
            isEditing={isEditing}
            handleIsChecked={handleIsChecked}
          />
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
