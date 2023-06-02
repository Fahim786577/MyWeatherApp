import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import ForecastDetails from './ForecastDetails';

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [Locations,setLocations] = useState({});
  //const [timeout, settimeout] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const apiKey = 'c991b5cd0e09b832e15bdcbe15243b5f';

  useEffect(() => {
    const fetchDataWithTimeout = async () => {
      const fetchWeatherData = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
  
          if (status !== 'granted') {
            console.log('Location permission denied');
            return;
          }
  
          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          setLocations({latitude,longitude})
          //console.log(latitude,longitude)
  
          //const response = await axios.get(`http://api.openweathermap.org/data/3.0/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
          //const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`);
          const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,alerts&appid=${apiKey}`
          const forecastResponse = await fetch(forecastURL)
          const forecastResult = await forecastResponse.json()
          //https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}
          //setWeatherData(forecastResult);
          //console.log(forecastResponse);
          console.log(forecastResult);
  
            if (forecastResponse.ok) {
                  setCurrentWeather(forecastResult)
              } else {
                console.log(forecastResponse.message)
              }
  
        } catch (error) {
          console.error(error);
        }
      };  

      // Set the time limit (in milliseconds) for fetching data
      const timeLimit = 5000; // 5 seconds

      const fetchDataPromise = fetchWeatherData();
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve,timeLimit)
      );

      // Race between fetching data and the timeout
      await Promise.race([fetchDataPromise, timeoutPromise]);

      if (isLoading) {
        setIsError(true); // If still loading after timeout, consider it an error
        setIsLoading(false);
      }

    };
    
    fetchDataWithTimeout();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }else{
    if (currentWeather){
      return (
        <View style={styles.container}>
          <ForecastDetails  currentWeather = {currentWeather} currentLocation = {Locations}/>
        </View>
      );
    }

    if (isError) {
      return <Text>Error occurred while fetching data.</Text>;
    }
    
  }
};

export default Weather;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});