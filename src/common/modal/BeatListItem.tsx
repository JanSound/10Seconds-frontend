import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const defaultColor = 'black';
const clickedColor = '#4FACF9';

const BeatListItem = (props: any) => {
  const { beat } = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleBeatClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <TouchableOpacity style={styles.beatContainer} onPress={handleBeatClick}>
      <Text
        style={[
          styles.beatName,
          { color: isClicked ? defaultColor : clickedColor },
        ]}
      >
        {beat.name}
      </Text>
      <Text
        style={[
          styles.beatInstType,
          { color: isClicked ? defaultColor : clickedColor },
        ]}
      >
        {beat.instType}
      </Text>
    </TouchableOpacity>
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
