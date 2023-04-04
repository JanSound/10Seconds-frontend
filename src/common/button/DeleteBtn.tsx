import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const DeleteBtn = (props: any) => {
  const { handleDeleteBeats } = props;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'red',
        borderRadius: 20,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
      }}
      onPress={handleDeleteBeats}
    >
      <Text style={{ color: 'white', fontFamily: 'NotoSansKR-Bold' }}>
        삭제
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteBtn;
