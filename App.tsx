import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { oauth } from './config/oauth';

import { PERMISSIONS, request } from 'react-native-permissions';

StatusBar.setBarStyle('light-content');

const audioRecorderPlayer = new AudioRecorderPlayer();
const App = () => {
  const [recording, setRecording] = useState(false);
  const [RecordPermission, setRecordPermission] = useState(false);
  const [recordDuration, setRecordDuration] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  const [playerDuration, setPlayerDuration] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStartRecord = async () => {
    if (audioRecorderPlayer && RecordPermission) {
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
    } else {
      checkRecordPermission();
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

  const checkRecordPermission = async () => {
    await request(PERMISSIONS.IOS.SPEECH_RECOGNITION)
      .then((result) => {
        if (result === 'granted') {
          setRecordPermission(true);
          // 권한에 따라 분기처리
        }
      })
      .catch((e) => {
        console.log(`에러 \n ${e}`);
      });
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
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('다시 로그인 해주세요😭');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('이미 로그인이 되어있습니다😎');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('서비스가 유효하지 않습니다. 다시 시도해 주세요🥺');
      } else {
        Alert.alert('Something else went wrong... ', error.toString());
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
    checkRecordPermission();
    googleConfigureSignIn();
  }, [RecordPermission]);

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
      <View style={styles.play}>
        <Button title="Play" color="black" onPress={soundStart}></Button>
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
