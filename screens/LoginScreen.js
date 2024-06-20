import { Button, StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebase'
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const getData = async() => {
    const key = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(key);
    result.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }
  
  const handleSubmit = async () => {
    if(email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Signin Successfully');
      } catch (err) {
        console.log('got error', err.message);
        Alert.alert(
          'Authentication Failed',
          'Invalid email or password. Please try again.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
    } else {
      Alert.alert(
        'Missing Information',
        'Please enter both email and password.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Sign In to your account</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: "gray", marginLeft: 13, width: 300, marginVertical: 10 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="black"
                style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: "gray", marginLeft: 13, width: 300, marginVertical: 10 }}
              />
            </View>
            <Pressable
              onPress={handleSubmit}
              style={{ width: 200, backgroundColor: "#20B2AA", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: "auto" }}
            >
              <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Signup')}  style={{ marginTop: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 17, color: "gray", fontWeight: "500" }}>Don't have a account? Sign Up</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        {/* <Button onPress={getData} title='AsyncStorage'/> */}
      </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});