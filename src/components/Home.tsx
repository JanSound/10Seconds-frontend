import React, { useState, useEffect, useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import config from '../../config/config';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
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
import GuideModal from '../common/modal/GuideModal';
import LinearGradient from 'react-native-linear-gradient';
import BeatListModal from '../common/modal/BeatListModal';
import Converting from './Converting';
import Recording from './Recording';
import PauseBtn from '@/common/button/PauseBtn';
import MergeBeatComponent from './MergeBeatComponent';
import AWS from 'aws-sdk';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Buffer } from 'buffer';

StatusBar.setBarStyle('light-content');

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.08);

const ACCESS_KEY = config.aws.MY_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = config.aws.MY_AWS_SECRET_KEY;
const REGION = config.aws.MY_AWS_S3_BUCKET_REGION;
const S3_BUCKET = config.aws.MY_AWS_S3_BUCKET;

AWS.config.update({
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Home = (props: any) => {
  const { navigation, isModalVisible, setIsModalVisible } = props;
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
  const [recordingPath, setRecordingPath] = useState('');

  const [userInfo, setUserInfo] = useState({
    idToken: '',
    serverAuthCode: '',
    email: '',
    name: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      const checkPermission = await checkRecordPermission();
      if (checkPermission === RESULTS.GRANTED) {
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
        setRecordingPath(uri);
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

  const soundStart = async () => {
    setPlaying(true);
    // await audioRecorderPlayer.startPlayer(recordingPath);
    await audioRecorderPlayer.startPlayer(recordingPath);

    audioRecorderPlayer.addPlayBackListener((e) => {
      setPlayerDuration({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  const requestRecordPermission = async () => {
    await request(PERMISSIONS.IOS.SPEECH_RECOGNITION)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          setRecordPermission(true);
        }
      })
      .catch((e) => {
        console.log('request API 에러 : ', e);
      });
  };

  const checkRecordPermission = async () => {
    const checkPermission = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          setRecordPermission(true);
        }
        return result;
      })
      .catch((e) => {
        console.log('check API 에러 :', e);
      });
    return checkPermission;
  };

  const requestGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // userInfo : [idToken, serverAuthCode, scopes, user {email, name, photo} ]
      setUserInfo({
        idToken: userInfo.idToken!,
        serverAuthCode: userInfo.serverAuthCode!,
        email: userInfo.user.email,
        name: userInfo.user.name!,
      });

      const result = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
          code: userInfo.serverAuthCode,
          client_id: config.oauth.GOOGLE_WEB_CLIENT_ID,
          client_secret: config.oauth.GOOGLE_WEB_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: config.oauth.REDIRECT_URI,
        }),
      }).then((res) => {
        return res.json();
      });
      // result : ["access_token", "expires_in", "refresh_token", "scope", "token_type", "id_token"]
      // [ access_token 서버로 넘겨서 이중 보안 코드 작성 ]
      setIsLoggedIn(true);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('이미 로그인이 되어있습니다😎');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('서비스가 유효하지 않습니다. 다시 시도해 주세요🥺');
      } else {
        Alert.alert('다시 시도해주세요😭');
      }
    }
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

  const uploadFile = async () => {
    try {
      const result = await axios.post(
        'http://43.200.7.58:8001/api/v1/beats/presigned-url/put',
      );
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
      await fetch(PRESIGNED_URL, options);
    } catch (e: any) {
      console.log('try catch error 발생:', e);
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
      {isModalVisible && <GuideModal />}
      <View style={styles.body}>
        {recording ? (
          <Recording
            recordDuration={recordDuration}
            handleStopRecord={handleStopRecord}
          />
        ) : (
          <RecordBtn
            recording={recording}
            handleStartRecord={handleStartRecord}
          />
        )}
        {/* {recording ? (
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
        )} */}
      </View>
      {/* <Button onPress={startStop} title="start"></Button> */}
      <Button onPress={uploadFile} title="go"></Button>
      {isLoggedIn === false ? (
        <GoogleSignInBtn
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          requestGoogleLogin={requestGoogleLogin}
        />
      ) : (
        <BeatListModal
          isEditing={isEditing}
          playing={playing}
          setIsEditing={setIsEditing}
          setPlaying={setPlaying}
          playerDuration={playerDuration}
          audioRecorderPlayer={audioRecorderPlayer}
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
