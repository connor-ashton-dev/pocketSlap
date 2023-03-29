import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Router from './components/Router';
import { userContext } from './utils/userContext';
import { decodedType } from './types';
import { fetchUser } from './hooks/useAuth';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState<decodedType | undefined>(undefined);

  const setup = async () => {
    const newUser: decodedType | undefined = await fetchUser();
    setUser(newUser);
  };

  useEffect(() => {
    setup();
  }, []);
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Router'}>
          <Stack.Screen
            name="Router"
            component={Router}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

export default App;
