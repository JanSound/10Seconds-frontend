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
import LinearGradient from 'react-native-linear-gradient';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordBtn = (props: any) => {
  const { handleStartRecord } = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.recordingContainer}
        onPress={handleStartRecord}
      >
        <View style={styles.recordBtnContainer}>
          <View style={styles.recordBtn}>
            <LinearGradient
              colors={['#FF7F37', '#FF4E36']}
              style={styles.recordBtnCenter}
            ></LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recordingContainer: {
    alignItems: 'center',
  },
  recordBtnContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#4FACF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
  },
  recordBtn: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
  },
  recordBtnCenter: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default RecordBtn;
