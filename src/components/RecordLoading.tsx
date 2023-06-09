import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RecordBtn from '../common/button/RecordBtn';
import * as Animatable from 'react-native-animatable';
import ClapAnimation from './ClapAnimation';

const RecordLoading = (props: any) => {
  const { handleStopRecord, recordDuration, bpm } = props;
  return (
    <View>
      <View style={styles.recordingLoadingContainer}>
        <AnimatedCircularProgress
          size={250}
          width={20}
          fill={100}
          onAnimationComplete={() => handleStopRecord()}
          backgroundColor="#4FACF9"
          tintColor="red"
          duration={10000}
          rotation={0}
        >
          {(fill) => <ClapAnimation bpm={bpm} />}
        </AnimatedCircularProgress>
        <Text style={styles.recordingTime}>{recordDuration.recordTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingLoadingContainer: {
    alignItems: 'center',
    margin: 30,
  },
  recordingTime: {
    width: 300,
    marginTop: 20,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  viewContainer: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
});

export default RecordLoading;
