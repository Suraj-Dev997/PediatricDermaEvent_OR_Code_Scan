import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  useColorScheme,
} from 'react-native';
import {Button} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../Configuration/Config';

const LogoutPopup = ({visible, onDismiss, handleLogoutfunction}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onDismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={onDismiss}
              style={styles.button}
              labelStyle={{color: '#fff'}}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleLogoutfunction}
              style={styles.button}
              labelStyle={{color: '#fff'}}>
              Logout
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const Ham = () => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [Des, setDes] = useState('');
  const [Sessionid, setSeesionid] = useState('');
  const [UserId, setUserId] = useState('');
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('userdata');
        if (jsonData !== null) {
          const data = JSON.parse(jsonData);
          setFullName(data.responseData.fullName);
          setDes(data.responseData.designation);
          setUserId(data.responseData.userId);
          setSeesionid(data.responseData.sessionId);
          console.log('Session id is', data.responseData.sessionID);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    getData();
  }, []);

  const handleLogoutfunction = async () => {
    const ApiLogoutUrl = `${BASE_URL}/AccountApi/EndUserLoginSession`;

    // Retrieve the user data from AsyncStorage
    try {
      const data = await AsyncStorage.getItem('userdata');
      console.log('data on logout', data);
      if (data) {
        const userData = JSON.parse(data);
        const Sessionid = userData.responseData.sessionID;
        const Userid = userData.responseData.userId;
        console.log('Session-id:', Sessionid);
        // Now you can use the `userId` in your API request
        // Add the userId to the body of your POST request
        const response = await fetch(ApiLogoutUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: UserId,
            sessionId: Sessionid,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          // Perform the logout actions and navigate to the login screen
          await AsyncStorage.removeItem('userdata');
          setFullName('');
          setDes('');
          setUserId('');
          setSeesionid('');
          navigation.navigate('Login');
          console.log('Session End');
          setPopupVisible(false);
          console.log(responseData.errorCode);
          console.log(responseData.message);
        } else {
          console.log('F');
        }
        setPopupVisible(false);
      } else {
        // console.log('Invalid or missing data in AsyncStorage');
        setPopupVisible(false);
      }
    } catch (error) {
      console.error('Error handling logout:', error);
      setPopupVisible(false);
    }
  };

  const handleProfileIconPress = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsProfileModalVisible(false);
  };

  return (
    <View style={[styles.container, {zIndex: 100}]}>
      {/* Render your hamburger icon here */}
      {/* <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}> */}
      <TouchableOpacity style={styles.logoutbt}>
        <Icon1
          name="logout"
          size={27}
          color="#fff"
          onPress={() => setPopupVisible(true)}
        />
      </TouchableOpacity>
      {isMenuOpen ? (
        <View style={[styles.menu, {zIndex: 100}]}>
          <Text>Suraj</Text>
          <TouchableOpacity>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <LogoutPopup
        visible={popupVisible}
        onDismiss={() => setPopupVisible(false)}
        handleLogoutfunction={handleLogoutfunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutbt: {
    padding: 10,
    marginTop: 8,
  },
  menu: {
    position: 'absolute',
    zIndex: 999999999999,
    top: 5,
    right: 40,
    width: 100,
    height: 200,
    backgroundColor: 'white',
    padding: 10,
  },
  hamburgerIcon: {
    color: '#fff',
    fontSize: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  popupText: {
    color: '#000953',
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#000953',
    color: '#fff',
    width: 100,
  },
  btntext: {
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetail: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    top: -30,
    right: -20,
  },
});
