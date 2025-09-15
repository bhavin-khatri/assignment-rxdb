import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import {navigationConstants} from "../constants/navigationConstants";
import {navigationRef} from "./navigation";
import {getDbHelpers} from "../store/rxdb/index";
import BusinessList from "../screens/BusinessList";
import AddBusiness from "../screens/AddBusiness";
import ArticleList from "../screens/ArticleList";

const Stack = createNativeStackNavigator();

const MainRoot = () => {
    const [dbHelpers, setDbHelpers] = useState(null);

    useEffect(() => {
        getDbHelpers().then(setDbHelpers);
    }, []);

    if (!dbHelpers) return null;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen
          name={navigationConstants.SPLASH}
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationConstants.BUSINESS_LIST}
          component={BusinessList}
          initialParams={{ dbHelpers }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationConstants.ADD_BUSINESS}
          component={AddBusiness}
          initialParams={{ dbHelpers }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationConstants.ARTICLE_LIST}
          component={ArticleList}
          initialParams={{ dbHelpers }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoot;
