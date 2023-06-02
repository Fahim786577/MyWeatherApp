import React, { useEffect,useState } from 'react';
import { View, Text, PermissionsAndroid,StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import axios from 'axios';

const API_KEY = 'c991b5cd0e09b832e15bdcbe15243b5f';
const OneCall = 'https://api.openweathermap.org/data/3.0/onecall?'
const LAT = '23.7747954'
const LON  = '90.3465982'
const WeatherComponent = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');
  useEffect(() => {
    fetchWeatherData();
  }, [unitsSystem]);

  /*const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(latitude, longitude);
          },
          error => {
            console.error('Error getting current location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };*/
  

  const fetchWeatherData = async () => {
    const apiKey = API_KEY; // Replace 'YOUR_API_KEY' with your actual API key 23.7747954,90.3465982
    const apiUrl = `${OneCall}lat=${LAT}&lon=${LON}&units=${unitsSystem}&exclude=minutely,alerts&appid=${API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      console.log('Weather data:', weatherData);
      setCurrentWeather(weatherData);
      // Handle the weather data here (e.g., set it to state or perform any desired operations)
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error if API request fails
    }
  };

  return (
    <View style={styles.container}>
      <Text>Weather Component</Text>
      {console.log(currentWeather)}
      {/* Render weather data or other components based on your needs */}
    </View>
  );
};

export default WeatherComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});