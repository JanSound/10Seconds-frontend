import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BeatListItem = (props: any) => {
  const { beat } = props;
  return (
    <View
      style={{
        height: 60,
        paddingLeft: 20,
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      key={beat.id}
    >
      <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Bold' }}>
        {beat.name}
      </Text>
      <Text style={{ fontSize: 15 }}>{beat.instType}</Text>
    </View>
  );
};

export default BeatListItem;
