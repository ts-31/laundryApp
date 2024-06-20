import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Pressable, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../../config/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../../redux/action'
import LottieView from "lottie-react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const deliveryTime = [
  {
    id: "0",
    name: "2-3 Days",
  },
  {
    id: "1",
    name: "3-4 Days",
  },
  {
    id: "2",
    name: "4-5 Days",
  },
  {
    id: "3",
    name: "5-6 Days",
  },
  // {
  //   id: "4",
  //   name: "Tommorrow",
  // },
];

const times = [
  {
    id: "0",
    time: "11:00 AM",
  },
  {
    id: "1",
    time: "12:00 PM",
  },
  {
    id: "2",
    time: "1:00 PM",
  },
  {
    id: "3",
    time: "2:00 PM",
  },
  {
    id: "4",
    time: "3:00 PM",
  },
  {
    id: "5",
    time: "4:00 PM",
  },
];

const CustomModal = ({ modalVisible, toggleModal, totolPrice, cartItemsQauntity }) => {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderPlaced) {
      // After 2 seconds, clear the Redux store
      const timeout = setTimeout(() => {
        dispatch(resetCart());
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [orderPlaced, dispatch]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  }
  const cartData = useSelector((state) => state.reducer);
  const placeOrder = async() => {
    try {
      const userUid = auth.currentUser.uid;
      const cartDataWithoutFirstItem = cartData.slice(1);
      const service = cartData[0];
      await setDoc(
        doc(db, "users", `${userUid}`),
        {
          order: { 
            service: service,
            types: {...cartDataWithoutFirstItem} ,
            pickUpDetails: {
              address: address,
              pickUpDate: date.toString(),
              deliveryDate: delivery.toString(),
              selectedTime: selectedTime,
            },
            totalPrice: totolPrice,
            totalItems: cartItemsQauntity,
          },
        },
        // {
        //   merge: true
        // }
      ); 
      console.log("Order placed Successfully");
      setOrderPlaced(true)
      // dispatch(resetCart());
    } catch (error) {
      console.error("Error placing order:", error);  
    }
  }
  if(orderPlaced) {
    return (
      <SafeAreaView style={{height: '100%', width: '100%', backgroundColor: '#F0FFFF'}}>
      <LottieView
        source={require("../../../assets/thumbs.json")}
        style={{
          height: 360,
          width:300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <LottieView
        source={require("../../../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
    )
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.shadow]}>
            {/* Address */}
            <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 50}}>
              <TextInput placeholder='Enter address' value={address} onChangeText={(text) => setAddress(text)}/>
            </View>
            {/* pick up date */}
            <View style={{ padding: 5, marginTop: 10}}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{height: 'auto', width: 100, backgroundColor: '#20B2AA', borderRadius: 5, padding: 5, marginLeft: 10}}>
                <Text style={{color:'white', fontWeight: 'bold'}}>Pick Up Date</Text>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date" 
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={onChange}
                  />
                )}
              </TouchableOpacity>
              <View style={{backgroundColor: 'white', padding: 10}}>
                <Text style={{color: 'gray'}}>{date.toString()}</Text>
              </View>
            </View>  
              {/* Delivery days */}
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                Delivery Days After pickup
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {deliveryTime.map((item, i) => (
                  <Pressable
                    style={
                      delivery.includes(item.name)
                        ? {
                            margin: 10,
                            borderRadius: 7,
                            padding: 15,
                            borderColor: "#20B2AA",
                            borderWidth: 2,
                          }
                        : {
                            margin: 10,
                            borderRadius: 7,
                            padding: 15,
                            borderColor: "gray",
                            borderWidth: 0.7,
                          }
                    }
                    onPress={() => setDelivery(item.name)}
                    key={i}
                  >
                    <Text>{item.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
              {/* Times */}
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                Select Time
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedTime(item.time)}
                    style={
                      selectedTime.includes(item.time)
                        ? {
                            margin: 10,
                            borderRadius: 7,
                            padding: 15,
                            borderColor: "#20B2AA",
                            borderWidth: 2,
                          }
                        : {
                            margin: 10,
                            borderRadius: 7,
                            padding: 15,
                            borderColor: "gray",
                            borderWidth: 0.7,
                          }
                    }
                  >
                <Text>{item.time}</Text>
                </Pressable>
                ))}
              </ScrollView>
            </View>
              {/* Billing details */}
            <View >
              <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                Billing Details
              </Text>
              <View style={{ marginTop: 10,borderWidth: 1, borderColor: 'gray', borderRadius: 7, }}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 15, marginVertical:5}}>
                  <Text>Total Items: </Text>
                  <Text>{cartItemsQauntity}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 15, marginVertical:5}}>
                  <Text>Delivery Fee: </Text>
                  <Text style={{color:'#20B2AA'}}>Free</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 15, marginVertical:5}}>
                  <Text>Total Price: </Text>
                  <Text>₹{totolPrice}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 15, marginVertical:5}}>
                  <Text style={{fontWeight: 'bold'}}>To Pay Fee: </Text>
                  <Text style={{fontWeight: 'bold'}}>₹{totolPrice}</Text>
                </View>
              </View>
            </View>
              {/* bottom buttons */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={placeOrder} style={styles.closeButton1}>
              <Text style={styles.closeButtonText1}>Place Order</Text>
            </TouchableOpacity>
          </View>
          <View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#E4DCDC',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '90%', 
    width: '90%',
    flexDirection: 'column',

  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },

  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  closeButtonText: {
    color: '#20B2AA',
    fontWeight: 'bold',
  },
  closeButton1: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  closeButtonText1: {
    color: '#20B2AA',
    fontWeight: 'bold',
  },
});

export default CustomModal;
