import * as SecureStore from 'expo-secure-store';
import { LIST_SECURE_STORE_KEY } from './useAuth';

export const getData = async () => {
  const myData = await SecureStore.getItemAsync(LIST_SECURE_STORE_KEY);
  if (myData) {
    const parsedData = await JSON.parse(myData);
    return parsedData;
  }
};
