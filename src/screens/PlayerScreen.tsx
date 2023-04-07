import Header from '@/common/header/Header';
import Footer from '../Footer';
import React from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import BeatPlayBtn from '@/common/button/BeatPlayBtn';
import BeatListHeader from '@/common/header/BeatListHeader';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignInBtn from '@/common/button/GoogleSignInBtn';
interface IInstrument {
  [key: string]: ImageSourcePropType;
}

const instrument: IInstrument = {
  base: require('../assets/images/base.png'),
  piano: require('../assets/images/piano.png'),
  drum: require('../assets/images/drum.png'),
};

const PlayerScreen = (props: any) => {
  const { route, navigation, requestGoogleLogin } = props;
  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.playerContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>2023.04.02 base</Text>
          <Text style={styles.subText}>재생중</Text>
        </View>
        <BeatPlayBtn />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.googleSignInBtn}>
        <GoogleSignInBtn requestGoogleLogin={requestGoogleLogin} />
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
    flex: 1,
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
    height: 65,
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
    right: 30,
    bottom: 210,
    zIndex: 1,
  },
});
export default PlayerScreen;
