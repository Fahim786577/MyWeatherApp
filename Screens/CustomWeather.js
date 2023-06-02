import React ,{useEffect, useState}from 'react';
import { StyleSheet, Text, View ,TouchableWithoutFeedback,FlatList,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomWeather({ navigation,route}){
    const apiKey = 'c991b5cd0e09b832e15bdcbe15243b5f';
    const {Latitude, Longitude} = route.params
    const Month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const WeekDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const [DataForSevenDays ,setDataForSevenDays ] = React.useState(null);
    const [unitsSystem, setUnitsSystem] = useState('metric');
    
    //console.log(Latitude+" "+Longitude)
    
    useEffect(()=>{
        load(Latitude, Longitude)
    },[unitsSystem]);

    async function load (latitude,longitude){
        try{
            const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,alerts&appid=${apiKey}`            
                const forecastResponse = await fetch(forecastURL)
                const forecastResult = await forecastResponse.json()
                //console.log(forecastResult)
                if (forecastResponse.ok) {
                    //forecastResult['daily']
                    setDataForSevenDays(forecastResult['daily'])
              } else {
                console.log(forecastResponse.message)
              }
                
        }catch(error){
          console.log(error.message)
        }
        
      };

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
        
    }/*name: 'AddLocation',
                params: { post: visibility},
                merge: true,*/

    return (
        <View style = {styles.mainContainer}>
            <TouchableWithoutFeedback onPress ={()=>navigation.goBack()}>
            <View style = {{margin:20,marginTop:50}}>
                <Ionicons name="arrow-back" size={24} color="black" />              
            </View>
            </TouchableWithoutFeedback>

            <FlatList 
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            data = {DataForSevenDays}
            renderItem = {RenderForecast}
            keyExtractor = {(item,index) => {
                return index.toString()}}
            key = {Math.random().toString()}
            />
        </View>
    )
}  
const styles = StyleSheet.create({
    mainContainer :{
        flex:1,      
        backgroundColor:'#4F4D4D'
    },
    DateSummary: {
        alignItems: 'center',
        paddingRight:10,
        marginTop:10
      },
})