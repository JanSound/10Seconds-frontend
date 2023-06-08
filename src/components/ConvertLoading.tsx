import { convertBeat } from '@/apis/userBeat';
import { recoilSelectInstBeatState } from '@/recoil/Beat';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Alert,
  Linking,
} from 'react-native';
import { useRecoilState } from 'recoil';

const ConvertLoading = (props: any) => {
  const { navigation, setConverting, audioKey } = props;
  const [selectInstBeat, setSelectInstBeat] = useRecoilState(
    recoilSelectInstBeatState,
  );
  const handleConvert = async () => {
    try {
      const convert = await convertBeat(audioKey);
      setSelectInstBeat(convert);
      setConverting(false);
      navigation.navigate('Select');
    } catch (e) {
      if (e === '비트변환 ERROR') {
        Alert.alert(
          '비트 변환 오류',
          '음성이 인식되지 않았습니다. 다시 녹음해주세요 🙏',
          [
            {
              text: '확인',
              onPress: () => {
                setConverting(false);
              },
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    if (audioKey) handleConvert();
  }, [audioKey]);

  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator
        style={{ transform: [{ scaleX: 6 }, { scaleY: 6 }] }}
        size="large"
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    marginTop: 100,
  },
});

export default ConvertLoading;
