import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
const MapViewScreen = () => {
  const navigation = useNavigation();

  TaskManager.defineTask('MyTask', ({ data: {}, error }: any) => {
    if (error) {
      console.log('an error occured');
      // check `error.message` for more details.
      return;
    }
    console.log('Received new locations');
  });

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync('MyTask', {
          accuracy: Location.Accuracy.Balanced,
        });
      } else {
        console.log('Background not granted');
      }
    } else {
      console.log('foreground not granted');
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View className="flex-1 flex">
      <MapView className="w-full h-full absolute" showsUserLocation={true} />
      <TouchableOpacity
        className="flex items-center my-16 mx-4 bg-white w-20 py-2 rounded-full"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-blue-500">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapViewScreen;
