import { recoilBeatState } from '@/recoil/Beat';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';

const FinishBtn = (props: any) => {
  const { navigation, handleFinishMerge } = props;
  const [beats, setBeats] = useRecoilState(recoilBeatState);
  return (
    <TouchableOpacity
      style={styles.mergeBtnContainer}
      onPress={async () => {
        await handleFinishMerge();
        // setBeats( // 데모때매 주석
        //   beats.map((beat: any) => {
        //     return { ...beat, checked: false };
        //   }),
        // );
        navigation.navigate('Home');
      }}
    >
      <Text style={{ color: 'white', fontFamily: 'NotoSansKR-Bold' }}>
        완료
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mergeBtnContainer: {
    backgroundColor: '#4FACF9',
    borderRadius: 20,
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FinishBtn;
