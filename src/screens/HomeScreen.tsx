import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../common/header/Header';
import Home from '../Home';

const HomeScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((visible) => !visible);
  };
  return (
    <>
      <Header navigation={navigation} toggleModal={toggleModal} />
      <Home
        navigation={navigation}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Footer navigation={navigation} />
    </>
  );
};

export default HomeScreen;
