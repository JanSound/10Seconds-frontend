import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const BeatListCheckBox = (props: any) => {
  const { beat, handleIsChecked } = props;
  return (
    <>
      <BouncyCheckbox
        size={25}
        fillColor="#4FACF9"
        unfillColor="white"
        isChecked={beat.checked}
        disableBuiltInState
        onPress={() => handleIsChecked(beat.id)}
      />
    </>
  );
};
export default BeatListCheckBox;
