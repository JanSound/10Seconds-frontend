import React from 'react';
import { View, Text, Button } from 'react-native';
import Footer from '../Footer';
import Header from '../Header';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Button
        title="select page 열기"
        onPress={() => navigation.navigate('Select')}
      ></Button>
      <Footer />
    </View>
  );
};

export default HomeScreen;
