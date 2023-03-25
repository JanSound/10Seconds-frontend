import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Footer from './Footer';
import Header from './Header';

const SelectInstrument = () => {
  return (
    <View style={styles.instrumentContainer}>
      <Header />
      <TouchableOpacity style={styles.baseContainer}>
        <Image
          style={styles.base}
          source={require('./assets/images/base.png')}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>base</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pianoContainer}>
        <Image
          style={styles.piano}
          source={require('./assets/images/piano.png')}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>piano</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drumContainer}>
        <Image
          style={styles.drum}
          source={require('./assets/images/drum.png')}
        />

        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>drum</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  instrumentContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  base: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  pianoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piano: {
    width: 150,
    height: 150,
  },
  drumContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drum: {
    width: 150,
    height: 150,
  },
});

export default SelectInstrument;
