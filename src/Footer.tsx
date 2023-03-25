import React from 'react';
import { View, Button, StyleSheet, Linking } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerNavigation}>
      <Button title="tab1"></Button>
      <Button title="tab2"></Button>
      <Button title="tab3"></Button>
      <Button title="설정" onPress={() => Linking.openSettings()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  footerNavigation: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default Footer;
