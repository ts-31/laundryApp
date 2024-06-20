import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, query, where, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const Account = () => {

  const navigation = useNavigation();

  const [orderDetails, setOrderDetails] = useState(null);

  // useEffect(() => {
  //   const fetchOrderDetails = async () => {
  //     try {
  //       const userUid = auth.currentUser.uid;
  //       const docRef = doc(db, 'users', userUid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const orderData = docSnap.data().order;
  //         setOrderDetails(orderData)
  //         console.log("orderData: ", orderData);
  //         console.log("Order Details: ",orderDetails);
  //       } else {
  //         console.log('No order details found for current user');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching order details:', error);
  //     }
  //   };

  //   fetchOrderDetails();
  // }, []);

  // useEffect(() => {
  //   console.log("Order Details: ", orderDetails);
  // }, [orderDetails]);
  useEffect(() => {
    const userUid = auth.currentUser.uid;
    const docRef = doc(db, 'users', userUid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const orderData = docSnap.data().order;
        setOrderDetails(orderData);
        console.log("Order Data Updated:", orderData);
      } else {
        console.log('No order details found for current user');
      }
    });

    return () => unsubscribe();
  }, []);



  const getData = async() => {
    const key = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(key);
    result.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }

  const handleLogout = async() => {
    try {
      await signOut(auth);
      console.log("Logout Scuucessfully");
      navigation.navigate("Signup");
    } catch (error) {
      console.error("Logout Falied", error.message);
    }
  }

  const reduxData = useSelector((state) => state.reducer);

  const handleDisplayData = () => {
    console.log('Redux Store Data:', reduxData);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    <View style={{alignItems:'center'}}>
      <Text style={{fontWeight:'bold'}}>Your Orders</Text>
    </View>
    <View style={{padding:10, margin: 5, borderWidth: 1, borderRadius: 7}}>
      {orderDetails && orderDetails.types && Object.values(orderDetails.types).map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent:'space-between'}}>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
          <Text>{item.name}</Text>
          <Text style={{ marginLeft: 10 }}>Quantity: {item.quantity}</Text>
          <Text style={{ marginLeft: 10 }}>Price: ₹{item.price}</Text>
        </View>
      ))}
      {orderDetails && orderDetails.pickUpDetails && (
        <View style={{flexDirection: 'column', marginVertical: 5}}>
          <Text>Pickup Address: {orderDetails.pickUpDetails.address}</Text>
          <Text>Pickup Date: {orderDetails.pickUpDetails.pickUpDate}</Text>
        </View>
      )}
      {orderDetails && (
        <View style={{}}>
          <Text>Total Items: {orderDetails.totalItems}</Text>
          <Text>Total Price: ₹{orderDetails.totalPrice}</Text>
          <Text style={{fontWeight: 'bold'}}>Service Type: {orderDetails.service.name}</Text>
        </View>
      )}
    </View>


    <View>
      <Button title="Display Redux Data" onPress={handleDisplayData} /> 
      <Button onPress={getData} title='AsyncStorage'/>
    </View>
    </>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  logoutButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
});
