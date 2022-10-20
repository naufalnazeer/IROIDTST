import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserAction} from '../redux/actons';
export default function Authenticated() {
  const user = useSelector((state) => state.user);
  // const {usersData, loading, error} = user;
  // console.log(usersData)
  const [userData, setUserData] = useState([])

  const dispatch = useDispatch();

  const searchUser = () => {
    dispatch(fetchUserAction())
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {uid} = auth().currentUser;
  // console.log(uid)
  const getUser = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get(); 
      setUserData(documentSnapshot.data())
    } catch(error) {
      //do whatever
      console.log(error);
    }
    console.log("userdata:",userData);
  };
  useEffect(()=>{
    getUser();
  },[])
  const addData = async ()=>{
    try{
      const user = {
        firstName: 'naufal',
        lastName: 'nazeer',
        user_id: uid,
        products : {apple:{apple11:{name:"apple11",prize:"40000"},apple12:{name:"apple12",prize:"60000"}}}
      };
      await firestore().collection('users').doc(uid).update(user);
    }catch(error){
      console.log(error)
    }
  }
  return (
    <View style={styles.screen}>
      <Text>{userData.fullName}</Text>
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
});