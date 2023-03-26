import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import EditHeader from '../common/header/EditHeader';
import Footer from '../Footer';

const BeatListScreen = ({ navigation }: any) => {
  const [beats, setBeats] = useState([
    { name: 'beat 1' },
    { name: 'beat 2' },
    { name: 'beat 3' },
    { name: 'beat 4' },
    { name: 'beat 5' },
    { name: 'beat 6' },
    { name: 'beat 7' },
    { name: 'beat 8' },
    { name: 'beat 9' },
    { name: 'beat 0' },
    { name: 'beat 1' },
    { name: 'beat 3' },
    { name: 'beat 4' },
    { name: 'beat 5' },
    { name: 'beat 6' },
    { name: 'beat 2' },
    { name: 'beat 3' },
  ]);
  return (
    <>
      <EditHeader navigation={navigation} />
      <View style={styles.beatListContainer}>
        <ScrollView contentContainerStyle={styles.beatList}>
          {beats.map((beat: { name: string }) => (
            <View style={styles.beat}>
              <Text style={styles.beatContent}>{beat.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  beatListContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  beatList: {
    alignItems: 'center',
  },
  beat: {
    width: 300,
    height: 50,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    justifyContent: 'center',
  },
  beatContent: {
    fontSize: 20,
  },
});

export default BeatListScreen;
