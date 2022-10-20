import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LogIn from '../screens/LogIn'
import Authenticated from '../screens/Authenticated';
import Authentication from '../screens/Authentication';
import Feather from 'react-native-vector-icons/Feather';
const AppNavigation = () => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const [authenticated, setAuthenticated] = useState(false);
    auth().onAuthStateChanged((user) => {
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    });

    const BottomTabStack = () => {
        return (
          <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              style: {
                backgroundColor: '#e0e0e0',
              },
              labelStyle: {
                textAlign: 'center',
                fontSize: 12,
              },
            }}>
            <Tab.Screen
              name="Authenticated" component={Authenticated}
              options={{
                headerShown: false,
                  tabBarLabel: 'Profile',
                  tabBarLabelStyle: {color:'black'},
                    tabBarIcon: ({ color }) => {
                        return (
                            <View style={{ width: 20, height: 20 }}>
                                <Feather name="user" size={20} color={color} />
                            </View>
                    );
                },
              }}
            />
            <Tab.Screen
              name="Authentication" 
              component={Authentication}
              options={{
                headerShown: false,
                  tabBarLabel: 'Products',
                  tabBarLabelStyle: {color:'black'},
                  tabBarIcon: ({ color }) => {
                    return (
                        <View style={{ width: 20, height: 20 }}>
                            <Feather name="sliders" size={20} color={color} />
                        </View>
                );
            },
              }}
            />
            </Tab.Navigator>
            )}

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!authenticated ?
                <Stack.Screen name="Login" component={LogIn}
                    options={{
                        headerShown: false,
                    }} /> :
                    <Stack.Screen name="Tabnavigator" component={BottomTabStack}
                    options={{
                        headerShown: false,
                    }} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;