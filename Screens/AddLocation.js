import React from 'react';
import { StyleSheet, Text, View ,TouchableWithoutFeedback} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
//import filter from 'lodash.filter'

export default function AddLocation ({navigation,route}){
    //const {currentLocation} = route.params
//****************************************************************************************************/
//*****************************************************************************************************/      
    return (
        <View style = {styles.container}>
            <TouchableWithoutFeedback onPress={() =>navigation.navigate('Places') }>
                <View style = {{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:10}}>
                    <FontAwesome name="search" size={20} color="#fff" style = {{position:'absolute',marginLeft:10}}/>
                    <View style = {{...styles.input,...{paddingLeft:20,fontSize:13}}}>
                        <Text style = {{color:'grey'}}>Enter city name or enter co-ordinates</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>        
            
        </View>
    );
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
  });
  