import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRecipeScreen from '../screens/HomeRecipeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipesDetailScreen from '../screens/RecipesDetailScreen';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeRecipeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipesDetailScreen} />
      </Stack.Navigator>
  );
}

export default AppNavigation;