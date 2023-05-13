import React, { useState } from 'react';
import Home from '../components/Home';

const HomeScreen = ({ navigation, route }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible((visible) => !visible);
  };
  return (
    <>
      <Home
        navigation={navigation}
        route={route}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default HomeScreen;
