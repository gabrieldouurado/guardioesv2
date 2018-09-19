import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit'

class diario extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
    };
  }

 
//   componentDidMount() {
//     this.GetMonthData();
//   }
  
//   GetMonthData = async () => {
//     let UserID = await AsyncStorage.getItem('userID');
//     this.setState({ UserID: UserID })
//     return fetch('https://guardianes.centeias.net/user/calendar/day', {
//         method: 'gET',
//         headers: {
//             user_id: this.state.UserID,
//         }})
//     .then((response) => response.json())
//     .then((responseJson) => {

//       this.setState({
//         isLoading: false,
//         dataSource: responseJson.data,
//       }, function(){

//       });

//     })
//     .catch((error) =>{
//       console.error(error);
//     });
//   }

  render() {
    const data = [
        { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F, legendFontSize: 15' }
      ]
    // if(this.state.isLoading){
    //     return(
    //       <View style={{flex: 1, padding: 20}}>
    //         <ActivityIndicator/>
    //       </View>
    //     )
    //   }
  
    return (
      <View>
        <Calendar
        current={'2012-03-01'}
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
                '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                '2012-05-17': {marked: true},
                '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2012-05-19': {disabled: true, disableTouchEvent: true}
            }}
            />
        
        <PieChart
        chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
            data={data}
            width={220}
            height={220}
            
            accessor="population"
            bgColor="transparent"
            paddingLeft="15"
            />
      </View>
    );
  }
}
export default diario;