import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const BeatListCheckBox = (props: any) => {
  const { beat, handleIsChecked } = props;
  return (
    <>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: 'red' }}
        isChecked={beat.checked}
        disableBuiltInState
        onPress={() => handleIsChecked(beat.id)}
      />
    </>
  );
};
export default BeatListCheckBox;
