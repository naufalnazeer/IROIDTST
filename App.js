import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { JsonData } from './src/data/data'
import color from './src/assets/theme/color'
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  
  console.log(JsonData.imageUrl)
  console.log("===========================");
  const [label,setLabel] =useState('')
  const RenderJson = () => {
    return (
    <View style={{ flex: 1, width: "100%", flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between', }}>
      {JsonData.map((data, index) => {
        return (
          <View key={index} style={{width:'48%',marginVertical:16}}>
            <Image source={{ uri: data.imageUrl }} style={styles.image} />
            <Text style={styles.itemName}>{data.Ingredient}</Text>
            <Text>{data['Short text']}</Text>
          </View>
        )
      })}
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerLabel,{ marginLeft: 16,marginVertical:8}]}>Search</Text>
      <View style={styles.underline}></View>
      <View style={styles.searchBar}>
      <TouchableOpacity>
        <Ionicons name="search" size={24} color={color.primaryBlack} />
        </TouchableOpacity>
        <TextInput
          value={label}
          style={styles.searchField}
          placeholder="Food Name"
          onChangeText={text => setLabel(text)}
          placeholderTextColor={color.placeholderColor}
        />
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{paddingHorizontal:16,backgroundColor:"#bdbfc530"}}>
        <Text style={[styles.headerLabel,{marginTop:10}]}>Foods</Text>
        <RenderJson />
      </ScrollView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 25.6,
    color: color.labelColor,
    fontFamily: "Montserrat-Bold",
  },
  underline:{
    height:3,
    backgroundColor:color.primaryBlack,
    margin:4
  },
  searchField: {
    fontSize: 12.8,
    color: color.labelColor,
    fontFamily: "Montserrat-Regular",
    flex:1,
    marginLeft:16
  },
  itemName: {
    fontSize: 13.6,
    color: color.labelColor,
    fontFamily: "Montserrat-Regular",
    fontWeight: "700",
    marginVertical:4
  },
  itemShortText: {
    fontSize: 11.2,
    color: color.placeholderColor,
    fontFamily: "Montserrat-Regular",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius:4
  },
  searchBar: {
    marginVertical: 8,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#bdbfc530" ,
    borderRadius: 8,
    marginHorizontal: 16
  },
})