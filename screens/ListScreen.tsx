import React, { useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  fetchUser,
  SECURE_STORE_KEY,
  LIST_SECURE_STORE_KEY,
} from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { decodedType } from '../types';
import { userContext } from '../utils/userContext';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListScreen() {
  const navigation = useNavigation();
  const [inputVal, setInputVal] = useState('');
  const [list, setList] = useState<string[]>([]);
  const { user, setUser } = useContext(userContext);

  const appleLogout = async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
    setUser(undefined);
  };
  const addItemToList = () => {
    setList((oldVals) => [...oldVals, inputVal]);
    setInputVal('');
  };

  const deleteItem = (item: string) => {
    setList((oldVals) => oldVals.filter((name) => name !== item));
  };
  const handleSubmit = async () => {
    //TODO: SECURE STORAGE OR SOMETHING
    await SecureStore.setItemAsync(LIST_SECURE_STORE_KEY, JSON.stringify(list));
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="flex-1 pt-24 pb-8 px-4 bg-white">
      {/* <TouchableOpacity
        className="pb-4"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-blue-500">Go Back</Text>
      </TouchableOpacity> */}
      {/* <Text className="text-3xl font-bold">Let's get packing</Text> */}
      <View className="flex flex-row pt-8">
        <TextInput
          placeholder="Add Item"
          className="bg-white flex-1 pl-2  shadow-sm rounded-l-md "
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

      <View className="my-8">
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="my-2 py-2 px-2 rounded-lg bg-white shadow-sm"
            onPress={() => deleteItem(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1 flex flex-col justify-end items-center">
        <TouchableOpacity
          className="bg-blue-500 py-2 px-8 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
