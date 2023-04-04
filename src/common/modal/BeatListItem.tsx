import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BeatListItem = (props: any) => {
  const { beat } = props;
  return (
    <View style={styles.beatContainer}>
      <Text style={styles.beatName}>{beat.name}</Text>
      <Text style={styles.beatInstType}>{beat.instType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  beatContainer: {
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  beatName: { fontSize: 20, fontFamily: 'NotoSansKR-Bold' },
  beatInstType: {
    fontSize: 15,
  },
});

export default BeatListItem;
