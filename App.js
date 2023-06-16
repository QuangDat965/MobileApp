import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterComponent from "./src/common/Register/RegisterComponent";
import LoginPageComponent from "./src/common/LoginPageComponent";
import DataDetailsComponent from "./src/common/DataDetailsComponent";
import ViewSmallholdingComponent from "./src/Zone/ViewSmallHoldingComponent";
import ViewFarmComponent from "./src/Farm/ViewFarmComponent";
import CreateFarmComponent from "./src/Farm/CreateFarmComponent";
import HomeComponent from "./src/User/HomeComponent/HomeComponent";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeComponent">
        <Stack.Screen
          name="Register"
          component={RegisterComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeComponent"
          component={HomeComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPageComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewFarmComponent"
          component={ViewFarmComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateFarmComponent"
          component={CreateFarmComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataDetailsComponent"
          component={DataDetailsComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewSmallholdingComponent"
          component={ViewSmallholdingComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
