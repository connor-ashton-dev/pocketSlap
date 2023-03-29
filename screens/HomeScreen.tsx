import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { LIST_SECURE_STORE_KEY } from '../hooks/useAuth';
import { getData } from '../hooks/getMyData';

const HomeScreen = () => {
  useEffect(() => {
    const myFunc = async () => {
      const data = await getData();
      console.log(data);
    };
    myFunc();
  }, []);

  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <Text>Create Packing List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text>Plan Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
