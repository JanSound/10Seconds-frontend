import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConvertLoading from './ConvertLoading';

const Converting = (props: any) => {
  const { navigation, setConverting } = props;
  return (
    <>
      <Text style={styles.mainText}>
        녹음된 화면을 {'\n'}
        악기로 변환하고 있어요
      </Text>
      <View style={styles.recordBody}>
        <ConvertLoading navigation={navigation} setConverting={setConverting} />
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
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 50,
  },
});

export default Converting;
