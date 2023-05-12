import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FinishBtn = (props: any) => {
  const { beats, setBeats, navigation, handleFinishMerge } = props;
  return (
    <TouchableOpacity
      style={styles.mergeBtnContainer}
      onPress={() => {
        handleFinishMerge();
        setBeats(
          beats.map((beat: any) => {
            return { ...beat, checked: false };
          }),
        );
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
