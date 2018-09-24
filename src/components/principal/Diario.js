import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Avatar } from 'react-native-elements'
import { imagemBad, imagemGood, imagemFundo } from '../../imgs/imageConst';


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

  async GetUserData() {
    let userID = await AsyncStorage.getItem('userID');
    console.log(userID)
    let userName = await AsyncStorage.getItem('userName');
    let pic = await AsyncStorage.getItem('avatar');
    this.setState({
      userName,
      userID,
      pic
    });
    let url = `https://guardianes.centeias.net/user/surveys/${this.state.userID}`
    return fetch(url
      , {
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
          
        }
      })
  }

  componentWillMount() {
    this.GetUserData()
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
      totalReports: totalReports,
      markedDateNo: markedDateNo.length,
      markedDate: markedDate.length
    })

    let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#64C2D4' } }), {});
    let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#C19036' } }), {});

    Object.assign(GoodReport, BadReport);

    this.setState({ datesMarked: GoodReport });

  }

  render() {

    return (
      <ScrollView>
        <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={imagemFundo}>
          <View style={styles.Top}>
            <View style={styles.UserData}>
              <Avatar
                large
                rounded
                source={{ uri: this.state.pic }}
                activeOpacity={0.7}
                style={{borderWidth: 1, borderColor: 'red',}}
              />
              <Text style={styles.UserName}>
                {this.state.userName}
              </Text>
            </View>
            <View style={styles.LeftTop}>
              <Text style={styles.NumReports}> {this.state.totalReports} Participações </Text>
              <View style={styles.GoodData}>
                <Image style={{ width: 35, height: 35, paddingRight: 10 }} source={imagemGood} />
                <View style={styles.columnData}>
                  <Text style={styles.GoodPercent}>{this.state.GoodPercent}% Bem</Text>
                  <Text style={styles.numGood}> {this.state.markedDateNo === 1 ? this.state.markedDateNo + ' informe' : this.state.markedDateNo + ' informes'}</Text>
                </View>
              </View>
              <View style={styles.BadData}>
                <Image style={{ width: 35, height: 35, paddingRight: 10 }} source={imagemBad} />
                <View style={styles.columnData}>
                  <Text style={styles.BadPercent}>{this.state.BadPercent}% Mal</Text>
                  <Text style={styles.numBad}>{this.state.markedDate === 1 ? this.state.markedDate + ' informe' : this.state.markedDate + ' informes'}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.CalendarDate}>
          <View style={styles.ViewCalendario}><Text style={styles.Calendario}>Calendário</Text></View>
          <Calendar
            current={_today}
            markedDates={this.state.datesMarked}
          />
         </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  UserData: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  UserName: {
    fontFamily: 'poiretOne',
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 10,
  },
  NumReports: {
    fontSize: 20,
    fontWeight: '400',
    margin: 10,
  },
  Top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  LeftTop: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  GoodData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  BadData: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2%',
  },
  GoodPercent: {
    fontFamily: 'poiretOne',
    fontSize: 24,
    margin: 10,
  },
  BadPercent: {
    fontFamily: 'poiretOne',
    fontSize: 24,
    margin: 10,
  },
  columnData: {
    flexDirection: 'column',
  },
  numBad: {
    fontFamily: 'poiretOne',
    fontSize: 16,
    color: '#64C2D4',
  },
  numGood: {
    fontFamily: 'poiretOne',
    fontSize: 16,
    color: '#C19036',
  },
  ViewCalendario: {
    backgroundColor: '#C19036',
    alignItems: 'center',
  },
  Calendario: {
    fontFamily: 'poiretOne',
    fontSize: 36,
    fontWeight: '400',

  },
  CalendarDate: {
    marginBottom: 80,
  }
});
export default Diario;