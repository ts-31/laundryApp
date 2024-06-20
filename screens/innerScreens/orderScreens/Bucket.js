// import { Button, FlatList, StyleSheet, Text, View, Pressable, Image, Modal, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const Bucket = () => {
//   const cartData = useSelector((state) => state.reducer);
//   const [cartItemsQauntity, setCartItemsQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);  

//   useEffect(() => {
//     // Filter out items with a quantity of 0
//     // const filteredCartData = cartData.filter(item => item.quantity > 0);
//     // console.log("filteredCartData: ", filteredCartData);
//     // Calculate the total quantity from filteredCartData
//     // const totalQuantity = filteredCartData.reduce((total, item) => total + item.quantity, 0);
//     const newTotalPrice = cartData.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
//     console.log("newTotalPrice: ", newTotalPrice)
//     setTotalPrice(newTotalPrice);
//     let totalQuantity = 0;
//     for(let i=0;i<cartData.length;i++) {
//       totalQuantity += cartData[i].quantity;
//     }
//     console.log("totalQuantity: ", totalQuantity);
//     setCartItemsQuantity(totalQuantity);
//   }, [cartData]);

//   const [modalVisible, setModalVisible] = useState(false);
//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   return (
//     <SafeAreaView>
//       <View style={{ alignItems: 'center', margin: 10}}>
//         <Text style={{ alignItems:'center', color: '#20B2AA', fontSize:20, fontWeight: 'bold'}}>Your Bucket</Text>
//       </View>
//       <FlatList
//         data={cartData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           // Check if the quantity is greater than 0 before displaying the item
//           item.quantity > 0 && (
//           <Pressable style={{ flexDirection: 'row', backgroundColor: 'white', margin: 10, borderRadius: 8, justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
//               <Text style={{ width: 83, fontSize: 17, marginBottom: 7, fontWeight: "500" }}>{item.name}</Text>
//               <Text style={{ fontWeight: "500"}}>{item.quantity}</Text>
//               <Text style={{ color: 'gray', fontSize: 15 }}>${item.price*item.quantity}</Text>
//           </Pressable>  
//           )
//         )}
//       />

//       {cartItemsQauntity === 0 ? (
//           null
//         ) : (
//         <>
//           <View style={{ flexDirection: 'row', backgroundColor: '#20B2AA', margin: 10, borderRadius: 8, justifyContent: 'space-between', padding: 20, alignItems: 'center'}}>
//             <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Total: ${totalPrice}</Text>
//             <Pressable onPress={toggleModal}>
//               <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Process to pickup</Text>
//             </Pressable>
//           </View> 
//           <View style={styles.container}>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={toggleModal}
//             >
//               <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                   <Text>This is my sub component!</Text>
//                   <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
//                     <Text style={styles.closeButtonText}>Close</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </>
//         )
//       }
//     </SafeAreaView>
//   );
// }

// export default Bucket;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '90%', 
//     width: '90%',
//     flexDirection: 'column',
//   },
//   closeButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   closeButtonText: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
// });



// // const PickUpComponent = () => {
// //   return (
// //     <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
// //       <Text>Pick up</Text>
// //     </View>
// //   )
// // }





import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from './CustomModal'; // Import the CustomModal component

const Bucket = () => {
  const cartData = useSelector((state) => state.reducer);
  const [cartItemsQauntity, setCartItemsQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);  
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const filteredCartData = cartData.filter(item => item.quantity !== undefined && item.price !== undefined);
    const newTotalPrice = filteredCartData.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
    console.log("newTotalPrice: ", newTotalPrice)
    setTotalPrice(newTotalPrice);
    let totalQuantity = 0;
    for(let i=1;i<cartData.length;i++) {
      totalQuantity += cartData[i].quantity;
    }
    console.log("totalQuantity: ", totalQuantity);
    setCartItemsQuantity(totalQuantity);
  }, [cartData]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', margin: 10}}>
        <Text style={{ alignItems:'center', color: '#20B2AA', fontSize:20, fontWeight: 'bold'}}>Your Bucket</Text>
      </View>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // Check if the quantity is greater than 0 before displaying the item
          item.quantity > 0 && (
          <Pressable style={{ flexDirection: 'row', backgroundColor: 'white', margin: 10, borderRadius: 8, justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
              <Text style={{ width: 83, fontSize: 17, marginBottom: 7, fontWeight: "500" }}>{item.name}</Text>
              <Text style={{ fontWeight: "500"}}>{item.quantity}</Text>
              <Text style={{ color: 'gray', fontSize: 15 }}>₹{item.price*item.quantity}</Text>
          </Pressable>  
          )
        )}
      />

      {cartItemsQauntity !== 0 && (
        <>
          <View style={{ flexDirection: 'row', backgroundColor: '#20B2AA', margin: 10, borderRadius: 8, justifyContent: 'space-between', padding: 20, alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Total: ₹{totalPrice}</Text>
            <Pressable onPress={toggleModal}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Process to pickup</Text>
            </Pressable>
          </View> 
          <CustomModal cartItemsQauntity={cartItemsQauntity} totolPrice={totalPrice} modalVisible={modalVisible} toggleModal={toggleModal} /> 
        </>
      )}
    </SafeAreaView>
  );
}

export default Bucket;