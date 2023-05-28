import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const CountDown = (props: any) => {
  const { setRecordCountDown, handleStartRecord } = props;
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      setRecordCountDown(false);
      clearInterval(interval);
      handleStartRecord();
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <Animatable.Text
        animation="bounceOut"
        iterationCount={3}
        duration={1000}
        style={styles.conuntNumber}
      >
        {count}
      </Animatable.Text>
    </>
  );
};

const styles = StyleSheet.create({
  conuntNumber: {
    fontSize: 85,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default CountDown;
