import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RecordLoading from './RecordLoading';

const Recording = (props: any) => {
  const { recordDuration, handleStopRecord } = props;
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
