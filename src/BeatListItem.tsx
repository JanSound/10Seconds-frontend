import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SelectPlayBtn from './common/button/SelectPlayBtn';
import BeatListCheckBox from './common/checkbox/BeatListCheckBox';

interface IInstrument {
  [key: string]: ImageSourcePropType;
}
const instrument: IInstrument = {
  base: require('./assets/images/base.png'),
  piano: require('./assets/images/piano.png'),
  drum: require('./assets/images/drum.png'),
};

const BeatListItem = (props: any) => {
  const { handleIsChecked, navigation, beat, isEditing } = props;

  return (
    <View style={styles.beat}>
      {isEditing ? (
        <BeatListCheckBox beat={beat} handleIsChecked={handleIsChecked} />
      ) : (
        <View />
      )}
      <SelectPlayBtn
        beatId={beat.id}
        instType={beat.instType}
        navigation={navigation}
      />
      <Text style={styles.beatContent}>{beat.name}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={instrument[beat.instType]}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  beat: {
    width: 300,
    height: 70,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',
  },
  beatContent: {
    fontSize: 20,
  },
});

export default BeatListItem;
