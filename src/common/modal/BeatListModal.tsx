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

const BeatListModal = () => {
  const [beats, setBeats] = useState([
    {
      id: 'beat url 1',
      name: 'beat name 1',
      instType: 'base',
      checked: false,
      clicked: false,
    },
    {
      id: 'beat url 2',
      name: 'beat name 2',
      instType: 'piano',
      checked: false,
      clicked: false,
    },
    {
      id: 'beat url 3',
      name: 'beat name 3',
      instType: 'drum',
      checked: false,
      clicked: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditBtnClick = () => {
    setIsEditing(!isEditing);
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

  const handleBeatClick = (id: string) => {
    setBeats(
      beats.map((beat) => {
        return beat.id === id
          ? { ...beat, clicked: true }
          : { ...beat, clicked: false };
      }),
    );
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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>내음악</Text>
        <TouchableOpacity style={styles.editBtn} onPress={handleEditBtnClick}>
          <Image
            style={styles.editBtnImage}
            source={require('../../assets/images/edit.png')}
          />
        </TouchableOpacity>
      </View>
      {beats.map((beat) => {
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  beatListContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    // height: 500,
    borderRadius: 30,
    top: 200,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Bold',
    paddingLeft: 20,
  },
  editBtn: {
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnImage: {
    width: 30,
    height: 30,
  },
});

export default BeatListModal;
