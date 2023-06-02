import React from 'react';
import { StyleSheet, Text, View,FlatList,TextInput,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Places({navigation}){
    const PLACES = [
        {name:'banani',Latitude:23.793993,Longitude:90.404272},
        {name:'mirpur',Latitude:23.822350,Longitude:90.365417},
        {name:'uttara',Latitude:23.873751,Longitude:90.396454},
        {name:'mohammadpur',Latitude:23.7662,Longitude:90.3589},
        {name:'dhanmondi',Latitude:23.7461,Longitude:90.3742},
        {name:'badda',Latitude:23.7805,Longitude:90.4267},
        {name:'shantiNagar',Latitude:23.7382,Longitude:90.4143},
    ]
    
    const [enteredValue, SetenteredValue] = React.useState('');
    const [latitude,Setlatitude] = React.useState(0)
    const [longitude,Setlongitude] = React.useState(0)

    function HandleInput(input){
        if (/[^a-zA-Z]/.test(input)){
            const coordinates = input.split(",")
            Setlatitude(parseFloat(coordinates[0]))
            Setlongitude(parseFloat(coordinates[1]))
            console.log(coordinates[0],coordinates[1])
            
        }
          SetenteredValue(input)
      }
      function Search(){
          
          if(!isNaN(latitude) && !isNaN(longitude)){
            console.log("Searching..........")
            console.log(latitude+","+longitude)
            navigation.navigate('CustomWeather',
                {Latitude:latitude,
                 Longitude:longitude })
        }
      }

      const renderItem = ({item})=>{
        const area = item.name
        
        return (
            <TouchableOpacity 
            activeOpacity = {0.7} 
            onPress = {()=>navigation.navigate('CustomWeather',
                {Latitude:item.Latitude,
                 Longitude:item.Longitude }
            )}
            style = {{borderColor:'grey',borderBottomWidth:1}}>
                <View style = {{flexDirection:'row',width:'95%',justifyContent:'space-between',paddingTop:20,paddingBottom:20}}>
                    <Text style = {{color:'#fff',fontSize:20}}>{area[0].toUpperCase() + area.slice(1)}</Text>
                    <FontAwesome name="chevron-right" size={16} color="#fff" />
                </View>
            </TouchableOpacity>
        )
      }
//**************************************************************************************** */
//**************************************************************************************** */

    return (
        <View style={styles.centeredView}>
                    <View style = {{flexDirection:'row',width:'93%',justifyContent:'space-between',alignItems:'center',alignSelf:'center',marginTop:10}}>
                        <FontAwesome name="search" size={20} color="#fff" style = {{position:'absolute',marginLeft:10}}/>
                        <TextInput style = {{...styles.input,...{width:'70%',fontSize:13}}}
                            placeholder = 'Enter city name or enter co-ordinates'
                            placeholderTextColor = 'grey'
                            autoCorrect = {false}
                            returnKeyType = 'search'
                            onChangeText = {HandleInput}
                            value = {enteredValue}
                            onSubmitEditing = {Search}                            
                        />
                            
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style = {{marginLeft:-10}}>
                                <Text style = {{color:'red',fontSize:18}}>Cancel</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <FlatList
                        data = {PLACES}
                        renderItem={renderItem}
                        keyExtractor = {(item,index) => {
                            return index.toString()}}
                        key = {Math.random().toString()}    
                    />
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4F4D4D',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      
    },
    input:{
        height:40,
        margin:30,
        marginLeft:40,
        padding:10,
        borderColor:'#fff',
        width:'80%',
        borderWidth:1,
        borderRadius:20,
        marginVertical:10,
        color:'#fff'
    },
    centeredView: {
        flex:1,
        backgroundColor:'rgba(71, 70, 70,1)',
        paddingTop:30,
      },
  });