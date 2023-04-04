import BeatListItem from './BeatListItem';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

const BeatListModal = () => {
  const [beats, setBeats] = useState([
    {
      id: 'beat url 1',
      name: 'beat name 1',
      instType: 'base',
    },
    {
      id: 'beat url 2',
      name: 'beat name 2',
      instType: 'piano',
    },
    {
      id: 'beat url 3',
      name: 'beat name 3',
      instType: 'drum',
    },
  ]);

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
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>편집</Text>
        </TouchableOpacity>
      </View>
      {beats.map((beat) => {
        return <BeatListItem beat={beat} key={beat.id} />;
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
    backgroundColor: '#4FACF9',
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default BeatListModal;
