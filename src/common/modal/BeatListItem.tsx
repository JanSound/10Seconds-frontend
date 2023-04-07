import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BeatPlaySmallBtn from '../button/BeatPlaySmallBtn';
import BeatListCheckBox from '../checkbox/BeatListCheckBox';
import BeatListItemText from './BeatListItemText';

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
      {isEditing ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <BeatListCheckBox beat={beat} handleIsChecked={handleIsChecked} />
            <BeatListItemText beat={beat} />
          </View>
          <BeatPlaySmallBtn beat={beat} handleBeatClick={handleBeatClick} />
        </>
      ) : (
        <BeatListItemText beat={beat} />
      )}
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
