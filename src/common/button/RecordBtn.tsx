import React from 'react';
import { Button, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordBtn = (props: any) => {
  const { handleStartRecord } = props;

  return (
    <View>
      <Button
        title="Start Recording"
        color="black"
        onPress={handleStartRecord}
      ></Button>
    </View>
  );
};

export default RecordBtn;