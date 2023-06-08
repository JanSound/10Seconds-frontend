import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import Home from '../components/Home';

const HomeScreen = ({ navigation, route }: any) => {
  const clearStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) await AsyncStorage.clear();
  };
  useEffect(() => {
    clearStorage();
  }, []);

  return (
    <>
      <Home navigation={navigation} route={route} />
    </>
  );
};

export default HomeScreen;
