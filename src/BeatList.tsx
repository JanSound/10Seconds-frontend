import React from 'react';
import BeatListItem from './BeatListItem';

interface IBeat {
  id: string;
  name: string;
  instType: string;
}

const BeatList = (props: any) => {
  const { beats, navigation, isEditing, handleIsChecked } = props;
  return (
    <>
      {beats.map((beat: IBeat, index: number) => (
        <BeatListItem
          beat={beat}
          key={index}
          navigation={navigation}
          handleIsChecked={handleIsChecked}
          isEditing={isEditing}
        />
      ))}
    </>
  );
};

export default BeatList;
