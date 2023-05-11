import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MergeBtn = (props: any) => {
  const { navigation, setIsEditing, beats } = props;
  return (
    <TouchableOpacity
      style={styles.mergeBtnContainer}
      onPress={() => {
        navigation.navigate('Merge', { beats: beats });
      }}
    >
      <Text style={{ color: 'white', fontFamily: 'NotoSansKR-Bold' }}>
        병합
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mergeBtnContainer: {
    backgroundColor: '#4FACF9',
    borderRadius: 20,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default MergeBtn;
