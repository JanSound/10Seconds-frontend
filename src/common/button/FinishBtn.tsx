import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FinishBtn = (props: any) => {
  const { navigation } = props;
  return (
    <TouchableOpacity style={styles.mergeBtnContainer}>
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
