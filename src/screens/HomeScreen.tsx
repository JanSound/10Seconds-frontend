import React from 'react';
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
