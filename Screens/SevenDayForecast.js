import React from 'react';
import { StyleSheet, Text, View,FlatList ,Image} from 'react-native';

export default function SevenDayForecast ({navigation,route}){
    const forecastData = route.params
    const Month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const WeekDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const RenderForecast = ({item})=>{
        const Day = new Date(item['dt']*1000)
        const iconURL = "http://openweathermap.org/img/wn/"+item.weather['0']['icon']+"@2x.png";
        return(
            <View style = {styles.DateSummary}> 
                <Text style = {{fontSize:15,color:'#fff'}}>  {WeekDay[Day.getDay()]}</Text>
                <Text style = {{fontSize:12,color:'#fff'}}>  {Month[Day.getMonth()]} {Day.getDate()}</Text>
                <Image style = {{width:40,height:50}} source = {{uri:iconURL}}/>
                <Text style = {{fontSize:12,color:'#fff'}}>  {Math.floor(item['temp']['max'])}°C</Text>
                <View style = {{marginTop:50}}>
                    <Image style = {{width:40,height:50}} source = {{uri:iconURL}}/>
                    <Text style = {{fontSize:12,color:'#fff'}}>  {Math.floor(item['temp']['min'])}°C</Text>
                </View>
            </View>
        );
        
    }
    return (
        <View style = {styles.container}>
            <FlatList 
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            data = {forecastData}
            renderItem = {RenderForecast}
            keyExtractor = {(item,index) => {
                return index.toString()}}
            key = {Math.random().toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    DateSummary: {
      alignItems: 'center',
      paddingRight:10,
      marginTop:10
    },
    container:{
        height:'100%',
        backgroundColor: '#4F4D4D',
      }
  });
  