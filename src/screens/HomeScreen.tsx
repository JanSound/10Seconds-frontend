import React, { useState } from 'react';
import Home from '../components/Home';

const HomeScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((visible) => !visible);
  };
  return (
    <>
      <Home
        navigation={navigation}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default HomeScreen;
