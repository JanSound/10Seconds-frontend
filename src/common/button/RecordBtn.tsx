import React, { useEffect, useState } from 'react';
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
import CountDown from '@/components/CountDown';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordBtn = (props: any) => {
  const { handleStartRecord } = props;
  const [recordCountDown, setRecordCountDown] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.recordingContainer}
        onPress={() => setRecordCountDown(true)}
      >
        <View style={styles.recordBtnContainer}>
          {recordCountDown ? (
            <View style={{ alignItems: 'center' }}>
              <CountDown
                setRecordCountDown={setRecordCountDown}
                handleStartRecord={handleStartRecord}
              />
            </View>
          ) : (
            <View style={styles.recordBtn}>
              <LinearGradient
                colors={['#FF7F37', '#FF4E36']}
                style={styles.recordBtnCenter}
              ></LinearGradient>
            </View>
          )}
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
    width: 250,
    height: 250,
    backgroundColor: '#4FACF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
    margin: 30,
  },
  recordBtn: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
  },
  recordBtnCenter: {
    width: 70,
    height: 70,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default RecordBtn;
