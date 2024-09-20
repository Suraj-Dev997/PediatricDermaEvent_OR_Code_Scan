import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import {BASE_URL} from '../Configuration/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export const Login = () => {
  const [EmpCode, setEmpCode] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //   const handleLogin1 = async () => {
  // navigation.navigate('Home')
  //   }
  const handleLogin = async () => {
    setIsLoading(true);
    const ApiUrl = `${BASE_URL}${'/AccountApi/LoginValidate'}`;
    const response = await fetch(ApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empCode: EmpCode,
        password: Password,
        loginTypeField: 'EMPCODE',
      }),
    });
    console.log(EmpCode);
    console.log(Password);
    const responseData = await response.json();
    console.log('responsedata', responseData);
    if (response.ok) {
      // await AsyncStorage.setItem('user', "Suraj");
      const jsonData = JSON.stringify(responseData);
      console.log(jsonData);
      try {
        await AsyncStorage.setItem('userdata', jsonData);
        console.log('Data saved successfully');
        setEmpCode('');
        setPassword('');
      } catch (error) {
        console.log('Error saving data:', error);
      }

      // Alert.alert(user);
      // const  isRemember=AsyncStorage.getItem('Name');
      //Alert.alert('Msg', isRemember);
      //console.log(isRemember);
      if (responseData.errorCode === '1') {
        navigation.navigate('VerifyQr');
      } else {
        Alert.alert('Error', 'Invalid EmployeeCode or Password');
        console.log(responseData.errorDetail);
      }

      console.log(responseData.errorCode);
    } else {
      // errorMessage(responseData.error);
      Alert.alert('Error', 'Error while Login');
      console.log('F');
    }
    setIsLoading(false);
  };
  return (
    <ImageBackground
      source={require('./Images/Splash4.jpg')}
      style={styles.backgroundImage}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0aae4d" />
      ) : (
        <>
          <Image
            style={styles.logo}
            source={require('./Images/Logo.png')}
            resizeMode="contain"
          />
          <TextInput
            style={[styles.input]}
            placeholder="Employee Code"
            placeholderTextColor="#17175f"
            onChangeText={text => setEmpCode(text)}
            value={EmpCode}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Password"
            placeholderTextColor="#17175f"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={Password}
          />
          <LinearGradient
            colors={['#005A9C', '#17175f']}
            style={[styles.buttonContainer, styles.elevation]}
            onTouchStart={handleLogin}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}></TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if you want the image to stretch to cover the entire screen
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5F5F5',
  // },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    color: '#17175f',
    borderColor: '#17175f',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '40%',
    paddingTop: 10,
    paddingBottom: 10,
    padding: 20,
    // height: 50,
    backgroundColor: '#0aae4d',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#0aae4d',
    fontSize: 14,
  },
  logo: {
    width: '80%',
    height: 100,
    marginBottom: 50,
    borderRadius: 50,
  },
  elevation: {
    elevation: 3,
    shadowColor: '#272626',
  },
});
