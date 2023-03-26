import React from 'react';
import { View, Text, Button } from 'react-native';
import Footer from '../Footer';
import Header from '../common/header/Header';
import Home from '../Home';

const HomeScreen = ({ navigation }: any) => {
  return (
    <>
      <Header navigation={navigation} />
      <Home />
      <Footer navigation={navigation} />
    </>
  );
};

export default HomeScreen;
