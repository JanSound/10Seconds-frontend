import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

StatusBar.setBarStyle('light-content');

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const audioRecorderPlayer = new AudioRecorderPlayer();
const App = () => {
  const [recording, setRecording] = useState(false);
  const [mikePermission, setMikePermission] = useState(false);
  const [recordDuration, setRecordDuration] = useState({
    recordSecs: 0,
    recordTime: '',
  });

  const handleStartRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(true);
      await audioRecorderPlayer.startRecorder();
    }
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordDuration({
        ...recordDuration,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
  };

  const handleStopRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(false);
      await audioRecorderPlayer.stopRecorder();
    }
    audioRecorderPlayer.removeRecordBackListener();
    setRecordDuration({ ...recordDuration, recordSecs: 0 });
  };

  const checkRecordPermission = async () => {
    try {
      await request(PERMISSIONS.IOS.SPEECH_RECOGNITION).then((result) => {
        if (result === 'granted') {
          setMikePermission(true);
          console.log('성공');
        }
      });
    } catch (e) {
      console.log(`에러 \n ${e}`);
    }
  };

  useEffect(() => {
    checkRecordPermission();
  }, [mikePermission]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <Text style={styles.title}>10Seconds</Text>
      </View>
      <View style={styles.body}>
        {recording ? (
          <Button
            title="Stop"
            color="black"
            onPress={handleStopRecord}
          ></Button>
        ) : (
          <Button
            title="Recording"
            color="black"
            onPress={handleStartRecord}
          ></Button>
        )}
      </View>
      <View style={styles.footerNavigation}>
        <Button title="tab1"></Button>
        <Button title="tab2"></Button>
        <Button title="tab3"></Button>
        <Button title="tab4"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  header: {
    backgroundColor: 'white',
    height: 40,
  },
  tabBar: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 4,
    justifyContent: 'center',
  },
  footerNavigation: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
