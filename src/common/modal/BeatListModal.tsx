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
import { getUserBeats } from '@/apis/getUserBeats';
import { recoilBeatState } from '@/recoil/Beat';
import { useRecoilState } from 'recoil';
//   id: 'beat url 1',
//   name: 'beat name 1',
//   beatType: 'base',
//   playTime: '00:00:00',
//   duration: '00:00:00',
//   checked: false,
//   clicked: false,

interface IBeat {
  id: string;
  name: string;
  beatType: string;
  presignedUrl: string;
  createdAt: string;
  checked: boolean;
  clicked: boolean;
}

const BeatListModal = (props: any) => {
  const {
    audioRecorderPlayer,
    playing,
    setPlaying,
    playerDuration,
    navigation,
  } = props;
  const [beats, setBeats] = useRecoilState(recoilBeatState);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditBtnClick = () => {
    setIsEditing(!isEditing);
    setPlaying(false);
    setBeats(
      beats.map((beat: any) => {
        return { ...beat, checked: false, clicked: false };
      }),
    );
  };

  const handleIsChecked = (id: string) => {
    setBeats(
      beats.map((beat: any) => {
        return beat.id === id ? { ...beat, checked: !beat.checked } : beat;
      }),
    );
  };

  const playUserBeat = async (beatPath: string) => {
    setPlaying(true);
    await audioRecorderPlayer.startPlayer(beatPath);
    audioRecorderPlayer.addPlayBackListener(() => {});
  };

  let timerId: any;
  const handleBeatClick = (id: string) => {
    timerId = setTimeout(
      () => {
        setPlaying(false);
        setBeats(
          beats.map((beat: any) => {
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
      beats.map((beat: any) => {
        return beat.id === id
          ? { ...beat, clicked: true }
          : { ...beat, clicked: false };
      }),
    );
    // playUserBeat(id);
  };

  const handleDeleteBeats = () => {
    setBeats(beats.filter((beat: any) => beat.checked === false));
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
        beats.map((beat: any) => {
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
