import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from '../redux/actons';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const { height, width } = Dimensions.get('window')
export default function Home({navigation}) {

  const user = useSelector((state) => state?.user);
  const { usersData, loading, error } = user;
  console.log(usersData)

  const dispatch = useDispatch();

  const { uid } = auth().currentUser;

  const goToDetails = (data)=>{
    navigation.navigate("DetailsScreen",{props:data})
  }

  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };

  // console.log(uid)
  // const getUser = async () => {
  //   try {
  //     const documentSnapshot = await firestore()
  //       .collection('users')
  //       .doc(uid)
  //       .get(); 
  //     setUserData(documentSnapshot.data())
  //   } catch(error) {
  //     //do whatever
  //     console.log(error);
  //   }
  //   console.log("userdata:",userData);
  // };
  useEffect(() => {
    dispatch(fetchUserAction())
  }, [])

  // const addData = async ()=>{
  //   try{
  //     const user = {
  //       firstName: 'naufal',
  //       lastName: 'nazeer',
  //       user_id: uid,
  //       products : {apple:{apple11:{name:"apple11",prize:"40000"},apple12:{name:"apple12",prize:"60000"}}}
  //     };
  //     await firestore().collection('users').doc(uid).update(user);
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  const ItemCard = () => {
    return (

      <View style={styles.mainContainer}>
        {usersData && (usersData["products"]?.map((data, index) => {
          const imageUrl = data.thumbnail;
          return (
            <View key={index} style={styles.cardView}>
              <Text style={styles.title} onPress={()=>goToDetails(data)}>{data.title}</Text>
              <Image source={{ uri: imageUrl }} style={styles.imageView} />
              <Text style={styles.prizeText}>{data.price}$</Text>
              <Text style={styles.descriptionText}>{data.description}</Text>
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
            <TouchableOpacity onPress={()=> toggleDrawer()}>
            <Feather name='menu' size={24} color="#A0E7E5" />
            </TouchableOpacity>
            <Feather name='settings' size={24} color="#A0E7E5" />
          </View>
          {!loading ? <ItemCard /> : null}
        </ScrollView>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 25,
  },
  button: {
    marginTop: 30,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  cardView: {
    minHeight: width / 2,
    width: (width / 2) - 40,
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
    backgroundColor: '#FFAEBC',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageView: {
    height: width * .25,
    width: width * .25,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  title: {
    color: "#000",
    paddingVertical: 4,
    fontSize: 16,
    letterSpacing: .6,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  prizeText: {
    color: "red",
    letterSpacing: .1,
    fontSize: 12,
    textAlign: 'center',
    marginTop:5
  },
  descriptionText: {
    color: '#000',
    fontSize: 10,
    marginBottom: 3,
    paddingHorizontal: 4,
    textAlign:'center'
  }
});