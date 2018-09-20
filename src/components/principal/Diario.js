import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import { Calendar} from 'react-native-calendars';
import moment from 'moment';
import { Avatar } from 'react-native-elements'


let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let h = data.getHours();

let today = y + "-" + m + "-" + d + "T" + h;

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class Diario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      x: 0,
      datesMarked: {

      },
      pic: "http://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg"
    };
  }
  static navigationOptions = {
    title: 'Diário Da Saúde',
  }


  componentDidMount() {
    return fetch('https://guardianes.centeias.net/user/surveys/5b6db008abbd4916002b97f0', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error === false) {
          this.setState({ data: responseJson.data });
          this.defineMarkedDates()
          this.GetUserData()
        }
      })


  }


  GetUserData = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    this.setState({ UserID: UserID })
    let userName = await AsyncStorage.getItem('userName');
    this.setState({ userName: userName });
  }

  defineMarkedDates = () => {

    let dataAux = this.state.data
    let markedDateNo = []
    let markedDate = []

    dataAux.map((Survey, index) => {
      if (Survey.no_symptom === 'Y') {
        markedDateNo.push(Survey.createdAt.split('T')[0]);
      }
      else {
        markedDate.push(Survey.createdAt.split('T')[0]);

      }
    })

    let totalReports = (markedDateNo.length + markedDate.length)
    let GoodPercent = ((markedDateNo.length / totalReports) * 100).toFixed(2)
    let BadPercent = ((markedDate.length / totalReports) * 100).toFixed(2)

    this.setState({
      GoodPercent: GoodPercent,
      BadPercent: BadPercent,
      totalReports: totalReports
    })

    let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: 'red' } }), {});
    let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: 'blue' } }), {});

    Object.assign(GoodReport, BadReport);

    this.setState({ datesMarked: GoodReport });

  }

  render() {

    return (
      <ScrollView>
        <View style={styles.Top}>
        <View style={styles.UserData}>
          <Avatar
            large
            rounded
            source={{ uri: this.state.pic }}
            activeOpacity={0.7}
          />
          <Text style={styles.UserName}>
            {this.state.userName}
          </Text>
        </View>
        <View style={LeftTop}>
          <Text style={styles.NumReports}> {this.state.totalReports} Participações </Text>
          <View style={styles.GoodData}>
            <Text>{this.state.GoodPercent}% Mal</Text>
          </View>
        </View>
        </View>
        <Calendar
          current={_today}
          markedDates={this.state.datesMarked}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  UserData: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  UserName: {
    fontFamily: 'poiretOne',
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 10,
  },
  NumReports:{
    fontSize: 32,
    fontWeight: '400',
  },
  Top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LeftTop: {
    flexDirection: 'column',
  }
});
export default Diario;