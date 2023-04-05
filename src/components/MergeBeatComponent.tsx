import React from 'react';
import { View } from 'react-native';

const MergeBeatComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 20,
      }}
    >
      <View
        style={{
          width: 320,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: 150,
            height: 100,
            backgroundColor: '#91D8FA',
            borderRadius: 20,
          }}
        ></View>
        <View
          style={{
            width: 150,
            height: 100,
            backgroundColor: '#91D8FA',
            borderRadius: 20,
          }}
        ></View>
      </View>
    </View>
  );
};

export default MergeBeatComponent;
