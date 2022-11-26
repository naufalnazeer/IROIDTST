import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import color from '../assets/theme/color'
const { height, width } = Dimensions.get('window')

export default function LogIn({navigation}) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const loginUrl = "http://proteinium.iroidtechnologies.in/api/v1/login"
  const signIn = async () => {
    console.log(userName, password)
    let res = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        email: userName,
        password: password,
        lang_id: 'en',
        device_token: 'sss'
      }),
    });
    console.log(res.status)
    if (res.status == "200") {
      setLoggedIn(true)
      console.log(loggedIn)
    } else {
      setLoggedIn(false)
    }
  }
  useEffect(()=>{
    if(loggedIn){
      console.log("loggedIn")
      navigation.navigate("DrawerNav")
    }
  },[loggedIn])

  return (
    <View style={styles.container}>
      <View style={styles.skipView}>
        <Text style={styles.skipText}>Skip</Text>
      </View>
      <View style={styles.signView}>
        <Text style={styles.signText}>Sign In</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>Enter Your Details</Text>
      </View>
      <TextInput
        placeholder='User Name'
        placeholderTextColor={"#B6B7B7"}
        style={styles.textInput}
        value="shak@gmail.com"
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={"#B6B7B7"}
        style={styles.textInput}
        value="123456"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={signIn} style={styles.buttonView}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text onPress={() => { }} style={styles.forgetText}>Forgot your password?</Text>
      <Text style={styles.detailsText}>Don't have an Account?<Text style={styles.signupText}> Sign Up</Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryWhite
  },
  skipText: {
    color: color.skipText,
    textAlign: "center",
    letterSpacing: 0,
    opacity: 1,
    fontSize: 14,
    fontWeight: '600'
  },
  skipView: {
    alignItems: 'flex-end',
    marginRight: 33,
    marginTop: 19
  },
  signView: {
    marginTop: 50
  },
  signText: {
    color: color.primaryBlack,
    textAlign: "center",
    letterSpacing: 0,
    opacity: 1,
    fontSize: 30,
    fontWeight: '600'
  },
  detailsText: {
    color: color.detailsText,
    textAlign: "center",
    letterSpacing: 0,
    opacity: 1,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 15
  },
  textInput: {
    backgroundColor: color.inputBackground,
    marginHorizontal: 33,
    paddingLeft: 34,
    borderRadius: 28,
    marginTop: 20
  },
  buttonView: {
    backgroundColor: color.buttonColor,
    height: 50,
    marginHorizontal: 33,
    borderRadius: 28,
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonText: {
    color: color.primaryWhite,
    textAlign: 'center',
    fontSize: 14
  },
  forgetText: {
    color: color.primaryBlack,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14
  },
  signupText: {
    color: color.signupText,
    fontWeight: "600"
  }
})
//   const [isRegistering, setIsRegistering] = useState(false)
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('')
//   const [phone, setPhone] = useState('')
//   const imagePosition = useSharedValue(1)

//   const imageAnimatedStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 1.5, 0])
//     return {
//       transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
//     }
//   })

//   const buttonAnimatedStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
//     return {
//       opacity: withTiming(imagePosition.value, { duration: 500 }),
//       transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
//     }
//   })

//   const closeButtonAnimatedStyle = useAnimatedStyle(() => {
//     const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
//     return {
//       opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
//       transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]
//     }
//   })

//   const formAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withDelay(400, withTiming(0, { duration: 300 })),
//     }
//   })

//   const loginHandler = () => {
//     imagePosition.value = 0;
//     if (isRegistering) runOnJS(setIsRegistering)(false)
//   }

//   const regsterHandler = () => {
//     imagePosition.value = 0;
//     if (!isRegistering) runOnJS(setIsRegistering)(true)
//   }
//   const registerOrLogin = async () => {
//     console.log("hi")
//     if (isRegistering) {
//       try {
//         const credential = await auth().createUserWithEmailAndPassword(email, password);
//         console.log(credential);
//         const uid = credential.user.uid;
//         console.log("uid", uid);
//         const user = {
//           fullName: fullName,
//           user_id: uid,
//           email: email,
//           phoneNumber: phone
//         };
//         await firestore().collection('users').doc(uid).set(user);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       try {
//         auth().signInWithEmailAndPassword(email, password);
//       } catch (error) {
//         alert(error);
//       }
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
//         <Svg height={height + 100} width={width}>
//           <ClipPath id='clipsPathId'>
//             <Ellipse cx={width / 2} rx={height} ry={height + 100} />
//           </ClipPath>
//           <Image
//             href={require("../assets/images/login-background.jpg")}
//             height={height + 100}
//             width={width + 100}
//             preserveAspectRatio="xMidYmid slice"
//             clipPath='url(#clipsPathId)'
//           />
//         </Svg>
//         <Animated.View style={[styles.closeButton, closeButtonAnimatedStyle]}>
//           <Text onPress={() => imagePosition.value = 1}>X</Text>
//         </Animated.View>
//       </Animated.View>
//       <View style={styles.bottomContainer}>
//         <Animated.View style={buttonAnimatedStyle}>
//           <Pressable style={styles.button} onPress={loginHandler}>
//             <Text style={styles.buttonText}>LOG IN</Text>
//           </Pressable>
//         </Animated.View>
//         <Animated.View style={buttonAnimatedStyle}>
//           <Pressable style={styles.button} onPress={regsterHandler}>
//             <Text style={styles.buttonText} >REGISTER</Text>
//           </Pressable>
//         </Animated.View>
//         <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
//           <TextInput
//             placeholder='Email'
//             placeholderTextColor="#000"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType='email-address'
//             autoCompleteType='off'
//             style={styles.textInput} />
//           {isRegistering ?
//             <>
//               <TextInput
//                 placeholder='Full Name'
//                 placeholderTextColor="#000"
//                 value={fullName}
//                 onChangeText={setFullName}
//                 style={styles.textInput} />
//               <TextInput
//                 placeholder='Phone number'
//                 placeholderTextColor="#000"
//                 value={phone}
//                 onChangeText={setPhone}
//                 secureTextEntry={true}
//                 style={styles.textInput} />
//             </>
//             : null}
//           <TextInput
//             placeholder='Password'
//             placeholderTextColor="#000"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={true}
//             style={styles.textInput} />
//           <Pressable style={styles.formButton} onPress={registerOrLogin}>
//             <Text style={styles.buttonText}>{isRegistering ? "REGISTER" : "LOG IN"}</Text>
//           </Pressable>
//         </Animated.View>
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end'
//   },
//   button: {
//     backgroundColor: '#B4F8C8',
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: "#fff"
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: "#000",
//     letterSpacing: .5
//   },
//   bottomContainer: {
//     justifyContent: 'center',
//     height: height / 1.6,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#000',
//     height: 40,
//     marginHorizontal: 20,
//     marginVertical: 5,
//     borderRadius: 25,
//     paddingLeft: 30,
//   },
//   formButton: {
//     backgroundColor: '#B4F8C8',
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4
//     },
//     shadowOpacity: .25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   formContainer: {
//     marginBottom: 10,
//     justifyContent: 'center',
//     // zIndex: -1
//   },
//   closeButton: {
//     height: 40,
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4
//     },
//     shadowOpacity: .25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     backgroundColor: '#B4F8C8',
//     alignSelf: 'center',
//     borderRadius: 20,
//     top: -20
//   }
// })