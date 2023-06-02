import React ,{useState}from 'react';
import { 
  StyleSheet, Text, View ,TouchableWithoutFeedback,FlatList,Modal} from 'react-native';

import Card from '../components/Card';
export default function Settings ({ navigation,route}){
  const [modalVisible, setModalVisible] = useState(false);
  const [click, setClick] = useState(null);
  const [Data,setData] = useState(null)
  

  const Temparature = ['°C','°F']
  const Pressure = ['hPa','mbar','mmHg','atm']
  const WindSpeed = ['m/s','km/h','mile/h']  
  
  const RenderUnits = ({item,index}) =>{
    
    return (
      <TouchableWithoutFeedback onPress = {() =>{
        setClick(index)
      }}> 
      <View  style = {{padding:10,backgroundColor:index === click? 'red':'transparent'}}>
        <Text style={styles.UnitTextStyle}>{item}</Text>      
      </View>
    </TouchableWithoutFeedback>
    );
  }
    
    
//*********************************************************************************** */
//*********************************************************************************** */
    return (
        <View style = {styles.container}>
          {/* Temparature */}
          
          <Card style = {styles.UnitStyle}>
            <View style = {{width:'100%'}}>
            <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
                     >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FlatList 
                    data = {Data}
                    renderItem = {RenderUnits}
                    keyExtractor = {(item,index) => {
                      return index.toString()}}
                    key = {Math.random().toString()} 
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>   
          </Modal>
                <TouchableWithoutFeedback onPress = {()=>{
                  setModalVisible(true)
                  setData(Temparature)
                  }}>
                  <View>
                    <Text style = {{color:'#fff',fontSize:20,margin:20}}>Temparature units </Text>
                  </View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress = {()=>{
                  setModalVisible(true)
                  setData(Pressure)
                }}>
                  <View>
                    <Text style = {{color:'#fff',fontSize:20,margin:20}}>Pressure units</Text>
                  </View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress = {()=>{
                  setModalVisible(true)
                  setData(WindSpeed)
                }}>
                  <View>
                    <Text style = {{color:'#fff',fontSize:20,margin:20}}>Wind Speed units</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
          </Card> 

          <Card style = {styles.AboutStyle}>
            <View style = {{width:'100%'}}>
              <Text style = {{color:'#fff',fontSize:20,margin:20}}>Feedback </Text>
              <Text style = {{color:'#fff',fontSize:20,margin:20}}>About Us</Text>
            </View>
          </Card> 
        </View>
    );//#474646
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4F4D4D',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    UnitStyle :{
      backgroundColor:'rgba(0, 0, 0, 0.2)',
      width:'95%',
      height:220,
      marginLeft:9
    },
    AboutStyle:{
      backgroundColor:'rgba(0, 0, 0, 0.2)',
      width:372,
      height:150,
      marginLeft:9,
    },
    centeredView: {
      flex:1,
      backgroundColor:'rgba(71, 70, 70, 0.6)'
    },
    modalView: {
      margin: 40,
      backgroundColor: "#4F4D4D",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textStyle: {
      color:'#fff',
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color:'#fff'
    },
    UnitTextStyle:{
      color:'#fff',
      fontSize:20
    },

  });
  