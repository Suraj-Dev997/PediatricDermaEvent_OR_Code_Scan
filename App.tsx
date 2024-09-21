/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Test from './components/Test';
import VerifyQr from './components/VerfiyQR/VerifyQr';
import {Home} from './components/Home/Home';
import {Ham} from './components/Layouts/Ham';
import PrintTest from './components/GenerateId/PrintTest';
import CapturePhoto from './components/GenerateId/CapturePhoto';
import ScanForGenerate from './components/GenerateId/ScanForGenerate';
import {Login} from './components/Login/Login';
import {SplashScreen} from './components/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerRight: () => <Ham />,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#17175f',
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerLeft: () => (
              <View>
                <Text style={styles.dot}>.</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="VerifyQr"
          component={VerifyQr}
          options={{
            title: 'Verify QR Code',
            headerLeft: () => (
              <View>
                <Text style={styles.dot}>.</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="PrintTest"
          component={PrintTest}
          options={{title: 'Print Test'}}
        />
        <Stack.Screen
          name="CapturePhoto"
          component={CapturePhoto}
          options={{title: 'Capture Photo'}}
        />
        <Stack.Screen
          name="ScanForGenerate"
          component={ScanForGenerate}
          options={{title: 'Scan QR'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dot: {
    color: '#17175f',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
