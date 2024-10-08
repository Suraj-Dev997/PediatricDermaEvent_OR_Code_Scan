import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, PermissionsAndroid, StyleSheet,Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCameraDevice } from 'react-native-vision-camera';
import { BASE_URL } from '../Configuration/Config';
import { useNavigation } from '@react-navigation/native';

const ScanForGenerate = () => {
  const [clickPic, setClickPic] = useState(false);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
    requestAudioPermission();
    console.log("useEffect run");
  }, []);

  useEffect(() => {
    // Ensure header is shown when component is unmounted
    return () => {
      navigation.setOptions({
        headerShown: true
      });
    };
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool App Camera Permission',
          message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
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
  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Cool App AUDIO Permission',
          message: 'Cool Photo App needs access to your audio so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Reacord audio');
      } else {
        console.log('audio permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onBarCodeRead = async (event) => {
    if (!scanningEnabled) return;
    console.log('QR Code data:', event.data);
    const [doctorId, ticketId] = event.data.split(',').map(value => value.trim());
    console.log('Doctor ID:', doctorId);
    console.log('Ticket ID:', ticketId);
    const payload = {
      doctorId: doctorId,
      ticketId: ticketId,
      source: "generate",
      userId: "800001"
    };
    try {
      const ApiUrl = `${BASE_URL}${'/DoctorApi/VerifyDoctor'}`;
      const response = await fetch(ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      console.log("Data:",data);
      if (data.errorCode === "0") {
        navigation.navigate('CapturePhoto',{ doctorId: doctorId });
        // Alert.alert('Success', 'QR code verified successfully', [{ text: 'OK', onPress: () => setClickPic(false) }]);
        // setClickPic(false);
      } else {
        Alert.alert('Error', 'Doctor not exist in our records ', [{ text: 'OK', onPress: () => {setClickPic(false)} }]);
        // setClickPic(false);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while verifying QR code', [{ text: 'OK', onPress: () => setClickPic(false) }]);
      // setClickPic(false);
    }  
     setScanningEnabled(false);
    setTimeout(() => setScanningEnabled(true), 2000);
  };

  const handleBackButton = () => {
    setClickPic(false);
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: !clickPic
    });
  }, [clickPic]);
  return (
    <View style={{ flex: 1 }}>
      {clickPic ? (
        <View style={{ flex: 1 }}>
          <RNCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={onBarCodeRead}
            device={device}
            isActive={true}
            captureAudio={false}
      
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              padding: 10,
              backgroundColor: 'red',
              color: 'white',
              borderRadius: 5,
              zIndex: 1,
            }}
            onPress={handleBackButton}
          >
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Button title="Scan QR" onPress={() => { setClickPic(true); }} /> */}
          <Text style={styles.textstyle}> Click below to scan QR Code</Text>
          <TouchableOpacity style={styles.imageButton} onPress={() => { setClickPic(true); }} >
        <Image source={require('./Scan.png')} style={styles.image} />
      </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    marginBottom: 20,
  },
  image: {
    backgroundColor:'#ADD8E6',
    borderRadius:100,
    width: 150,
    height: 150,
    marginTop:20
  },
  textstyle:{
    fontSize:20,
    fontWeight:'600',
    color:'#17175f'
  }
});

export default ScanForGenerate;
