import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { fetchUser } from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import jwtDecode from 'jwt-decode';
import { decodedType } from '../types';
import { userContext } from '../utils/userContext';

const Router = () => {
  const { user } = useContext(userContext);
  return <>{user !== undefined ? <HomeScreen /> : <Login />}</>;
};

export default Router;
