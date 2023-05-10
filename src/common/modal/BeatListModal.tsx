import BeatListItem from './BeatListItem';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import EditBtn from '../button/EditBtn';
import DeleteBtn from '../button/DeleteBtn';
import MergeBtn from '../button/MergeBtn';

interface IBeat {
  id: string;
  name: string;
  instType: string;
  playTime: string;
  duration: string;
  checked: boolean;
  clicked: boolean;
}

const BeatListModal = (props: any) => {
  const {
    audioRecorderPlayer,
    playing,
    setPlaying,
    isEditing,
    setIsEditing,
    playerDuration,
    navigation,
  } = props;
  const [beats, setBeats] = useState([
    {
      id: 'beat url 1',
      name: 'beat name 1',
      instType: 'base',
      playTime: '00:00:00',
      duration: '00:00:00',
      checked: false,
      clicked: false,
    },
    {
      id: 'beat url 2',
      name: 'beat name 2',
      instType: 'piano',
      playTime: '00:00:00',
      duration: '00:00:00',
      checked: false,
      clicked: false,
    },
    {
      id: 'beat url 3',
      name: 'beat name 3',
      instType: 'drum',
      playTime: '00:00:00',
      duration: '00:00:00',
      checked: false,
      clicked: false,
    },
  ]);
  // const [isEditing, setIsEditing] = useState(false);

  const handleEditBtnClick = () => {
    setIsEditing(!isEditing);
    setPlaying(false);
    setBeats(
      beats.map((beat) => {
        return { ...beat, checked: false, clicked: false };
      }),
    );
  };

  const handleIsChecked = (id: string) => {
    setBeats(
      beats.map((beat) => {
        return beat.id === id ? { ...beat, checked: !beat.checked } : beat;
      }),
    );
  };

  const soundStart = async (id: string) => {
    setPlaying(true);
    await audioRecorderPlayer.startPlayer(id);

    audioRecorderPlayer.addPlayBackListener((e: any) => {
      beats.map((beat) =>
        beat.id === id
          ? {
              ...beat,
              playTime: audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
              ),
              duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            }
          : beat,
      );
    });
  };

  let timerId: any;
  const handleBeatClick = (id: string) => {
    timerId = setTimeout(
      () => {
        setPlaying(false);
        setBeats(
          beats.map((beat) => {
            return beat.id === id ? { ...beat, clicked: false } : beat;
          }),
        );
      },
      // playerDuration.duration,
      2000,
    );
    if (playing === true) {
      if (timerId) clearTimeout(timerId);
    }
    setBeats(
      beats.map((beat) => {
        return beat.id === id
          ? { ...beat, clicked: true }
          : { ...beat, clicked: false };
      }),
    );
    soundStart(id);
  };

  const handleDeleteBeats = () => {
    setBeats(beats.filter((beat) => beat.checked === false));
  };

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animation, {
      toValue: -200,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const animationStyles = {
    transform: [{ translateY: animation }],
  };
  return (
    <Animated.View style={[styles.beatListContainer, animationStyles]}>
      {isEditing ? (
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <DeleteBtn handleDeleteBeats={handleDeleteBeats} />
            <MergeBtn navigation={navigation} />
          </View>

          <EditBtn
            isEditing={isEditing}
            handleEditBtnClick={handleEditBtnClick}
          />
        </View>
      ) : (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>내음악</Text>
          <EditBtn
            isEditing={isEditing}
            handleEditBtnClick={handleEditBtnClick}
          />
        </View>
      )}
      {beats.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 20, opacity: 0.3 }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            아직 내 음악이 없네요
          </Text>
          <Text style={{ fontSize: 16 }}>첫 노래를 녹음해보세요 !</Text>
        </View>
      ) : (
        beats.map((beat) => {
          return (
            <BeatListItem
              beat={beat}
              key={beat.id}
              handleIsChecked={handleIsChecked}
              handleBeatClick={handleBeatClick}
              isEditing={isEditing}
            />
          );
        })
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  beatListContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    borderRadius: 30,
    top: 200,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Bold',
    paddingLeft: 20,
  },
});

export default BeatListModal;
