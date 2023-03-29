import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { decodedType } from '../types';
import { SECURE_STORE_KEY } from '../hooks/useAuth';
import { userContext } from '../utils/userContext';

export default function Login() {
  const { user, setUser } = useContext(userContext);

  const logInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const idToken = credential.identityToken;
      const cred = JSON.stringify(credential);
      await SecureStore.setItemAsync(SECURE_STORE_KEY, cred);
      if (idToken) {
        const decodedToken: decodedType = await jwtDecode(idToken);
        setUser(decodedToken);
      }
      // signed in
    } catch (e: any) {
      console.log('an error occured');
    }
  };

  //   const getContext = () => {
  //     if (!userToken) {
  //
  //     } else {
  //       const decoded: decodedType = jwtDecode(userToken.identityToken);
  //       console.log('Decoded', decoded);
  //       const current = Date.now() / 1000;
  //       return (
  //         <View>
  //           <Text>Hello {decoded.email}</Text>
  //           <Text>Expired : {(current >= decoded.exp).toString()}</Text>
  //           <TouchableOpacity onPress={appleLogout}>
  //             <Text>Logout</Text>
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     }
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={logInWithApple}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 64,
  },
});
