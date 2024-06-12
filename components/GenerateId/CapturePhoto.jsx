import React, { useState,useEffect } from 'react';
import { View, Button, Image, Alert,TouchableOpacity,Text,StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs'; 
import { BASE_URL,ID_URL } from '../Configuration/Config';
import { useRoute } from '@react-navigation/native';


const CapturePhoto = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const route = useRoute();
    const { doctorId } = route.params;

  

    useEffect(() => {
      console.log("doctor Id:",doctorId);
        // Ensure header is shown when component is unmounted
        return () => {
          navigation.setOptions({
            headerShown: true
          });
        };
      }, []);


    // const handleSubmit = ()=>{
    //     navigation.navigate('PrintTest')
    //   }

    const handleSubmit = async () => {
      try {
        // Convert image to base64
        const base64Image = await RNFS.readFile(imageUri, 'base64');
        // console.log('Converted Image:', base64Image);
        // Send data to API
        const response = await fetch('https://pediatricdermaeventidapi.netcastservice.co.in/getPoster', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            docId: doctorId,
            base64Image: `data:image/jpeg;base64,${base64Image}`
          })
        });
        const responseData = await response.json();
    console.log('API response:', responseData);
    if (responseData.errorCode === "1") {
      // Pass PosterName to the next screen if errorCode is 1
      navigation.navigate('PrintTest', { posterName: responseData.PosterName });
    } else {
      Alert.alert('Error', 'Failed to get poster');
    }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to submit photo');
      }
    };

    const openCamera = () => {
      setIsCameraOpen(true);
      navigation.setOptions({
        headerShown: false
      });
    };
  
    const closeCamera = () => {
      setIsCameraOpen(false);
      navigation.setOptions({
        headerShown: true
      });
    };
  
    const takePicture = async () => {
      if (isCameraOpen) {
        const options = { quality: 0.5, base64: false };
        const data = await camera.takePictureAsync(options);
        await cropImage(data.uri);
        navigation.setOptions({
            headerShown: true
          });
      }
    };
  
    const cropImage = async (uri) => {
      try {
        const croppedImage = await ImageCropPicker.openCropper({
          path: uri,
          width: 300,
          height: 400,
          cropping: true,
          freeStyleCropEnabled: true,
          cropperToolbarTitle: 'Crop Image',
        });
        setImageUri(croppedImage.path);
        console.log("Image uri",croppedImage.path);
        setIsCameraOpen(false);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to crop image');
      }
    };
  
    return (
      <View style={{ flex: 1 }}>
        {isCameraOpen ? (
          <View style={{ flex: 1 }}>
            <RNCamera
              style={{ flex: 1 }}
              ref={(ref) => {
                camera = ref;
              }}
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
            onPress={()=> closeCamera()}
          >
            <Text style={{color:'white'}}>Close</Text>
          </TouchableOpacity>
    <TouchableOpacity
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
    </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <Button title="Capture" onPress={takePicture} />
              <Button title="Close Camera" onPress={closeCamera} />
            </View> */}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={{ width: 300, height: 400 }} />
             
                <Text style={styles.textstyle1}> Retake Photo</Text>
             
                 
                
                <TouchableOpacity style={styles.imageButton} onPress={openCamera}  >
        <Image source={require('./Camera.png')} style={styles.image1} />
      </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                
                  <Button title="Next" onPress={handleSubmit} />
                </View>
              </>
            ) : (
                <View>
                <Text style={styles.textstyle}> Capture Photo</Text>
                <TouchableOpacity style={styles.imageButton} onPress={openCamera}  >
        <Image source={require('./Camera.png')} style={styles.image} />
      </TouchableOpacity>
                </View>
              
              
            )}
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
    //   backgroundColor:'#ADD8E6',
    borderColor:'#17175f',
    borderWidth:2,
      borderRadius:100,
      width: 150,
      height: 150,
      marginTop:20
    },
    image1: {
        //   backgroundColor:'#ADD8E6',
        borderColor:'#17175f',
        borderWidth:2,
          borderRadius:100,
          width: 100,
          height: 100,
          marginTop:20
        },
    textstyle:{
      fontSize:20,
      fontWeight:'600',
      color:'#17175f'
    },
    textstyle1:{
        fontSize:20,
        fontWeight:'600',
        color:'#17175f',
        marginTop:20
      }
  });

export default CapturePhoto;
