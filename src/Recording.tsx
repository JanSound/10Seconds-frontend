import React from 'react';
import { Button, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Recording = (props: any) => {
  const { recording, handleStartRecord, handleStopRecord } = props;

  return (
    <View>
      {recording ? (
        <Button title="Stop" color="black" onPress={handleStopRecord}></Button>
      ) : (
        <Button
          title="Start Recording"
          color="black"
          onPress={handleStartRecord}
        ></Button>
      )}
    </View>
  );
};

export default Recording;
