import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const defaultColor = 'black';
const clickedColor = '#4FACF9';

const BeatListItemText = (props: any) => {
  const { beat } = props;
  return (
    <View>
      <Text
        style={[
          styles.beatName,
          { color: beat.clicked ? clickedColor : defaultColor },
        ]}
      >
        {beat.name}
      </Text>
      <Text
        style={[
          styles.beatInstType,
          { color: beat.clicked ? clickedColor : defaultColor },
        ]}
      >
        {beat.instType}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  beatName: { fontSize: 20, fontFamily: 'NotoSansKR-Bold', color: 'black' },
  beatInstType: {
    fontSize: 15,
  },
});

export default BeatListItemText;
