import BeatListItem from './BeatListItem';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import EditBtn from '../button/EditBtn';
import DeleteBtn from '../button/DeleteBtn';
import MergeBtn from '../button/MergeBtn';
import { deleteBeats, getUserBeats } from '@/apis/userBeat';
import { recoilBeatState } from '@/recoil/Beat';
import { useRecoilState } from 'recoil';
import { IBeat } from '@/types/beat';
//   id: 'beat url 1',
//   name: 'beat name 1',
//   beatType: 'base',
//   playTime: '00:00:00',
//   duration: '00:00:00',
//   checked: false,
//   clicked: false,

const BeatListModal = (props: any) => {
  const {
    audioRecorderPlayer,
    playing,
    setPlaying,
    playerDuration,
    navigation,
  } = props;
  const [beats, setBeats] = useRecoilState(recoilBeatState); // 실전용

  const [isEditing, setIsEditing] = useState(false);

  const handleEditBtnClick = () => {
    setIsEditing(!isEditing);
    setPlaying(false);
    setBeats(
      beats.map((beat: IBeat) => {
        return { ...beat, checked: false, clicked: false };
      }),
    );
  };

  const handleIsChecked = (id: string) => {
    setBeats(
      beats.map((beat: IBeat) => {
        return beat.id === id ? { ...beat, checked: !beat.checked } : beat;
      }),
    );
  };

  const playBeat = async (id: string) => {
    try {
      beats.map(async (beat: IBeat) => {
        if (beat.id === id) {
          await audioRecorderPlayer.startPlayer(beat.presignedUrl);
        }
      });
      audioRecorderPlayer.addPlayBackListener(() => {});
    } catch (err) {
      console.log('재생오류:', err);
    }
  };

  let timerId: any;
  const handleBeatClick = (id: string) => {
    setPlaying(true);
    playBeat(id);
    timerId = setTimeout(() => {
      setPlaying(false);
      setBeats(
        beats.map((beat: IBeat) => {
          return beat.id === id ? { ...beat, clicked: false } : beat;
        }),
      );
    }, 10000);
    if (playing === true) {
      if (timerId) clearTimeout(timerId);
    }
    setBeats(
      beats.map((beat: IBeat) => {
        return beat.id === id
          ? { ...beat, clicked: true }
          : { ...beat, clicked: false };
      }),
    );
    // playUserBeat(id);
  };

  const handleDeleteBeats = async () => {
    const checkedBeats = beats.filter((beat: IBeat) => beat.checked === false);
    await deleteBeats(checkedBeats);
    setBeats(beats.filter((beat: IBeat) => beat.checked === false));
  };

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animation, {
      toValue: -180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  useEffect(() => {
    getUserBeats()
      .then((beatArray) => {
        const newBeat: IBeat[] = [];
        Array.isArray(beatArray) &&
          beatArray.map((fetchBeat: any) => {
            const { ID, BeatType, PresignedUrl, RegTs } = fetchBeat;
            newBeat.push({
              id: ID,
              name: BeatType + ID.toString(),
              beatType: BeatType,
              presignedUrl: PresignedUrl,
              createdAt: RegTs,
              checked: false,
              clicked: false,
            });
          });
        setBeats([...newBeat]);
      })
      .catch((error) => console.log('BeatListModal no data error:', error));
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
            <MergeBtn
              navigation={navigation}
              setPlaying={setPlaying}
              beats={beats}
            />
          </View>

          <EditBtn
            isEditing={isEditing}
            handleEditBtnClick={handleEditBtnClick}
          />
        </View>
      ) : (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>내 음악</Text>
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
        <ScrollView>
          {beats.map((beat: IBeat) => {
            return (
              <BeatListItem
                beat={beat}
                key={beat.id}
                handleIsChecked={handleIsChecked}
                handleBeatClick={handleBeatClick}
                isEditing={isEditing}
              />
            );
          })}
        </ScrollView>
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
