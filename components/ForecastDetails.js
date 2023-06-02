import React,{useRef} from 'react';
import { Animated,StyleSheet, Text, View,Image,ImageBackground,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import { Feather } from '@expo/vector-icons';
//import { useFonts } from 'expo-font';

export default function ForecastDetails({currentWeather,currentLocation}){
    
      
    const navigation = useNavigation();
    const {sunset, sunrise,wind_speed} = currentWeather.current;
    const {weather:[values]} = currentWeather['hourly']['0']
    const DataForSevenDays = currentWeather['daily']
    //console.log(currentWeather.current)
    const units = {'tempUnit':'°C','pressureUnit':'hPa','windSpeed':'m/s'}
    const backgrounds = {
        'Rain':require('../assets/weather-animations/rain.gif'),
        'Drizzle':require('../assets/weather-animations/rain.gif'),
        'Thunderstorm':require('../assets/weather-animations/thunderstorm.gif'),
        'Clouds':require('../assets/weather-animations/clouds.gif'),
        'Haze':require('../assets/weather-animations/fog.gif'),
        'Fog':require('../assets/weather-animations/fog.gif')
}   
    const time = (timestamp) =>{
        const Time = new Date(timestamp*1000)
        return Time.getHours() + ":" + Time.getMinutes()+"0"
    };
    const weatherCondition = () => {
        const sunsetTime = new Date(sunset*1000);
        const sunriseTime = new Date(sunrise*1000);
        const today = new Date();

        const sunsetTimeinSeconds = sunsetTime.getHours()*3600 + sunsetTime.getMinutes()*60 +  sunsetTime.getSeconds() 
        const sunriseTimeinSeconds = sunriseTime.getHours()*3600 + sunriseTime.getMinutes()*60 +  sunriseTime.getSeconds() 
        const CurrenttimeinSeconds = today.getHours()*3600 + today.getMinutes()*60 +  today.getSeconds() 

        if ((CurrenttimeinSeconds > sunsetTimeinSeconds) || (CurrenttimeinSeconds < sunriseTimeinSeconds)){
            if(values['main'] == 'Clear'){weatherbackground = require('../assets/weather-animations/Clear_night.gif')}
            else if (values['main'] in backgrounds){
                return backgrounds[currentWeather.current['weather'][0]['main']]
            }
                
        }else{
            if(values['main'] == 'Clear'){weatherbackground = require('../assets/weather-animations/clear.gif')}
            else if (values['main'] in backgrounds){
                return backgrounds[currentWeather.current['weather'][0]['main']]
            }
        }
    }
    const RenderHourlyForeCast = ({item}) =>{
        const iconURL = "http://openweathermap.org/img/wn/"+item.weather['0']['icon']+"@2x.png";
        return (
            <View style = {{paddingRight:30,paddingLeft:8,justifyContent:'space-between',alignItems:'center'}}>
                <Text style = {{fontSize:15,color:'#fff'}}>{time(item.dt)}</Text>
                <Image style = {{width:40,height:50}} source = {{uri:iconURL}}/>    
                <View style = {{flexDirection:'row',marginTop:-5,marginBottom:5}}>
                    <Text style = {{fontSize:15,color:'#fff'}}> {Math.floor(item.temp)}</Text>
                    <Text style={{fontSize: 10,color:'#fff'}}>{units['tempUnit']}</Text>
                </View>
            </View>
        )
    }
    const urlImage = (image)=>{
        return {uri :"http://openweathermap.org/img/wn/"+image+"@2x.png"};
    }
    
/**********************************END OF FUNCTIONS**********************************************/
/************************************************************************************************/

    const scrollY = useRef(new Animated.Value(0)).current;  
    const imageURL = "http://openweathermap.org/img/wn/"+currentWeather.current['weather'][0]['icon']+"@2x.png";
    //const imageURL = "http://openweathermap.org/img/wn/10d@2x.png"
    const weatherbackground = weatherCondition()
    

    const scale = scrollY.interpolate({
        inputRange:[-1,0,50,60,65,70,75,80,85,90],
        outputRange:[1,1,0.8,0.7,0.6,0.5,0.4,0.1,0,0]
    });
//
    return (
        <View style = {styles.container}>
            <ImageBackground source = {weatherbackground} resizeMode="cover" style={styles.image}/>
            {/* Header */}
            <View style = {styles.headerContainer}>   
                <TouchableOpacity activeOpacity = {0.5} onPress = {()=>navigation.navigate('AddLocation')}>
                    <Feather name="plus-circle" size={24} color="black" />
                </TouchableOpacity>
                <Text style = {{fontSize:25}}>Mohammadpur</Text>
                <TouchableOpacity activeOpacity = {0.5} onPress = {()=>navigation.navigate('Settings')}>
                    <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Animated.FlatList 
                style={{backgroundColor:'transparent'}}
                showsVerticalScrollIndicator = {false}
                onScroll = {Animated.event(
                    [{nativeEvent:{contentOffset:{y:scrollY}}}],
                    {useNativeDriver:true,duration: 10000},
                )}          
                ListHeaderComponent = {
                    
                <>      
                        <Animated.View style = {{marginTop:80,marginBottom:30,justifyContent:'center',alignItems:'center', 
                        transform:[{scale}],
                        opacity:scrollY.interpolate({
                            inputRange:[-1,0,50,60,65,70,75,80,85,90],
                            outputRange:[1,1,0.8,0.7,0.6,0.5,0.4,0.1,0,0]
                        })
                        }}>
                                <Image style = {styles.iconStyle} source = {{uri:imageURL}}/>    
                                <View style = {{flexDirection:'row'}}>
                                    <Text style = {{fontSize:90,marginTop:-30,color:'#fff'}}> {Math.floor(currentWeather.current['temp'])}</Text>
                                    <Text style={{fontSize: 20, lineHeight: 25,color:'#fff'}}>{units['tempUnit']}</Text>
                            </View>
                                <Text style = {{fontSize:25,color:'#fff'}}>
                                {currentWeather.current['weather'][0]['description'][0].toUpperCase() + currentWeather.current['weather'][0]['description'].slice(1)}
                                </Text>
                        </Animated.View>
                        
                        {/*7 Days ForeCast portion*/}
                        <TouchableOpacity activeOpacity = {0.6} style = {styles.ButtonStyle} 
                        onPress = {() => navigation.navigate('SevenDayForecast',DataForSevenDays)}>

                            <Text style = {{color:'#fff',fontSize:20}} >7 Day Forecast</Text>
                        </TouchableOpacity>
                        
                        {/*Today, Tomorrow, Next Day*/}
                        <View style = {{marginTop:15}}>
                            <View style = {{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                                <Text style = {styles.threeDaysTextStyle}>Today - {DataForSevenDays[0]['weather']['0']['description']}</Text>
                                <Image style = {{width:50,height:60,marginLeft:8}} source = {urlImage(DataForSevenDays[0]['weather']['0']['icon'])}/>
                                <Text style = {{...styles.threeDaysTextStyle,...{position:'absolute',marginLeft:300}}}>{Math.floor(DataForSevenDays[0]['temp']['max'])}/{Math.floor(DataForSevenDays[0]['temp']['min'])} °C</Text>
                            </View>

                            <View style = {{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                                <Text style = {styles.threeDaysTextStyle}>Tomorrow - {DataForSevenDays[1]['weather']['0']['description']}</Text>
                                <Image style = {{width:50,height:60,marginLeft:8}} source = {urlImage(DataForSevenDays[1]['weather']['0']['icon'])}/>
                                <Text style = {{...styles.threeDaysTextStyle,...{position:'absolute',marginLeft:300}}}>{Math.floor(DataForSevenDays[1]['temp']['max'])}/{Math.floor(DataForSevenDays[1]['temp']['min'])} °C</Text>
                            </View>

                            <View style = {{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                                <Text style = {styles.threeDaysTextStyle}>Next day - {DataForSevenDays[2]['weather']['0']['description']}</Text>
                                <Image style = {{width:50,height:60,marginLeft:8}} source = {urlImage(DataForSevenDays[2]['weather']['0']['icon'])}/>
                                <Text style = {{...styles.threeDaysTextStyle,...{position:'absolute',marginLeft:300}}}>{Math.floor(DataForSevenDays[2]['temp']['max'])}/{Math.floor(DataForSevenDays[2]['temp']['min'])} °C</Text>
                            </View>

                        {/*Hourly ForeCast portion*/}
                        </View>
                        <View style = {{marginTop:15}}>
                            <FlatList 
                                data = {currentWeather['hourly']}
                                renderItem = {RenderHourlyForeCast}
                                horizontal = {true}
                                showsHorizontalScrollIndicator =  {false}
                                keyExtractor = {(item,index) => {
                                    return index.toString()}}
                                key = {Math.random().toString()}    
                            
                            />
                        </View>

                         {/*Card portion*/}

                        <Card style = {{width:375,height:300,marginLeft:8,marginBottom:10}}>
                                {/*Left Portion*/}
                                <View style = {{height:'80%',marginTop:30,margin:10,marginLeft:30,justifyContent:'space-between',alignContent:'center'}}>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>Humidity</Text>
                                        <Text style={styles.airInfoText}>{currentWeather.current['humidity']}%</Text>
                                    </View>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>Pressure</Text>
                                        <Text style={styles.airInfoText}>{currentWeather.current['pressure']}{units['pressureUnit']}</Text>
                                    </View>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>Speed</Text>
                                        <Text style={styles.airInfoText}>{wind_speed}{units['windSpeed']}</Text>
                                    </View>
                                </View>

                                {/*Right Portion*/}
                                <View style = {{height:'80%',marginTop:30,margin:10,marginLeft:65,justifyContent:'space-between',alignContent:'center'}}>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>Feels Like</Text>
                                        <Text style={styles.airInfoText}>{Math.floor(currentWeather.current['feels_like'])}°C</Text>
                                    </View>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>Cloudiness</Text>
                                        <Text style={styles.airInfoText}>{currentWeather.current['clouds']}%</Text>
                                    </View>
                                    <View style = {styles.airInfoContainer}>
                                        <Text style = {{color:'#fff'}}>UVI</Text>
                                        <Text style={styles.airInfoText}>{currentWeather.current['uvi']}</Text>
                                    </View>
                                </View>
                        </Card>
                        
                </>
                }      
                ListFooterComponent = {
                    <>
                        <View style = {{flexDirection:'row',alignItems:'center',width:'100%',paddingLeft:80,marginTop:-8,paddingBottom:10}}>
                            <Text style = {{fontSize:13,color:'#fff'}}>Data provided by     </Text>
                            <Image style = {{width:80,height:35}} source = {require('../assets/openWeatherAssetlogo2.png')}/> 
                        </View>
                    </>
                }
            />    
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    image: {
        height:'100%',
        width:'100%',
        position:'absolute',
        
      },
      iconStyle:{
        width:100,
        height:110
      },
      weatherContainer :{
        position:'absolute',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:150,
      },
      airInfoText:{
        fontSize:25,        
        color:'#fff'
      },
      airInfoContainer:{
        marginBottom:10,
        alignItems:'center',
      },
      threeDaysTextStyle : {
        fontSize:18,
        color:'#fff', 
      },
      ButtonStyle: {
        flexDirection:'row',
        backgroundColor:'rgba(225, 225, 214, 0.4)',
        padding:10,
        width:290,
        marginLeft:50, 
        borderRadius:30,
        justifyContent:'center',

      },
      headerContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"flex-end",
        width:'95%',
        height:80,
        position:'absolute',
        zIndex:100
      },
  });
  