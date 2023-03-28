import React from 'react';
import { View, Button, StyleSheet, Linking } from 'react-native';

const Footer = ({ navigation }: any) => {
  return (
    <View style={styles.footerNavigation}>
      <Button
        title="Record"
        onPress={() => navigation.navigate('Home')}
      ></Button>
      <Button title="Home"></Button>
      <Button title="설정" onPress={() => Linking.openSettings()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  footerNavigation: {
    flex: 0.1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default Footer;
