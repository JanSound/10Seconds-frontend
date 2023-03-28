import React from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordBtn = (props: any) => {
  const { handleStartRecord } = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.recordingContainer}
        onPress={handleStartRecord}
      >
        <Image
          style={styles.recordingImage}
          source={require('../../assets/images/recordingOff.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingContainer: {
    alignItems: 'center',
  },
  recordingImage: {
    width: 110,
    height: 210,
  },
});
export default RecordBtn;
