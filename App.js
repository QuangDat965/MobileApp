import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPageComponent from './src/common/LoginPageComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DataDetailsComponent from './src/common/DataDetailsComponent';
import ViewSmallholdingComponent from './src/common/ViewSmallHoldingComponent';
import ViewFarmComponent from './src/common/ViewFarmComponent';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="ViewFarmComponent" component={ViewFarmComponent} options={{ headerShown: false }}  />
          <Stack.Screen name="Login" component={LoginPageComponent} options={{ headerShown: false }}  />
          <Stack.Screen name="DataDetailsComponent" component={DataDetailsComponent} options={{ headerShown: false }}  />
          <Stack.Screen name="ViewSmallholdingComponent" component={ViewSmallholdingComponent} options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});