import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import axios from "axios";
import { useEffect, useState } from 'react';

export default function App() {
 const [weatherData,setweather]= useState('')
 const [location, setLocation] = useState(0);
useEffect (()=>{
  if(location==='')
  {
    setweather('')
  }
  weather()
},[location])
  const weather=()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4909b43ee661a8b4574521340ac2c093`)
    .then(function (response) {
     setweather(response.data.main)
     })
     .catch(function (error) {
       console.log(error);
     });
  }
  
  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
    <Text style={styles.heading}>Search for Specific Location</Text>
    <TextInput
    style={styles.textinput}
    placeholder="Enter city name"
    onChangeText={text => setLocation(text)}
    value={location}
  />
  </View>
  <ScrollView style={styles.scrollViewContainer}>
 { weatherData.feels_like && <View style={styles.temperature}>
  <Text>Feels Like</Text>
  <Text style={styles.currentTemp}>{weatherData.feels_like}</Text>
  </View>}
  { weatherData.humidity && <View style={styles.temperature}>
  <Text>Humidity</Text>
  <Text style={styles.currentTemp}>{weatherData.humidity}</Text>
  </View>}
 {weatherData.pressure && <View style={styles.temperature}>
  <Text>Pressure</Text>
  <Text style={styles.currentTemp}>{weatherData.pressure}</Text>
  </View>}
  {weatherData.temp && <View style={styles.temperature}>
  <Text>Temperature</Text>
  <Text style={styles.currentTemp}>{weatherData.temp}</Text>
  </View>}
  {weatherData.temp_max && <View style={styles.temperature}>
  <Text>Maximum Temperature</Text>
  <Text style={styles.currentTemp}>{weatherData.temp_max}</Text>
  </View>}
  {weatherData.temp_min && <View style={styles.temperature}>
  <Text>Minimum Temperature</Text>
  <Text style={styles.currentTemp}>{weatherData.temp_min}</Text>
  </View>}
  </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer:{
    marginTop:50
  },
  scrollViewContainer:{
 width:'100%'
  },
  heading:{
  fontWeight:'400',
  fontSize:20,
 margin:20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle:'italic'
  },
  temperature:{
    margin:40,
    width:'80%',
     height:30
  },
  textinput:{
  alignItems:'center',
  height:30,
  margin:20,
  borderColor:'red',
  borderWidth:2,
  borderRadius:8,
  alignItems:'center',
  padding:8
   
  },
  currentTemp:{
    justifyContent:'center',
    fontWeight:'bold',
    backgroundColor:'cyan',
    height:40,
  
    
    borderRadius:10,


    
  }
});
