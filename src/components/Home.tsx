import React, { useState, useEffect, useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import config from '../../config/config';
import {
  PERMISSIONS,
  RESULTS,
  request,
  check,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  StyleSheet,
  View,
  Alert,
  Linking,
  Platform,
  AppState,
  Text,
  StatusBar,
  Animated,
  Button,
} from 'react-native';
import RNFS from 'react-native-fs';
import RecordBtn from '../common/button/RecordBtn';
import GoogleSignInBtn from '../common/button/GoogleSignInBtn';
import LinearGradient from 'react-native-linear-gradient';
import BeatListModal from '../common/modal/BeatListModal';
import Converting from './Converting';
import Recording from './Recording';
import PauseBtn from '@/common/button/PauseBtn';
import AWS from 'aws-sdk';
import axios from 'axios';
import { Buffer } from 'buffer';
import { getUserBeats } from '@/apis/getUserBeats';
import * as Animatable from 'react-native-animatable';

StatusBar.setBarStyle('light-content');

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.08);

const Home = (props: any) => {
  const { navigation, route } = props;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [converting, setConverting] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordPermission, setRecordPermission] = useState(false);
  const [recordDuration, setRecordDuration] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });

  const [playing, setPlaying] = useState(false);
  const [playerDuration, setPlayerDuration] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const recoPath = useRef('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    idToken: '',
    serverAuthCode: '',
    email: '',
    name: '',
  });
  let timerId: number | NodeJS.Timeout | undefined;

  const alertMikePermissionDenied = () => {
    Alert.alert('마이크 접근 권한 거부', '마이크 접근 권한을 허용해주세요 !', [
      {
        text: 'OK',
        onPress: () => Linking.openSettings(),
      },
    ]);
  };

  const handleStartRecord = async () => {
    try {
      const checkPermission: any = await checkRecordPermission();
      if (
        checkPermission[0] === 'granted' &&
        checkPermission[1] === 'granted'
      ) {
        // startStop();
        setRecording(true);
        setPlayerDuration({
          ...playerDuration,
          currentPositionSec: 0,
          currentDurationSec: 0,
          playTime: '00:00:00',
          duration: '00:00:00',
        });

        const path = Platform.select({
          ios: 'record.m4a',
        });
        const uri = await audioRecorderPlayer.startRecorder(path);
        recoPath.current = uri;
        audioRecorderPlayer.addRecordBackListener((e) => {
          setRecordDuration({
            ...recordDuration,
            recordSecs: e.currentPosition,
            recordTime: audioRecorderPlayer.mmssss(
              Math.floor(e.currentPosition),
            ),
          });
        });
      } else {
        alertMikePermissionDenied();
      }
    } catch (e) {
      console.log('녹음 에러 :', e);
      setRecording(false);
      alertMikePermissionDenied();
    }
  };

  const handleStopRecord = async () => {
    try {
      if (audioRecorderPlayer) {
        setRecording(false);
        uploadFile(recoPath.current);
        clearTimeout(timerId);
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordDuration({ ...recordDuration, recordSecs: 0 });
        setConverting(true);
      }
    } catch (e) {
      setRecording(false);
      alertMikePermissionDenied();
    }
  };

  const requestRecordPermission = async () => {
    await requestMultiple([
      PERMISSIONS.IOS.SPEECH_RECOGNITION,
      PERMISSIONS.IOS.MICROPHONE,
    ])
      .then((status) => {
        console.log(
          'speech recognition 권한:',
          status[PERMISSIONS.IOS.SPEECH_RECOGNITION],
        );
        console.log('microphone 권한:', status[PERMISSIONS.IOS.MICROPHONE]);
        if (
          status[PERMISSIONS.IOS.SPEECH_RECOGNITION] &&
          status[PERMISSIONS.IOS.MICROPHONE]
        ) {
          setRecordPermission(true);
        }
      })
      .catch((e) => {
        console.log('request API 에러 : ', e);
      });
  };

  const checkRecordPermission = async () => {
    const checkPermission = await checkMultiple([
      PERMISSIONS.IOS.MICROPHONE,
      PERMISSIONS.IOS.SPEECH_RECOGNITION,
    ])
      .then((status) => {
        console.log(
          'speech recognition 권한:',
          status[PERMISSIONS.IOS.SPEECH_RECOGNITION],
        );
        console.log('microphone 권한:', status[PERMISSIONS.IOS.MICROPHONE]);
        return [
          status[PERMISSIONS.IOS.SPEECH_RECOGNITION],
          status[PERMISSIONS.IOS.MICROPHONE],
        ];
      })
      .catch((e) => {
        console.log('check API 에러 :', e);
      });
    return checkPermission;
  };

  const googleConfigureSignIn = () => {
    GoogleSignin.configure({
      webClientId: config.oauth.GOOGLE_WEB_CLIENT_ID,
      iosClientId: config.oauth.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });
  };

  const checkCurrentScreen = () => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (audioRecorderPlayer) audioRecorderPlayer.resumePlayer();
      }
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        if (audioRecorderPlayer) audioRecorderPlayer.pausePlayer();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return subscription;
  };

  useEffect(() => {
    const subscription = checkCurrentScreen();
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    requestRecordPermission();
    googleConfigureSignIn();
  }, []);

  useEffect(() => {
    if (route.params) {
      setIsLoggedIn(route.params.isLoggedIn);
      setUserInfo(route.params.userInfo);
    }
  }, [route.params]);

  const uploadFile = async (recordingPath: string) => {
    try {
      const result = await axios
        .post('http://43.200.7.58:8001/api/v1/beats/presigned-url/put')
        .catch(() => {
          throw 'PRESIGNED-ERROR';
        });
      const PRESIGNED_URL = result.data['presigned_url'];
      const fileData = await RNFS.readFile(recordingPath, 'base64');
      const bufferFile = Buffer.from(fileData, 'base64');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'audio/m4a',
        },
        body: bufferFile,
      };
      // await fetch(PRESIGNED_URL, options).catch(() => {
      //   throw 'UPLOAD-ERROR';
      // });
    } catch (e: any) {
      if (e === 'PRESIGNED-ERROR') console.log('presigned-url 가져오기 실패');
      if (e === 'UPLOAD-ERROR') console.log('AWS S3 업로드 실패');
      else console.log('error:', e);
    }
  };

  // const music1 = 'https://daveceddia.com/freebies/react-metronome/click1.wav';
  // const music2 = 'https://daveceddia.com/freebies/react-metronome/click2.wav';
  // const [metro, setMetro] = useState({
  //   bpm: 100,
  //   beatsPerMeasure: 4,
  // });
  // const num = useRef(0);

  // const playClick = () => {
  //   num.current = (num.current + 1) % 4;
  //   if (num.current % metro.beatsPerMeasure === 0) {
  //     audioRecorderPlayer.startPlayer(music2);
  //   } else {
  //     audioRecorderPlayer.startPlayer(music1);
  //   }
  // };
  // const startStop = () => {
  //   num.current = 0;
  //   timerId = setTimeout(function run() {
  //     let startTime = new Date().getTime();
  //     playClick();
  //     let lastTime = new Date().getTime();
  //     setTimeout(run, 500 + (lastTime - startTime));
  //   }, 0);
  // };

  return (
    <LinearGradient colors={['#4FACF9', '#3A83F4']} style={styles.container}>
      <View style={styles.body}>
        {recording ? (
          <Recording
            recordDuration={recordDuration}
            handleStopRecord={handleStopRecord}
          />
        ) : converting ? (
          <Converting navigation={navigation} setConverting={setConverting} />
        ) : (
          <>
            <Text style={styles.mainText}>눌러서 녹음하기</Text>
            <View style={styles.recordBody}>
              {playing ? (
                <PauseBtn />
              ) : (
                <>
                  <RecordBtn
                    recording={recording}
                    handleStartRecord={handleStartRecord}
                  />
                </>
              )}
            </View>
          </>
        )}
      </View>
      {/* <Button onPress={playFirstBaseBeat} title="base"></Button>
      <Button onPress={playFirstPianoBeat} title="piano"></Button>
      <Button onPress={playFirstDrumBeat} title="drum"></Button>

      <Button onPress={playSecondBaseBeat} title="base2"></Button>
      <Button onPress={playSecondPianoBeat} title="piano2"></Button>
      <Button onPress={playSecondDrumBeat} title="drum2"></Button>

      <Button onPress={playMergeBeat} title="result"></Button> */}
      {isLoggedIn === false ? (
        <GoogleSignInBtn isLoggedIn={isLoggedIn} userInfo={userInfo} />
      ) : (
        <BeatListModal
          playing={playing}
          setPlaying={setPlaying}
          playerDuration={playerDuration}
          audioRecorderPlayer={audioRecorderPlayer}
          navigation={navigation}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 3.5,
    justifyContent: 'center',
  },
  recordBody: {
    flex: 0.5,
  },
  mainText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 35,
    lineHeight: 50,
    textAlign: 'center',
    marginBottom: 30,
  },
  play: {
    flex: 1,
    alignItems: 'center',
  },
  playing: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
