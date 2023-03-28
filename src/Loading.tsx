import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Loading = ({ handleStopRecord }: any) => {
  return (
    <View>
      <View style={styles.recordingLoadingContainer}>
        <AnimatedCircularProgress
          size={300}
          width={10}
          fill={100}
          onAnimationComplete={() => handleStopRecord()}
          backgroundColor="white"
          tintColor="black"
          duration={10000}
          rotation={0}
        >
          {(fill) => (
            <Image
              source={require('./assets/images/recordingOn.png')}
              style={styles.recordingImage}
            />
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingLoadingContainer: {
    alignItems: 'center',
  },
  recordingImage: {
    width: 120,
    height: 210,
  },
});

export default Loading;
