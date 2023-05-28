import React, { useState, useEffect, useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import config from '../../config/config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
import { Buffer } from 'buffer';
import { convertBeat, getPresignedUrl, uploadBeat } from '@/apis/userBeat';
import * as Animatable from 'react-native-animatable';
import {
  alertMikePermissionDenied,
  checkRecordPermission,
  requestRecordPermission,
} from '@/apis/userPermisson';
import { useRecoilState } from 'recoil';
import { recoilSelectInstBeatState } from '@/recoil/Beat';
import { shareBeat } from '@/apis/kakaoShare';
import BpmSlider from './BpmSlider';

StatusBar.setBarStyle('light-content');

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.08);

const Home = (props: any) => {
  const { navigation, route } = props;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [selectInstBeat, setSelectInstBeat] = useRecoilState(
    recoilSelectInstBeatState,
  );
  const [converting, setConverting] = useState(false);
  const [recording, setRecording] = useState(false);
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
  const [bpm, setBpm] = useState(120);
  let timerId: number | NodeJS.Timeout | undefined;

  const handleStartRecord = async () => {
    try {
      const checkPermission: any = await checkRecordPermission();
      // shareBeat();
      if (
        checkPermission[0] === 'granted' &&
        checkPermission[1] === 'granted'
      ) {
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

  const uploadFile = async (recordingPath: string) => {
    try {
      const fetchData = await getPresignedUrl();
      const AUDIO_KEY = fetchData.data['key'];
      const PRESIGNED_URL = fetchData.data['presigned_url'];
      const fileData = await RNFS.readFile(recordingPath, 'base64');
      const bufferFile = Buffer.from(fileData, 'base64');

      await uploadBeat(PRESIGNED_URL, bufferFile);
      const convert = await convertBeat(AUDIO_KEY);
      setSelectInstBeat(convert);
    } catch (e: any) {
      if (e === 'PRESIGNED-ERROR') console.log('presigned-url 가져오기 실패');
      if (e === 'UPLOAD-ERROR') console.log('AWS S3 업로드 실패');
      else console.log('error:', e);
    }
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

  return (
    <LinearGradient colors={['#4FACF9', '#3A83F4']} style={styles.container}>
      <View style={styles.body}>
        {recording ? (
          <Recording
            recordDuration={recordDuration}
            handleStopRecord={handleStopRecord}
            bpm={bpm}
          />
        ) : converting ? (
          <Converting navigation={navigation} setConverting={setConverting} />
        ) : (
          <>
            <View style={styles.recordBody}>
              {playing ? (
                <>
                  <Text style={styles.mainText}>재생중</Text>
                  <PauseBtn />
                </>
              ) : (
                <>
                  <Text style={styles.mainText}>눌러서 녹음하기</Text>
                  <RecordBtn
                    recording={recording}
                    handleStartRecord={handleStartRecord}
                  />
                  <BpmSlider bpm={bpm} setBpm={setBpm} />
                </>
              )}
            </View>
          </>
        )}
      </View>

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
    fontSize: 30,
    lineHeight: 50,
    textAlign: 'center',
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
