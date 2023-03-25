import React, { useState, useEffect, useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { oauth } from '../config/oauth';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import Recording from './Recording';
import RNFetchBlob from 'rn-fetch-blob';
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
import Header from './Header';
import Footer from './Footer';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Home = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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

  const [userInfo, setUserInfo] = useState({});
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

        const dirs = RNFetchBlob.fs.dirs;
        const path = Platform.select({
          ios: 'recordVoice.m4a',
          android: `${dirs.CacheDir}/recordVoice.mp3`,
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

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // userInfo : [idToken, serverAuthCode, user {email, name, photo} ]

      setUserInfo(userInfo);

      const result = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
          code: userInfo.serverAuthCode,
          client_id: oauth.GOOGLE_WEB_CLIENT_ID,
          client_secret: oauth.GOOGLE_WEB_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: oauth.REDIRECT_URI,
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
      webClientId: oauth.GOOGLE_WEB_CLIENT_ID,
      iosClientId: oauth.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });
  };

  useEffect(() => {
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

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    requestRecordPermission();
    googleConfigureSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Recording
          recording={recording}
          handleStopRecord={handleStopRecord}
          handleStartRecord={handleStartRecord}
        />
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
        )}
      </View>

      <View style={styles.googleLogin}>
        {isLoggedIn === false ? (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleLogin}
          />
        ) : (
          <Text>로그인 완료!</Text>
        )}
      </View>
      <Footer />
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
  googleLogin: {
    flex: 1,
    alignItems: 'center',
  },
  footerNavigation: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Home;
