import { convertBeat } from '@/apis/userBeat';
import { recoilSelectInstBeatState } from '@/recoil/Beat';
import React, { useEffect } from 'react';
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { useRecoilState } from 'recoil';

const ConvertLoading = (props: any) => {
  const { navigation, setConverting, audioKey } = props;
  const [selectInstBeat, setSelectInstBeat] = useRecoilState(
    recoilSelectInstBeatState,
  );
  const handleConvert = async () => {
    const convert = await convertBeat(audioKey);
    setSelectInstBeat(convert);
    setConverting(false);
    navigation.navigate('Select');
  };
  useEffect(() => {
    handleConvert();
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
