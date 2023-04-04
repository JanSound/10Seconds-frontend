import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BeatListCheckBox from '../checkbox/BeatListCheckBox';

const defaultColor = 'black';
const clickedColor = '#4FACF9';

const BeatListItem = (props: any) => {
  const { isEditing, beat, handleIsChecked, handleBeatClick } = props;

  return (
    <TouchableOpacity
      style={styles.beatContainer}
      onPress={
        isEditing
          ? () => handleIsChecked(beat.id)
          : () => handleBeatClick(beat.id)
      }
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
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  beatName: { fontSize: 20, fontFamily: 'NotoSansKR-Bold' },
  beatInstType: {
    fontSize: 15,
  },
});

export default BeatListItem;
