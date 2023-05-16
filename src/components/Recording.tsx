import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RecordLoading from './RecordLoading';

const audioRecorderPlayer = new AudioRecorderPlayer();

let demoCount = 0;

const Recording = (props: any) => {
  const { recordDuration, handleStopRecord } = props;
  const playVoice = async () => {
    try {
      await audioRecorderPlayer.startPlayer(
        `https://cau-tensecond.s3.ap-northeast-2.amazonaws.com/tenseconds-demo/case${demoCount}_voice.m4a`,
      );
      audioRecorderPlayer.addPlayBackListener(() => {});
    } catch (err) {
      console.log('재생오류:', err);
    }
  };
  useEffect(() => {
    demoCount += 1;
    playVoice();
  }, []);
  return (
    <>
      <Text style={styles.mainText}>녹음중. . .</Text>
      <View style={styles.recordBody}>
        <RecordLoading
          handleStopRecord={handleStopRecord}
          recordDuration={recordDuration}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
export default Recording;
