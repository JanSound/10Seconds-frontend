import React, { useState, useEffect } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { oauth } from '../config/oauth';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import Recording from './Recording';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
  Linking,
  Image,
} from 'react-native';
import Loading from './Loading';

StatusBar.setBarStyle('light-content');

const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {
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

  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStartRecord = async () => {
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
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordDuration({
          ...recordDuration,
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        });
      });
    }
  };

  const handleStopRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(false);
      await audioRecorderPlayer.stopRecorder();
    }
    audioRecorderPlayer.removeRecordBackListener();
    setRecordDuration({ ...recordDuration, recordSecs: 0 });
  };

  const soundStart = async () => {
    setPlaying(true);
    await audioRecorderPlayer.startPlayer();
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
        } else {
          setRecordPermission(false);
          Alert.alert(
            '마이크 접근 권한 거부',
            '마이크 접근 권한을 허용해주세요 !',
            [
              {
                text: 'OK',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      })
      .catch((e) => {
        console.log('권한 request 에러 : ', e);
      });
  };

  const checkRecordPermission = async () => {
    const checkPermission = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          setRecordPermission(true);
          return result;
        } else {
          setRecordPermission(false);
          Alert.alert(
            '마이크 접근 권한 거부',
            '마이크 접근 권한을 허용해주세요 !',
            [
              {
                text: 'OK',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      })
      .catch((e) => {
        console.log('권한 check 에러:', e);
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
    requestRecordPermission();
    googleConfigureSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <Text style={styles.title}>10Seconds</Text>
      </View>
      <View style={styles.body}>
        {/* <Loading /> */}
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

export default App;
