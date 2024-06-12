import React, { useState, useEffect,useRef } from 'react';
import { View, Text, Image, Button,Platform ,PermissionsAndroid,StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {Camera,useCameraDevice} from 'react-native-vision-camera';
import { RNCamera } from 'react-native-camera';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
import { useRoute } from '@react-navigation/native';


const PrintTest = () => {
    const [imageData, setImageData] = useState('');
    const [clickPic, setClickPic] = useState(false);
    const [location, setLocation] = useState(null);

    const device = useCameraDevice('back');


 
    const [base64Image, setBase64Image] = useState(null);
    const route = useRoute();
    const { posterName } = route.params;

 
    useEffect(() => {
 
        requestCameraPermission();
        requestLocationPermission();
        // requestBlutoothPermission();
        requestStoragePermission();
        console.log("useffect run");
      }, []);

      useEffect(() => {
        const fetchImage = async () => {
          try {
            
            const response = await fetch(`https://pediatricdermaeventidapi.netcastservice.co.in/${posterName}`);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              setBase64Image(reader.result);
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
    
        fetchImage();
      }, []);

      if (device == null) return <Text>No Camera found</Text>;
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool App Location Permission',
          message:
            'Cool App needs access to your Location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool App Storage Permission',
          message:
            'Cool App needs access to your Storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestBlutoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        {
          title: 'Cool App Blutooth Permission',
          message:
            'Cool App needs access to your Blutooth ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Blutooth');
      } else {
        console.log('Blutooth permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePrint = async () => {
    try {
      const htmlContent = `<html><body style="margin: 0; padding: 0;"><img src="${base64Image}" style="width:100%; height:1055;"></body></html>`;
      await RNPrint.print({
        html: htmlContent
      });
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

   
  

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      {/* <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />/ */}
      {base64Image && <Image source={{ uri: base64Image }} style={{ width: 260, height: 390 }} />}
      <View style={{height:20}}></View>
      {/* <Text>Connected Printer: {connectedPrinter ? connectedPrinter.deviceName : 'None'}</Text> */}
      <Button title="Print" onPress={handlePrint} style={{marginBottom:20}}/>


      

    

      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      </View>
  );
};



export default PrintTest;
