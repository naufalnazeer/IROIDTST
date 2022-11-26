import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import LogIn from '../screens/LogIn'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Feather from 'react-native-vector-icons/Feather';
import DetailsScreen from '../screens/DetailsScreen';
import Favorite from '../screens/Favorite';
import AddToCart from '../screens/AddToCart'

const AppNavigation = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const BottomTabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#e0e0e0',
          },
          tabBarStyle: {
            marginBottom: 10,
            marginHorizontal: 25,
            borderRadius: 10
          },
          labelStyle: {
            textAlign: 'center',
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name="Home" component={Home}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: { color: 'black' },
            tabBarIcon: ({ color }) => {
              return (
                <View style={{ width: 20, height: 20 }}>
                  <Feather name="home" size={20} color={color} />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarLabelStyle: { color: 'black' },
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
          name="screen2" component={Home}
          options={{
            headerShown: false,
            tabBarLabel: 'Cart',
            tabBarLabelStyle: { color: 'black' },
            tabBarIcon: ({ color }) => {
              return (
                <View style={{ width: 20, height: 20 }}>
                  <Feather name="shopping-cart" size={20} color={color} />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="screen3" component={Home}
          options={{
            headerShown: false,
            tabBarLabel: 'Download',
            tabBarLabelStyle: { color: 'black' },
            tabBarIcon: ({ color }) => {
              return (
                <View style={{ width: 20, height: 20 }}>
                  <Feather name="download" size={20} color={color} />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    )
  }

  const DrawerNavigation = () => {
    return (
      <Drawer.Navigator initialRouteName="Tabnavigator" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => auth().signOut()} />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="BottomTabStack" component={BottomTabStack} options={{
          headerShown: false,
          drawerLabel: 'Home'
        }} />
        <Drawer.Screen name="Favorite" component={Favorite} options={{
          headerShown: false,
        }} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={LogIn}
            options={{
              headerShown: false,
            }} /> 
            <Stack.Screen name="DrawerNav" component={DrawerNavigation}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen}
              options={{
                headerShown: false,
              }} />
              <Stack.Screen name="AddToCart" component={AddToCart}
              options={{
                headerShown: false,
              }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation;