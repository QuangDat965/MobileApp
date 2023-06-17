import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterComponent from "./src/common/Register/RegisterComponent";
import LoginPageComponent from "./src/common/LoginPageComponent";
import ViewSmallholdingComponent from "./src/Zone/ViewSmallHoldingComponent";
import ViewFarmComponent from "./src/Farm/ViewFarmComponent";
import HomeComponent from "./src/User/HomeComponent/HomeComponent";
import DataDetailsComponent from "./src/common/DataDetailsComponent";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={RegisterComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeComponent"
          component={HomeComponent}
          options={{ headerShown: false }}
        /><Stack.Screen
        name="DataDetailsComponent"
        component={DataDetailsComponent}
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
          name="ViewSmallholdingComponent"
          component={ViewSmallholdingComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
