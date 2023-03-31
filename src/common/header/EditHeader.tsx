import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EditBtn from '../button/EditBtn';

const EditHeader = (props: any) => {
  const { navigation, handleIsEditing } = props;
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: 'black' }}></SafeAreaView>
      <View style={styles.tabBar}>
        <EditBtn handleIsEditing={handleIsEditing} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.title}>10Seconds</Text>
        </TouchableOpacity>
        <View style={styles.whiteSpace}></View>
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
  whiteSpace: {
    width: 50,
    height: 50,
  },
});

export default EditHeader;
