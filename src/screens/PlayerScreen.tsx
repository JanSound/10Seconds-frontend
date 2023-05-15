import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import BeatPlayBtn from '@/common/button/BeatPlayBtn';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignInBtn from '@/common/button/GoogleSignInBtn';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import config from '../../config/config';

interface IInstrument {
  [key: string]: ImageSourcePropType;
}

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
};

const PlayerScreen = (props: any) => {
  const { route, navigation } = props;
  const [createdDate, createdTime] = route.params.createdAt.split(/T|Z/);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    idToken: '',
    serverAuthCode: '',
    email: '',
    name: '',
  });

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

  useEffect(() => {
    googleConfigureSignIn();
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home', { isLoggedIn, userInfo });
    }
  });
  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.playerContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {createdDate} {route.params.beatType}
          </Text>
          <Text style={styles.subText}>재생중</Text>
        </View>
        <BeatPlayBtn />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={requestGoogleLogin}
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
    right: 32,
    bottom: 342,
    zIndex: 1,
  },
});
export default PlayerScreen;
