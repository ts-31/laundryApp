import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/action';

  const ClothsType = (props) => {
    const dressItem = props.dressItem
    const [isAdded, setIsAdded] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.reducer); 

    const handleAddToCart = (item) => {
      dispatch(addToCart({ ...item }));
    }
    const handleRemoveFromCart = (item) => {
      dispatch(removeFromCart(item.name));
    }

    const handleIncreaseQuantity  = (item) => {
        dispatch(increaseQuantity(item));
    }

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item))
    }

    useEffect(() => {
      const addedItem = cartItems.find((item) => item.name === dressItem.name);
      setIsAdded(!!addedItem);
    }, [cartItems]);
    

    return (
        <Pressable style={{ flexDirection: 'row', backgroundColor: 'white', margin: 14, borderRadius: 8, justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 7 }}>
            <Image style={{ height: 70, width: 70 }} source={{ uri: dressItem.image }} />
          </View>
          <View>
            <Text style={{ width: 83, fontSize: 17, marginBottom: 7, fontWeight: "500" }}>{dressItem.name}</Text>
            <Text style={{ color: 'gray', fontSize: 15 }}>₹{dressItem.price}</Text>
          </View>
          {isAdded ? 
      (
        <View style={{ flexDirection:'column', alignItems:'center' }}>
          <View style={{ margin: 10 }}>
            {cartItems.find(item => item.name === dressItem.name)?.quantity > 0 && (
              <Text style={{ color: '#20B2AA', fontWeight: 'bold', fontSize: 20 }}>
                {cartItems.find(item => item.name === dressItem.name)?.quantity}
              </Text>
            )}
          </View>

          <View style={{ flexDirection: 'row' }}>
            {
              cartItems.find(item => item.name === dressItem.name)?.quantity === 0 ? 
              (
                <Pressable style={{ width: 80 }}>
                  <Text onPress={() => handleAddToCart(dressItem)} style={{ borderColor: "gray", borderRadius: 4, borderWidth: 0.8, marginVertical: 10, color: "#20B2AA", textAlign: "center", padding: 5, fontSize: 17, fontWeight: "bold" }}>
                    Add
                  </Text>
                </Pressable>
              ) 
              :
              (
                <>
                  <Pressable style={{ width: 40 }}>
                    <Text onPress={() => handleIncreaseQuantity(dressItem)} style={{ marginLeft:10,borderColor: "gray", borderRadius: 4, borderWidth: 0.8, color: "#20B2AA", textAlign: "center", fontSize: 17, fontWeight: "bold" }}>
                      +
                    </Text>
                  </Pressable>
                  <Pressable style={{ width: 40 }}>
                    <Text onPress={() => handleDecreaseQuantity(dressItem)} style={{ marginLeft:10,borderColor: "gray", borderRadius: 4, borderWidth: 0.8, color: "#20B2AA", textAlign: "center", fontSize: 17, fontWeight: "bold" }}>
                      -
                    </Text>
                  </Pressable>
                </>
              )
            }
          </View>
        </View>
      )
      :
      (
        <Pressable style={{ width: 80 }}>
          <Text onPress={() => handleAddToCart(dressItem)} style={{ borderColor: "gray", borderRadius: 4, borderWidth: 0.8, marginVertical: 10, color: "#20B2AA", textAlign: "center", padding: 5, fontSize: 17, fontWeight: "bold" }}>
            Add
          </Text>
        </Pressable>
      )
    }
  </Pressable>
    );

  };

  export default ClothsType
  
  const styles = StyleSheet.create({

  })
