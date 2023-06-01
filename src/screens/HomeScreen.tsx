import React from 'react';
import Home from '../components/Home';

const HomeScreen = ({ navigation, route }: any) => {
  return (
    <>
      <Home navigation={navigation} route={route} />
    </>
  );
};

export default HomeScreen;
