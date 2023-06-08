import { playVoice } from '@/apis/userBeat';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RecordLoading from './RecordLoading';

let demoCount = 1;

// https://cau-tensecond.s3.ap-northeast-2.amazonaws.com/voice/case1_voice.m4a
// https://cau-tensecond.s3.ap-northeast-2.amazonaws.com/voice/case2_voice.m4a
// https://cau-tensecond.s3.ap-northeast-2.amazonaws.com/voice/case3_voice.m4a
// 3번 이후는 녹음 API

const Recording = (props: any) => {
  const { recordDuration, handleStopRecord, bpm } = props;

  useEffect(() => {
    if (demoCount <= 3) playVoice(`voice/case${demoCount}_voice.m4a`);
    demoCount += 1;
  }, []);

  return (
    <>
      <Text style={styles.mainText}>녹음중. . .</Text>
      <View style={styles.recordBody}>
        <RecordLoading
          bpm={bpm}
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
    fontSize: 30,
    lineHeight: 50,
    textAlign: 'center',
    margin: 20,
  },
});
export default Recording;
