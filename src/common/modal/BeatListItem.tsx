import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BeatPlayBtn from '../button/BeatPlayBtn';
import BeatPlaySmallBtn from '../button/BeatPlaySmallBtn';
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
      <View style={{ flexDirection: 'row' }}>
        {isEditing ? (
          <BeatListCheckBox beat={beat} handleIsChecked={handleIsChecked} />
        ) : (
          <View />
        )}
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
      </View>
      <View>
        {isEditing ? (
          <BeatPlaySmallBtn beat={beat} handleBeatClick={handleBeatClick} />
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  beatContainer: {
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  beatName: { fontSize: 20, fontFamily: 'NotoSansKR-Bold' },
  beatInstType: {
    fontSize: 15,
  },
});

export default BeatListItem;
