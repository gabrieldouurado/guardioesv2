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

 
  componentDidMount() {
    this.GetMonthData();
    console.warn(this.setState.SurveyUser);
  }
  
  GetMonthData = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    this.setState({ UserID: UserID })
    let SurveyUser =  await AsyncStorage.getItem('userSurveys')
    this.setState({ SurveyUser: SurveyUser});
  }

  render() {

  
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
        
      </View>
    );
  }
}
export default diario;