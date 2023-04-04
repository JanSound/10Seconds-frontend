import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConvertLoading from './ConvertLoading';

const Converting = (props: any) => {
  const { navigation, setConverting } = props;
  return (
    <>
      <Text style={styles.mainText}>변환중. . .</Text>
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
    fontSize: 35,
    lineHeight: 50,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default Converting;
