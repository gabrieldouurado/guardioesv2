import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')
export default class App extends Component {

//   constructor(props){
//     super(props)
//     this.state = {
//       region: {
//         latitude: null,
//         longitude: null,
//         latitudeDelta: null,
//         longitudeDelta: null
//       },
//       isLoading: true,
//     }
//   }


//   calcDelta(lat, lon, accuracy){
//     const ondeDegreeOfLongitudInMeters = 111.32;
//     const circumference = (40075 / 360)

//     const latDelta = accuracy*(1 / (Math.cos(lat)*circumference))
//     const lonDelta = (accuracy / ondeDegreeOfLongitudInMeters)
//     this.setState({
//       region: {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//         latitudeDelta: latDelta,
//         longitudeDelta: lonDelta
//       }
//     })
//   }

//   componentDidMount(){
//     return fetch('https://guardianes.centeias.net/surveys/get')
//       .then((response) => response.json())
//       .then((responseJson) => {

//         this.setState({
//           isLoading: false,
//           dataSource: responseJson.data,
//         }, function(){

//         });

//       })
//       .catch((error) =>{
//         console.error(error);
//       });

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude
//         const lon = position.coords.longitude
//         const accuracy = position.coords.accuracy
        
//         this.calcDelta(lat, lon, accuracy)
//       }
//     )
//   };
  
//   marker(){
    
//     return {
//       latitude: this.state.dataSource.data.lat,
//       longitude: this.state.dataSource.data.lon,
//     }
//   }

  render() {
    <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
  }

//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }

//     return (  
//       <View style={styles.container}>
//       <View style={styles.margTop}>
//       </View>
//         {this.state.region.latitude ?
//          <MapView 
//             style = {styles.map}
//             initialRegion = {this.state.region}
//           >
            
//             <MapView.Marker 
//               coordinate={this.marker()}
//               title = "I'm here"
//               description = "My report"
//             />  
//         </MapView> : null}
//       </View>
//     );
// }}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//   },
//   map: {
//     flex:1,
    
//   },
//   margTop: {
//     backgroundColor: '#0084b4',
//     height: 50,
    
//   },
// });
}