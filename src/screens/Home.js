import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import color from '../assets/theme/color';
import axios from 'axios';

const { height, width } = Dimensions.get('window')
export default function Home({ navigation }) {

  const [dataBanner, setDataBanner] = useState()
  const [loading, setLoading] = useState(true)
  const [dataMeals, setDataMeals] = useState()
  const goToDetails = (data) => {
    navigation.navigate("DetailsScreen", { props: data })
  }

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const fetchUserAction = () => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      axios
        .get(`http://proteinium.iroidtechnologies.in/api/v1/get-mealcategories`)
        .then((response) => {
          console.log("data", response.data.data.meal_categories)
          setDataBanner(response.data.data.banners)
          setDataMeals(response.data.data.meal_categories)
          setLoading(false)
        })
        .catch((error) => {
          reject(error);
          setLoading(true)
        });
    });
  }
  useEffect(() => {
    fetchUserAction()
  }, [])

  const ItemCard = () => {
    return (
      <View style={styles.mainContainer}>
        {dataBanner && (dataBanner.map((data, index) => {
          console.log(data.image)
          const url = data.image
          return (
            <View key={index}>
              <Image source={require('../assets/images/Rectangle.png')} style={[styles.imageView, { marginTop: 19, }]} />
              <View style={styles.circleContainer}>
                <View style={[styles.circle, { backgroundColor: color.detailsText, }]}></View>
                <View style={[styles.circle, { backgroundColor: 'green', }]}></View>
                <View style={[styles.circle, { backgroundColor: color.detailsText, }]}></View>
              </View>
            </View>
          )
        }))}
      </View>
    )
  }

  const ListCard = () => {

    return (
      <View style={{ flex: 1 }}>
        {dataMeals && (dataMeals.map((data, index) => {
          console.log(data, "image")
          return (
            <View key={index} style={{ flex: 1 }}>
              <Image
                source={{ uri: data.image }}
                style={[styles.imageView, { marginTop: 20, height: 130 }]}
                resizeMode='cover'
              />
              <View
                style={{
                  backgroundColor: color.transparent,
                  opacity: .81,
                  position: 'absolute',
                  width: width * .90,
                  height: 30,
                  bottom: 0,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  alignSelf: 'center',
                  justifyContent:'center'
                }}>
                <Text
                  style={{
                    color: color.primaryWhite,
                    textAlignVertical:'center',
                    marginLeft: 30,
                    fontSize:12,
                    fontWeight:'bold'
                  }}
                >
                  Weight Loss
                </Text>
              </View>
              <View style={{
                backgroundColor: color.primaryWhite,
                position: 'absolute',
                width: 30,
                height: 30,
                bottom: -15,
                right: 30,
                borderRadius: 15,
                alignSelf: 'center',
                alignItems:'center',
                justifyContent:'center'
              }}>
                 <Feather name='chevron-up' size={18} style={{color:color.primaryBlack}}/>
              </View>
            </View>
          )
        }))}
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      {loading ? <ActivityIndicator size="large" color="#A0E7E5" /> :
        (<ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.menuBar}>
            <Text style={styles.titleStyle}>IROID</Text>
            <Image source={require('../assets/images/sub.png')} style={styles.image} />
          </View>
          {!loading ? <ItemCard /> : null}
          <ListCard />
          <View style={{marginBottom:100}}></View>
        </ScrollView>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  menuBar: {
    flexDirection: 'row',
    height: 84,
    backgroundColor: color.buttonColor,
    justifyContent: 'space-between'
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    color: color.titleColor,
    alignSelf: 'center',
    fontSize: 34,
    fontFamily:'Bungee-Regular'
  },
  image: {
    marginRight: 24,
    alignSelf: 'center',
  },
  imageView: {
    width: width * .90,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: -1
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 8
  },
  circleContainer: {
    alignSelf: 'center',
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});