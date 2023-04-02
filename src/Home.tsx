import React, { useState, useEffect, useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import config from '../config/config';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Linking,
  Platform,
  AppState,
} from 'react-native';
import RNFS from 'react-native-fs';
import RecordLoading from './RecordLoading';
import RecordBtn from './common/button/RecordBtn';
import GoogleSignInBtn from './common/button/GoogleSignInBtn';
import GuideModal from './common/modal/GuideModal';
import ConvertLoading from './ConvertLoading';
import GestureRecognizer from 'react-native-swipe-gestures';

const audioRecorderPlayer = new AudioRecorderPlayer();

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
      if (audioRecorderPlayer && checkPermission === RESULTS.GRANTED) {
        setRecording(true);
        setPlayerDuration({
          ...playerDuration,
          currentPositionSec: 0,
          currentDurationSec: 0,
          playTime: '00:00:00',
          duration: '00:00:00',
        });

        const path = Platform.select({
          ios: 'recordVoice.m4a',
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
      }
    } catch (e) {
      console.log('녹음 오류 :', e);
      setRecording(false);
      alertMikePermissionDenied();
    }
  };

  const handleStopRecord = async () => {
    try {
      if (audioRecorderPlayer) {
        setRecording(false);
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordDuration({ ...recordDuration, recordSecs: 0 });
        setConverting(true);
        // navigation.navigate('Select');
      }
    } catch (e) {
      setRecording(false);
      alertMikePermissionDenied();
    }
  };

  const soundStart = async () => {
    setPlaying(true);
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
          return result;
        }
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

  const uploadRecordFile = async () => {
    const result = await fetch(
      'http://ec2-54-180-95-225.ap-northeast-2.compute.amazonaws.com:8001/api/v1/beats/generate-presigned-url',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .catch((e) => console.log('presigned url post 에러 :', e));
    const preUrl = result['presigned_url'];
    uploadRecordToS3(preUrl);
  };

  const uploadRecordToS3 = async (preUrl: string) => {
    const upload = (response: any) => {
      const jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    const uploadProgress = (response: any) => {
      const percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    const files = [
      {
        name: 'recordVoice.m4a',
        filename: 'recordVoice.m4a',
        filepath: recordingPath,
        filetype: 'audio/x-m4a',
      },
    ];

    RNFS.uploadFiles({
      toUrl: preUrl,
      files: files,
      method: 'PUT',
      headers: {
        'Content-Type': 'audio/x-m4a',
      },
      fields: {
        hello: 'world',
      },
      begin: upload,
      progress: uploadProgress,
    })
      .promise.then((response) => {
        if (response.statusCode == 200) {
          console.log(response);
          console.log('FILES UPLOADED!!!');
        } else {
          console.log('SERVER ERROR!!!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSwipeDown = (gestureState: any) => {
    console.log(gestureState);
    setIsModalVisible(false);
  };

  const onSwipeUp = (gestureState: any) => {
    console.log(gestureState);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeUp={(state) => onSwipeUp(state)}
        onSwipeDown={(state) => onSwipeDown(state)}
      >
        {isModalVisible && <GuideModal />}
        <View style={styles.body}>
          {recording ? (
            <RecordLoading handleStopRecord={handleStopRecord} />
          ) : converting ? (
            <ConvertLoading
              navigation={navigation}
              setConverting={setConverting}
            />
          ) : (
            <RecordBtn
              recording={recording}
              handleStartRecord={handleStartRecord}
            />
          )}
          {/* <Button
          color="white"
          title="s3로 보내기"
          onPress={uploadRecordFile}
        ></Button>
      </View>
      <View style={styles.play}>
        {playerDuration ? (
          playerDuration.duration === playerDuration.playTime ? (
            <Button title="Play" color="black" onPress={soundStart}></Button>
          ) : (
            <Text style={styles.playing}>playing</Text>
          )
        ) : (
          ''
        )} */}
        </View>
        <GoogleSignInBtn
          isLoggedIn={isLoggedIn}
          userInfo={userInfo}
          requestGoogleLogin={requestGoogleLogin}
        />
      </GestureRecognizer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  body: {
    flex: 4,
    justifyContent: 'center',
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
