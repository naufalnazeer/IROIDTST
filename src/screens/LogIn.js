import React, { useState } from 'react';
// import Authentication from '../screens/Authenticated';
// import Authenticated from './src/screens/Authenticated';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Text, Dimensions, TextInput, Pressable } from 'react-native';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, runOnJS } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window')

export default function LogIn() {
  
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('')
  const imagePosition = useSharedValue(1)
  
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 1.5, 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const closeButtonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withDelay(400, withTiming(0, { duration: 300 })),
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) runOnJS(setIsRegistering)(false)
  }

  const regsterHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) runOnJS(setIsRegistering)(true)
  }
  const registerOrLogin = async()=>{
    console.log("hi")
    if (isRegistering){
        try {
            const credential = await auth().createUserWithEmailAndPassword(email, password);
            console.log(credential);
            const uid = credential.user.uid;
            console.log("uid", uid);
            const user = {
              fullName: fullName,
              user_id: uid,
              email:email
            };
            await firestore().collection('users').doc(uid).set(user);
          } catch (error) {
            console.log(error);
          }
    }else{
        try {
            auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            alert(error);
          }
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id='clipsPathId'>
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../assets/images/login-background.jpg")}
            height={height + 100}
            width={width + 100}
            preserveAspectRatio="xMidYmid slice"
            clipPath='url(#clipsPathId)'
          />
        </Svg>
        <Animated.View style={[styles.closeButton, closeButtonAnimatedStyle]}>
          <Text onPress={() => imagePosition.value = 1}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={regsterHandler}>
            <Text style={styles.buttonText} >REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
          <TextInput
            placeholder='Email'
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCompleteType='off'
            style={styles.textInput} />
          {isRegistering ?
            <TextInput
              placeholder='Full Name'
              placeholderTextColor="#000"
              value={fullName}
              onChangeText={setFullName}
              style={styles.textInput} />
            : null}
          <TextInput
            placeholder='Password'
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.textInput} />
          <Pressable style={styles.formButton} onPress={registerOrLogin}>
            <Text style={styles.buttonText}>{isRegistering ? "REGISTER" : "LOG IN"}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: '#B4F8C8',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: "#000",
    letterSpacing: .5
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 1.6
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 30
  },
  formButton: {
    backgroundColor: '#B4F8C8',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    // zIndex: -1
  },
  closeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#B4F8C8',
    alignSelf: 'center',
    borderRadius: 20,
    top: -20
  }
})