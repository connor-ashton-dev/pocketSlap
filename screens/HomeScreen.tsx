import React, { useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { fetchUser, SECURE_STORE_KEY } from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { decodedType } from '../types';
import { userContext } from '../utils/userContext';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  const [inputVal, setInputVal] = useState('');
  const [list, setList] = useState(['pancakes', 'oranges', 'detergent']);
  const { user, setUser } = useContext(userContext);

  const appleLogout = async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
    setUser(undefined);
  };
  const addItemToList = () => {
    setList((oldVals) => [...oldVals, inputVal]);
    setInputVal('');
  };

  return (
    <View className="flex-1 py-16 px-4 bg-white">
      <Text className="text-3xl font-bold">Let's get packing</Text>
      <View className="flex flex-row pt-8">
        <TextInput
          placeholder="Add Item"
          className="bg-white pl-2 w-48 shadow-sm rounded-l-md "
          value={inputVal}
          onChangeText={(text) => setInputVal(text)}
        />
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-r-md"
          onPress={addItemToList}
        >
          <Text className="text-white">Add</Text>
        </TouchableOpacity>
      </View>

      {list.map((item, index) => (
        <View key={index}>
          <Text>{item}</Text>
        </View>
      ))}

      <TouchableOpacity className="flex-1 flex flex-col justify-end items-center">
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
