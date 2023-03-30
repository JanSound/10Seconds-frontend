import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TitleHeader = (props: any) => {
  const { navigation } = props;
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <View></View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.title}>10Seconds</Text>
        </TouchableOpacity>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TitleHeader;
