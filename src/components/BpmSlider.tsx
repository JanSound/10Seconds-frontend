import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const BpmSlider = ({ bpm, setBpm }: any) => {
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontFamily: 'NotoSansKR-Bold' }}>
        {bpm} BPM
      </Text>
      <Slider
        style={{ width: 200, height: 80 }}
        minimumValue={60}
        maximumValue={240}
        value={bpm}
        minimumTrackTintColor="#3A83F4"
        maximumTrackTintColor="#000000"
        onValueChange={(e: any) => setBpm(Math.floor(e))}
      />
    </View>
  );
};

export default BpmSlider;
