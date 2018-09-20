import React, { Component } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let h = data.getHours();

let today = y + "-" + m + "-" + d + "T" + h;

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class requestTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        x: 0, 
        datesMarked: {

        }
    };
  }


  componentDidMount(){
    return fetch('https://guardianes.centeias.net/user/surveys/5b6db008abbd4916002b97f0', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error === false) {
            this.setState({data: responseJson.data});
          } else {
            alert('NOT OK')
          }
      })

      this.defineMarkedDates();
}


defineMarkedDates= () => {

    let dataAux = this.state.data
    let markedDateNo = []
    let markedDate = []

    dataAux.map((Survey , index) => {
      if (Survey.no_symptom === 'Y') {
          markedDateNo.push(Survey.createdAt.split('T')[0]);
      }
      else{
          markedDate.push(Survey.createdAt.split('T')[0]);
      }
  })
  this.setState({markedDateNo: markedDateNo})

  let obj = markedDate.reduce((c, v) => Object.assign(c, {[v]: {selected: true, selectedColor: 'blue'}}), {});
  this.setState({ datesMarked : obj});

  alert('ALERTA');
}

  render() {
      
    return (
      <ScrollView>
         <Calendar         
            current={_today}
            markedDates={this.state.datesMarked}
                                
        />
      </ScrollView>
    );
  }
}
export default requestTest;