import { StyleSheet, Text, View, SafeAreaView,TextInput, KeyboardAvoidingView, Pressable, Alert, Button} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth, db } from '../config/firebase'
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
const handleSubmit = async () => {
  if(email === "" || password === "" || phone === ""){
    Alert.alert(
      "Invalid Details",
      "Please fill all the details",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }
  // if(password.length < 6){
  //   Alert.alert(
  //     "Invalid Details",
  //     "Password must be atleast 6 characters",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   )
  // }
  if (email && password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user.uid);
      const userUid = auth.currentUser.uid;
      

      // Store user data in Firestore
      try {
        await setDoc(doc(db, "users", `${userUid}`), {
          email: email,
          phone: phone
        });
        console.log("User data stored in Firestore");
      } catch (error) {
        console.error("Error storing user data in Firestore:", error.message);
      }

    } catch (error) {
      console.log('Error signing up:', error.message);
      Alert.alert('Error', 'Password must be atleast 6 characters');
    }
  }
}

const getData = async() => {
  const key = await AsyncStorage.getAllKeys();
  const result = await AsyncStorage.multiGet(key);
  result.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Register</Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Create a new Account</Text>
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="black"
                style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: "gray", marginLeft: 13, width: 300, marginVertical: 20 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="phone" size={24} color="black" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone No"
                placeholderTextColor="black"
                style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: "gray", marginLeft: 13, width: 300, marginVertical: 10 }}
              />
            </View>
            <Pressable onPress={handleSubmit} style={{ width: 200, backgroundColor: "#20B2AA", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: "auto" }}>
              <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Register</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 17, color: "gray", fontWeight: "500" }}>Already have a account? Sign in</Text>
            </Pressable>
          </View>
          {/* <Button onPress={getData} title='AsyncStorage'/> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});











  // const handleSubmit = async () => {
  //   if(email && password) {
  //     try {
  //       const userCredentials = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  //         console.log("user credential",userCredential);
  //         // const user = userCredential._tokenResponse.email;
  //         const myUserUid = auth.currentUser.uid;
  //         console.log("myUserid: ",myUserUid)
  
  //         try {
  //           setDoc(doc(db,"users",`${myUserUid}`),{
  //             email:email,
  //             phone:phone
  //           })
  //           console.log("User stored in firestore")
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       })

  //       await AsyncStorage.setItem('user', JSON.stringify({
  //         uid: user.uid,
  //         email: email,
  //         phone: phone
  //       }));
  
  //       console.log("User data stored in AsyncStorage");
  //       // console.log('User created successfully', userCredentials);
  //       // const myUserUid = auth.

  //       // await firestore().collection('users').doc(userCredentials.user.uid).set({
  //       //   email,
  //       //   phone,
  //       // });
  //       // try {
  //       //   const user = await addDoc(collection(db, 'users'), {
  //       //     email: email,
  //       //     phone: phone,
  //       //   });
  //       // } catch (error) {
  //       //   console.log(error);
  //       // }
  //     } catch (err) {
  //       console.log('got error', err.message);
  //     }
  //   }