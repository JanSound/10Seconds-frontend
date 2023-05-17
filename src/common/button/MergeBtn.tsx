import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MergeBtn = (props: any) => {
  const { navigation, setIsEditing, beats, setPlaying } = props;
  return (
    <TouchableOpacity
      style={styles.mergeBtnContainer}
      onPress={() => {
        navigation.navigate('Merge');
      }}
    >
      <Text style={{ color: 'white', fontFamily: 'NotoSansKR-Bold' }}>
        비트합치기
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mergeBtnContainer: {
    backgroundColor: '#4FACF9',
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default MergeBtn;
