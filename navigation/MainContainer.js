import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import FindTaste from '../screens/FindTaste';
import Settings from '../screens/Settings';
import WishList from '../screens/WishList';

const homeName = 'Home';
const findTaste = 'Find Your Taste';
const settings = 'Settings';
const wishList = 'ChatBot';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = {homeName}
                screenOptions = {({route}) => ({
                    tabBarIcon: ({ focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName){
                            iconName = focused ? 'home': 'home-outline';
                        } else if (rn === findTaste){
                            iconName = focused ? 'fast-food': 'fast-food-outline';
                        } else if (rn === settings){
                            iconName = focused ? 'settings': 'settings-outline';
                        } else if (rn === wishList){
                            iconName = focused ? 'chatbubble': 'chatbubble-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>

                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 5, fontSize: 10},
                    style: {padding: 10, height: 70}
                }}
                
                >

                    <Tab.Screen name = {homeName} component={Home}/>
                    <Tab.Screen name = {findTaste} component={FindTaste}/>
                    <Tab.Screen name = {wishList} component={WishList}/>
                    <Tab.Screen name = {settings} component={Settings}/>

            </Tab.Navigator>

        </NavigationContainer>
    );
}
