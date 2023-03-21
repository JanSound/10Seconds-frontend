import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';

StatusBar.setBarStyle('light-content');

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const App = () => {
  const checkRecord = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      if (result === RESULTS.GRANTED) {
        console.log('성공');
      }
    } catch (e) {
      console.log(`에러 \n ${e}`);
    }
  };

  const handleRecord = () => {};

  useEffect(() => {
    checkRecord();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <Text style={styles.title}>10Seconds</Text>
      </View>
      <View style={styles.body}>
        <Button title="음성 녹음" color="black" onPress={handleRecord}></Button>
      </View>
      <View style={styles.footerNavigation}>
        <Button title="tab1"></Button>
        <Button title="tab2"></Button>
        <Button title="tab3"></Button>
        <Button title="tab4"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  header: {
    backgroundColor: 'white',
    height: 40,
  },
  tabBar: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 4,
    justifyContent: 'center',
  },
  footerNavigation: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
