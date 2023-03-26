import React from 'react';
import { View } from 'react-native';
import Home from './Home';
import SelectInstrument from './SelectInstrument';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SelectScreen from './screens/SelectScreen';

const Stack = createStackNavigator();
const App = () => {
  // return <Home />;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <SelectInstrument /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
