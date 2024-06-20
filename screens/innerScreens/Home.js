import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Image } from "react-native";
import { useEffect, useState} from "react";
import Carousel from "../components/Carousel";
import ClothsType from "../components/ClothsType";
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import { setSelectedService } from "../../redux/action";

const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
    name: "Washing",
  },
  {
    id: "1",
    image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
    name: "Wash & Iron",
   
  },
  {
    id: "3",
    image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
    name: "Dry Cleaning",
  },
];

const dressItems = [
  {
    id: "10",
    image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
    name: "shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
    name: "T-shirt",
    quantity: 0,
    price: 7,
  }, 
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
    name: "dresses",
    quantity: 0,
    price: 12,
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
    name: "jeans",
    quantity: 0,
    price: 11,
  },
  {
    id: "14",
    image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
    name: "Sweater",
    quantity: 0,
    price: 15,
  },
  {
    id: "15",
    image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
    name: "shorts",
    quantity: 0,
    price: 6,
  },
];

const Home = () => {
  const cartData = useSelector((state) => state.reducer);
  const [total, setTotal] = useState(0);
  const [selectedService, setSelectedServiceLocal] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredCartData = cartData.filter(item => item.quantity !== undefined && item.price !== undefined);
    const newTotal = filteredCartData.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
    console.log("newTotal: ", newTotal)
    setTotal(newTotal);
  }, [cartData]);
  
  const passSelectedServiceToReduxStore = (service) => {
      console.log(service)
      setSelectedServiceLocal(service)
      dispatch(setSelectedService(service));
  }

  return (
    <>
      <ScrollView>
        {/* Hello User */}
        <View style={{marginTop:30}}>
          <Text
            style={{margin: 10, color: "gray", fontWeight: "bold" ,fontSize: 18}}>
            Hello User 🖐
          </Text>
        </View>
        {/* Search bar */}
        <View
          style={{padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#20B2AA", borderRadius: 7,}}>
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="#20B2AA" />
        </View>
        {/* Carousel */}
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', margin: 10}}>
          <Carousel />
        </View>
        {/* Services */}
        <View style={{padding:10, flex:1, alignItems:'center'}}>
          <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Select Serive</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service,index) => (
                <Pressable 
                // style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7}}
                style={[
                  styles.serviceItem,
                  selectedService && selectedService.id === service.id && styles.selectedServiceItem // Apply selected style
                ]}                
                onPress={() => {
                  passSelectedServiceToReduxStore(service);
                }}
                key={index}
                >
                    <Image source={{uri:service.image}} style={{width:80,height:70}}/>
                    <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* Select Cloths */} 
        <View>
          <ScrollView>
            {
              dressItems.map((dressItem, index) => (
                <View key={index}>
                  <ClothsType dressItem={dressItem}/>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </ScrollView>
        {total == 0 ? (
          null
        ) : (
          <Pressable
          style={{
            backgroundColor: "#20B2AA",
            padding: 10,
            marginBottom: 10,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between",
          }}
        >
          <View>
            <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cartData.length-1} items |  ₹ {total}</Text>
            <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Bucket")}>
            <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Go to bucket</Text>
          </Pressable>
        </Pressable>
        )
        }
    </>
  );
};
export default Home;
const styles = StyleSheet.create({
  serviceItem: {
    margin: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
  },
  selectedServiceItem: {
    borderWidth: 2,
    borderColor: "#20B2AA"
  }
});




// const cartData = useSelector((state) => state.reducer);
// const [totalQuantity, setTotalQuantity] = useState(0);
// useEffect(() => {
//   // Filter out items with a quantity of 0
//   const filteredCartData = cartData.filter(item => item.quantity > 0);
//   console.log("filteredCartData: ", filteredCartData)
//   // Calculate the total quantity from filteredCartData
//   const newTotalQuantity = filteredCartData.reduce((total, item) => total + item.quantity, 0);
//   console.log("newTotalQuantity: ", newTotalQuantity)
//   // Update the state with the new total quantity
//   setTotalQuantity(newTotalQuantity);
// }, [cartData]);



// {/* <View>
// <Services/>
// </View> */}


 // selectedService.includes(service.name)
                  // ? {
                    // margin:10,backgroundColor:"white",padding:20,borderRadius:7, borderWidth: 2, borderColor:"#20B2AA"
                  // } : {
                  // margin:10,backgroundColor:"white",padding:20,borderRadius:7
                  // }
