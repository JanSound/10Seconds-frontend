import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BeatListCheckBox from '../checkbox/BeatListCheckBox';

const defaultColor = 'black';
const clickedColor = '#4FACF9';

const BeatListItem = (props: any) => {
  const { isEditing, beat, handleIsChecked } = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleBeatClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <TouchableOpacity
      style={styles.beatContainer}
      onPress={() => handleIsChecked(beat.id)}
    >
      <View>
        {isEditing ? (
          <BeatListCheckBox beat={beat} handleIsChecked={handleIsChecked} />
        ) : (
          <View />
        )}
      </View>
      <View>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  beatContainer: {
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  beatName: { fontSize: 20, fontFamily: 'NotoSansKR-Bold' },
  beatInstType: {
    fontSize: 15,
  },
});

export default BeatListItem;
