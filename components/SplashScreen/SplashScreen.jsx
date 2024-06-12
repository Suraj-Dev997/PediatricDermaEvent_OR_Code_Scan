import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SplashScreen = ({navigation}) => {
  // useEffect(() => {
  //   const getDeviceToken = async () => {
  //     try {
  //       const token = await messaging().getToken();
  //       console.log('token', token);
  //     } catch (error) {
  //       console.log('Error getting device token:', error);
  //     }
  //   };
  //   getDeviceToken();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      handleUser();
    }, 3000);
  });

  const handleUser = async () => {
    // const usertoken = await AsyncStorage.getItem('userdata');
    // if (!usertoken) {
    //   navigation.replace('Test');
    // } else {
    //   navigation.replace('Test');
    // }
    navigation.replace('VerifyQr');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./Images/Splash.jpg')}
        style={styles.backgroundImage}></ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    fontSize: 70,
    fontWeight: '800',
    color: '#0aae4d',
  },
  img: {
    width: '100%',
  },
});
