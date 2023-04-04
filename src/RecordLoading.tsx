import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RecordBtn from './common/button/RecordBtn';

const RecordLoading = (props: any) => {
  const { handleStopRecord, recordDuration } = props;
  return (
    <View>
      <View style={styles.recordingLoadingContainer}>
        <AnimatedCircularProgress
          size={250}
          width={10}
          fill={100}
          onAnimationComplete={() => handleStopRecord()}
          backgroundColor="#4FACF9"
          tintColor="red"
          duration={1000}
          rotation={0}
        >
          {(fill) => <RecordBtn />}
        </AnimatedCircularProgress>
        <Text style={styles.recordingTime}>{recordDuration.recordTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingLoadingContainer: {
    alignItems: 'center',
  },
  recordingTime: {
    width: 300,
    marginTop: 20,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});

export default RecordLoading;
