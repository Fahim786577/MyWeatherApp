import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//import WeatherData from '../components/WeatherData'
//import WeatherComponent from '../components/WeatherComponent';
import Weather from '../components/Weather';
import AddLocation from '../Screens/AddLocation';
import SevenDayForecast from '../Screens/SevenDayForecast';
import Settings from '../Screens/Settings';
import CustomWeather from '../Screens/CustomWeather';
import Places from '../Screens/Places';

export default function HomeStack (){
    const Stack = createStackNavigator();
    const SCREENOPTIONS = {
      headerStyle:{
        backgroundColor: '#4F4D4D',
        shadowColor:'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
    },
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WeatherData" component={Weather} 
          options={{
            title:"Home",
            headerShown:false,
            headerTransparent:true,
            
          }}
          />
          
          <Stack.Screen name="AddLocation" component={AddLocation} options={SCREENOPTIONS}/>
          <Stack.Screen name="SevenDayForecast" component={SevenDayForecast} options={SCREENOPTIONS}/>
          <Stack.Screen name="Settings" component={Settings} options={SCREENOPTIONS}/>
          <Stack.Screen name="CustomWeather" component={CustomWeather} options={{
            title:"Forecast",
            headerShown:false,
            headerTransparent:true,
          }}/>

          <Stack.Screen name="Places" component={Places} options={{
            title:"places",
            headerShown:false,
            headerTransparent:true,
          }}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    )

}
