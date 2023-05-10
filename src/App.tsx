import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SelectScreen from './screens/SelectScreen';
import PlayerScreen from './screens/PlayerScreen';
import MergeScreen from './screens/MergeScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Merge" component={MergeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
