import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignupScreen'
import useAuth from '../hooks/useAuth'
import Account from '../screens/innerScreens/Account'
import Bucket from '../screens/innerScreens/orderScreens/Bucket'
import Home from '../screens/innerScreens/Home'
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Bucket') {
            iconName = 'bucket';
          } 
          else if (route.name === 'Account') {
            iconName = 'user';
          }

          return <Entypo name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#20B2AA', // Move this to screenOptions
        tabBarInactiveTintColor: 'gray', // Move this to screenOptions
        tabBarStyle: { display: 'flex',marginTop: 10 }, // Move this to screenOptions
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Bucket" component={Bucket} options={{ tabBarLabel: 'Bucket' }} />
      <Tab.Screen name="Account" component={Account} options={{ tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
};


export default function AppNavigation() {
  const { user } = useAuth();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}}/>
        ) : (
          <>
          <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})