import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConvertLoading from './ConvertLoading';

const TEXT_TIP = [
  '💡 조용한 곳에서 녹음하기 💡',
  '💡 음성인식이 잘되도록 큰 소리로 녹음하기 💡',
  '💡 연속된 음보다는 명확히 음을 끊어주기 💡',
  '💡 중간중간 비트 병합하고 들어보기 💡',
];

const Converting = (props: any) => {
  const { navigation, setConverting, audioKey } = props;
  const [tip, setTip] = useState('');
  let timerId: number | NodeJS.Timeout | undefined;

  useEffect(() => {
    setTip(TEXT_TIP[Math.floor(Math.random() * 4)]);
    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <Text style={styles.mainText}>
        녹음된 음성을 {'\n'}
        악기로 변환하고 있어요
      </Text>
      <Text style={styles.textTip}>⭐️ 녹음 TIP ⭐️</Text>
      <Text style={styles.textTip}>{tip}</Text>
      <View style={styles.recordBody}>
        <ConvertLoading
          navigation={navigation}
          setConverting={setConverting}
          audioKey={audioKey}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  recordBody: {
    flex: 0.5,
    marginTop: 20,
  },
  mainText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 50,
  },
  textTip: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Converting;
