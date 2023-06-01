import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ClapAnimation = ({ bpm }: any) => {
  return (
    <Animatable.View
      animation="fadeOut"
      iterationCount={Infinity}
      duration={(60 / bpm) * 1000}
      iterationDelay={200}
      style={styles.viewContainer}
    >
      <Animatable.Image
        style={styles.imageContainer}
        source={require('../assets/images/clap.png')}
      />
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
});
export default ClapAnimation;
