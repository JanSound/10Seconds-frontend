import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../common/header/Header';
import Home from '../Home';

const HomeScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((visible) => !visible);
  };
  return (
    <>
      <Header navigation={navigation} toggleModal={toggleModal} />
      <Home navigation={navigation} isModalVisible={isModalVisible} />
      <Footer navigation={navigation} />
    </>
  );
};

export default HomeScreen;
