import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  TouchableOpacity,
  Text,
  Alert,
  Button,
} from 'react-native';
import BeatPlayBtn from '@/common/button/BeatPlayBtn';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignInBtn from '@/common/button/GoogleSignInBtn';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import config from '../../config/config';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useRecoilState } from 'recoil';
import { recoilBeatState } from '@/recoil/Beat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PauseBtn from '@/common/button/PauseBtn';
import { getOAuthToken } from '@/apis/userPermisson';
import { saveBeat } from '@/apis/userBeat';

const audioRecorderPlayer = new AudioRecorderPlayer();

let demoCount = 1;

const PlayerScreen = (props: any) => {
  const [beats, setBeats] = useRecoilState(recoilBeatState);
  const { route, navigation } = props;
  const { BeatType, PresignedUrl, Key } = route.params;
  const [playing, setPlaying] = useState(false);
  const cur = new Date();
  const createdDate = `${cur.getFullYear()}.${
    cur.getMonth() + 1
  }.${cur.getDate()}.`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    idToken: '',
    serverAuthCode: '',
    email: '',
    name: '',
  });
  let timerId: number | NodeJS.Timeout | undefined;
  const playBeat = async () => {
    try {
      setPlaying(true);
      timerId = setTimeout(() => {
        if (timerId) setPlaying(false);
      }, 10000);
      await audioRecorderPlayer.startPlayer(PresignedUrl);
      audioRecorderPlayer.addPlayBackListener(() => {});
    } catch (err) {
      console.log('재생오류:', err);
    }
  };

  const requestGoogleLogin = async () => {
    try {
      if ((await getOAuthToken()) !== null) {
        GoogleSignin.signInSilently();
        setIsLoggedIn(true);
        return;
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
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
      await AsyncStorage.setItem('token', JSON.stringify(result));
      // [ access_token 서버로 넘겨서 이중 보안 코드 작성 ]
      setIsLoggedIn(true);
      handleSaveSync();
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

  const handleSaveButtonClick = async () => {
    return await saveBeat(BeatType, Key);
  };

  const handleSaveSync = async () => {
    if (isLoggedIn) {
      console.log('save sync');
      await handleSaveButtonClick();
      console.log('save 완료');
      navigation.navigate('Home', {
        isLoggedIn,
        userInfo,
      });
    }
  };
  useEffect(() => {
    googleConfigureSignIn();
    const stopPlay = async () => {
      await audioRecorderPlayer.stopPlayer();
    };
    return () => {
      if (timerId) {
        console.log('STOP PLAYING 발동 !');
        stopPlay();
        clearTimeout(timerId);
      }
    };
  }, []);

  useEffect(() => {
    demoCount += 1;
  }, []);

  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.playerContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {createdDate} {BeatType}
          </Text>
          <Text style={styles.subText}>눌러서 비트 재생</Text>
        </View>
        {playing ? <PauseBtn /> : <BeatPlayBtn playBeat={playBeat} />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={isLoggedIn ? handleSaveSync : requestGoogleLogin}
          >
            <Text style={styles.downloadBtnText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.googleSignInBtn}>
        <GoogleSignInBtn />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  mainText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 25,
    lineHeight: 30,
  },
  subText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 20,
    lineHeight: 30,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  downloadBtn: {
    width: 343,
    height: 55,
    backgroundColor: '#224B9B',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtnText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
  },
  googleSignInBtn: {
    position: 'absolute',
    right: 45,
    bottom: 343,
    zIndex: 1,
  },
});
export default PlayerScreen;
