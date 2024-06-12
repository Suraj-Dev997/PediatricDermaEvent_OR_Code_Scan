
               


import React,{ useEffect,useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView,Linking,StatusBar,BackHandler,Alert ,ImageBackground,PermissionsAndroid  } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { BASE_URL } from '../Configuration/Config';
import { BASE_URL1 } from '../Configuration/Config';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { check, PERMISSIONS, request } from 'react-native-permissions';



export const Home =  () =>{
  const navigation = useNavigation();
  const [permissionStatus, setPermissionStatus] = useState('undetermined');

 
  




const handleVerify = ()=>{
    navigation.navigate('VerifyQr')
}
const handleGenerate = ()=>{
  navigation.navigate('ScanForGenerate')
}


  useEffect(() => {
    requestStoragePermission();
  }, []);
  //Version checking code-------------------------------------
  const requestStoragePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

      if (result === 'granted') {
        setPermissionStatus('granted');
      } else {
        setPermissionStatus('denied');
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
    }
  };

  // let user = await AsyncStorage.getItem('user');  
  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('user');
    console.log(token)
    return token !== null;
  };
  useEffect(() => {
    const backAction =async () => {
      const usertoken= await AsyncStorage.getItem("userdata")
      if (!usertoken) {
        // If the user is not logged in, show an alert or perform any other action you want
        Alert.alert('Confirmation', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);
      } else {
        // If the user is logged in, prevent going back to the login screen
        return true;
      }
    };
  
    // Subscribe to the back button press event
    BackHandler.addEventListener('hardwareBackPress', backAction);
  
    // Cleanup the event listener when the component is unmounted
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

    return(
      <LinearGradient  colors={['#B9D9EB','#00BFFF']} style={styles.container}>
        <View style={styles.container}>
       
           <StatusBar backgroundColor="#17175f"/>
         
    
          
        <View style={[styles.container1,styles.elevation]} >    
        {/* {categories.map((category) => (
           <LinearGradient colors={['#4b93d8',  '#17175f']} style={[styles.button,styles.elevation]}>
        <TouchableOpacity
          key={category.id}
          onPress={() => props.navigation.navigate("HomeMenu")}
        >
 
          <Text style={styles.buttonText}>{category.name}</Text>
        </TouchableOpacity>
        </LinearGradient>
      ))} */}
      
   
        <View  >
           <TouchableOpacity
      onPress={() => handleVerify()}
      activeOpacity={1} 
    >
          <LinearGradient
  
    colors={['#005A9C', '#17175f']}
    style={[styles.button, styles.elevation]}
  >
   
      <Text style={styles.buttonText}>Verify</Text>
    
  </LinearGradient>
  </TouchableOpacity>
        </View>
        <View  >
           <TouchableOpacity
      onPress={() => handleGenerate()}
      activeOpacity={1} 
    >
          <LinearGradient
  
    colors={['#005A9C', '#17175f']}
    style={[styles.button, styles.elevation]}
  >
      <Text style={styles.buttonText}>Generate</Text>
    
  </LinearGradient>
  </TouchableOpacity>
        </View>
  

        
     
          </View>
          
      </View>
   </LinearGradient>
     
    );
  }

  const styles = StyleSheet.create({
   
    container: {


      // backgroundColor:'#fff',
      flexGrow: 1,
      justifyContent: 'center',
      
    },
    borderbutton:{
    
    },
    container1: {
padding:20,
      
    },
    row: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    button: {
      borderWidth: 2, // Adjust the border width as needed
      borderColor:'#6082B6',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#17175f',
      padding: 30,
      marginVertical: 15,
      borderRadius: 20,
    },
    button1: {
      flex: 1,
      marginHorizontal: 3,
      height: 90,
      textAlign:'center',
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      // borderRadius:10,
 
    },
    image: {
      width: '100%',
      height: 140,
      // borderRadius:10,
      marginBottom:6,
    
    },
    buttonText: {
   
      textAlign:'center',
      color: 'white',
      fontSize: 22,
     
    },
    elevation: {
      elevation: 5 ,
      shadowColor: '#000',
    },
  });