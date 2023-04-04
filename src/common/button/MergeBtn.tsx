import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MergeBtn = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#4FACF9',
        borderRadius: 20,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
      }}
    >
      <Text style={{ color: 'white', fontFamily: 'NotoSansKR-Bold' }}>
        병합
      </Text>
    </TouchableOpacity>
  );
};

export default MergeBtn;
