import React, { useState, useEffect,useRef } from 'react';
import { View, Text, Image, Button,Platform ,PermissionsAndroid,StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {Camera,useCameraDevice} from 'react-native-vision-camera';
import { RNCamera } from 'react-native-camera';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
import { ImageToBase64 } from 'react-native-image-base64';




const Test = () => {
  const [connectedPrinter, setConnectedPrinter] = useState(null);
  const [imageData, setImageData] = useState('');
  const [clickPic, setClickPic] = useState(false);
  const [location, setLocation] = useState(null);
  const viewShotRef = useRef(null);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [address, setAddress] = useState(null);
  const imageUri = 'https://zplusconnect.netcastservice.co.in/doctor.png';
  const [base64Image, setBase64Image] = useState(null);


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
        const response = await fetch('https://zplusconnect.netcastservice.co.in/doctor.png');
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
  const imageUrl = 'https://www.tourmyindia.com/states/jammu-kashmir/image/splendor-of-kashmir.jpg';
  const imagePath = RNFetchBlob.fs.dirs.DownloadDir + '/Poster1.jpg';

  // useEffect(() => {
  //   const downloadImage = async () => {
  //     try {

  //       const imageName = 'Poster1.jpg'; // Specify the desired image name

  //       const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + imageName;

  //       const response = await RNFetchBlob.config({
  //         fileCache: true,
  //         appendExt: 'jpg',
  //         path,
  //       }).fetch('GET', 'https://www.tourmyindia.com/states/jammu-kashmir/image/splendor-of-kashmir.jpg'); // Replace avatarUri with the imageUrl

  //       console.log('Image downloaded successfully at:', path);
       
  //     } catch (error) {
  //       console.error('Error downloading image:', error);
     
  //     } finally {
   
  //     }
  //   };

  //   // Call the downloadImage function when the component mounts
  //   downloadImage();
  // }, []); 

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
  




  const handleCaptureLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
      },
      (error) => console.log('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchAddress = async (latitude, longitude) => {
    const apiKey = 'abffae23fe9441b4b8bc970ac6ccc569';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  
  const takePicture = async () =>{
    if(camera != null){
      const photo= await camera.current.takePhoto();
      setClickPic(false);
      setImageData(photo.path)
      console.log(photo.path);
    }
    

  }
  
  
  const onBarCodeRead = (event) => {
    // Handle the scanned QR code data here
    console.log('QR Code data:', event.data);
    Alert.alert('QR Code data:', event.data);
    setClickPic(false);
    // You can implement further logic based on the scanned data
  };

  // const handlePrint = async () => {
  //   const htmlContent = `
  //   <html>
  //     <body>
  //       <h1>Hello World</h1>
  //       <img src="${imageUrl}" style="width: 100%;" />
  //     </body>
  //   </html>
  // `;

  //   await RNPrint.print({
  //     html: htmlContent,
  //   });
  // };

  // _______________________________________________________/

  // const handlePrint = async () => {
  //   const htmlContent = '<html><body><h1>Hello World</h1></body></html>';

  //   await RNPrint.print({
  //     html: htmlContent,
  //   });
  // };

  // ____________________________________________________/


  // const handlePrint = async () => {
  //   try {
  //     await RNPrint.print({
  //       filePath: imageUri,
  //       isLandscape: true, // Set to true if the image is in landscape mode
  //     });
  //   } catch (error) {
  //     console.error('Error printing:', error);
  //   }
  // };

  // const handlePrint = async () => {
  //   try {
  //     const printOptions = {
  //       filePath: Platform.OS === 'android' ? 'base64' : 'image',
  //       uri: 'https://zplusconnect.netcastservice.co.in/doctor.png', // Provide the image URL directly
  //       isLandscape: true,
  //     };
  //     await RNPrint.print(printOptions);
  
  //   } catch (error) {
  //     console.error('Error printing:', error);
  //   }
  // };
  
  const handlePrint = async () => {
    try {
      const htmlContent = `<html><body><img src="${base64Image}" style="width:100%; height:auto;"></body></html>`;
      await RNPrint.print({
        html: htmlContent
      });
    } catch (error) {
      console.error('Error printing:', error);
    }
  };



  const handlePrint1 = async () => {
    try {
      const imageUrl = 'https://www.tourmyindia.com/states/jammu-kashmir/image/splendor-of-kashmir.jpg';
      const localImagePath = RNFS.DocumentDirectoryPath + '/splendor-of-kashmir.jpg';
  
      const downloadOptions = {
        fromUrl: imageUrl,
        toFile: localImagePath,
        background: true,
        discretionary: true,
      };
  
      const downloadResult = await RNFS.downloadFile(downloadOptions).promise;
  
      if (downloadResult.statusCode === 200) {
        const fileExists = await RNFS.exists(localImagePath);
  
        if (fileExists) {
          const printOptions = {
            filePath: localImagePath,
            isLandscape: true,
          };
  
          await RNPrint.print(printOptions);
        } else {
          console.error('Error printing. File does not exist.');
        }
      } else {
        console.error('Error downloading image. Status code:', downloadResult.statusCode);
      }
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  const handleBackButton = () => {
    setClickPic(false);
  };

  return (
    <View style={{flex:1}}>
    {clickPic ?(
      <View style={{flex:1}}>
    {/* <Camera
    ref={camera}
     style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo
    /> */}
    <RNCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={onBarCodeRead} // Add the onBarCodeRead prop for QR code scanning
            device={device}
      isActive={true}
      photo
          />
              <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              padding: 10,
              backgroundColor: 'red',
              color:'white',
              borderRadius: 5,
              zIndex: 1,
            }}
            onPress={handleBackButton}
          >
            <Text style={{color:'white'}}>Close</Text>
          </TouchableOpacity>
    {/* <TouchableOpacity
    style={{
      width:60,
      height:60,
      borderRadius:30,
      backgroundColor:'red',
      position:'absolute',
      bottom:50,
      alignSelf:'center',
    }}
    onPress={()=> takePicture()}
    >
    </TouchableOpacity> */}
    </View>

    ):(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      {/* <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />/ */}
      {base64Image && <Image source={{ uri: base64Image }} style={{ width: 200, height: 200 }} />}
      <View style={{height:20}}></View>
      {/* <Text>Connected Printer: {connectedPrinter ? connectedPrinter.deviceName : 'None'}</Text> */}
      <Button title="Print" onPress={handlePrint} style={{marginBottom:20}}/>

<View style={{height:20}}></View>
<Text style={{margin:10,fontSize:20,display:'none', }} >Click on below button to capture Photo</Text>
      {/* <Button style={{margin:10,display:'none',}} title="Scan QR" onPress={()=>{setClickPic(true);}} /> */}

      {imageData !=='' && <Image source={{uri:'file://'+imageData}} style={{width:'90%',height:200,margin:20}}/>}
      <View style={{margin:10,display:'none',}}>
      <Button style={{margin:10,}} title="Capture Location" onPress={handleCaptureLocation} />
      </View>

      {location && (
        <View style={{margin:10}}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          {address && <Text>{address}</Text>}
        </View>
      )}

      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      </View>
    )}
    
    
      
    </View>
  );
};

export default Test;
