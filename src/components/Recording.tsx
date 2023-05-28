import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RecordLoading from './RecordLoading';

const Recording = (props: any) => {
  const { recordDuration, handleStopRecord, bpm } = props;

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
