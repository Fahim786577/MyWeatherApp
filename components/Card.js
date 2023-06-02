import React from 'react';
import { StyleSheet,View } from 'react-native';
export default function Card (props){
    return (
        <View style = {{...styles.card,...props.style}}>
            {props.children}
        </View>
    );

};

const styles = StyleSheet.create({
    card: {
      marginTop:20,
      backgroundColor:'rgba(225, 225, 214, 0.2)',
      flexDirection:"row",
      justifyContent:'flex-start',
      alignContent:'space-between',
      borderRadius:20
    },
  });
  