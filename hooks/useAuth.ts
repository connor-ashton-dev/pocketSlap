import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { decodedType } from '../types';
export const SECURE_STORE_KEY = 'pocketSlap-apple-credential';

export const fetchUser = async () => {
  const user = await SecureStore.getItemAsync(SECURE_STORE_KEY);
  if (user !== null) {
    const parsedUser = await JSON.parse(user);
    const decodedUser: decodedType = await jwtDecode(parsedUser.identityToken);
    return decodedUser;
  } else {
    return undefined;
  }
};
