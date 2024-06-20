import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Carousel = () => {
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPAmpsMttKDWOIv80-rJvS-Nj_HWqPpKP9sm7doO2djNNEU6JjCR6csjvw4rvYlNhbas&usqp=CAUs",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFvpULSXlMJB5AnSGN_5-pZSrQAlYpphqM31R4IWt5IQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMFJ1ZilpUJ_Chgma8GhuOH-tZ2Ir-it37JTDlVaZ7Q&s",
    ]
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})