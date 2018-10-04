import React, { Component } from 'react';
import {
  View, Text, AsyncStorage, ScrollView, StyleSheet, Image, ImageBackground,
  processColor, LayoutAnimation, AppRegistry
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Avatar } from 'react-native-elements'
import { imagemBad, imagemGood, imagemFundo } from '../../imgs/imageConst';
import { Dimensions } from 'react-native'
import update from "immutability-helper"
import { LineChart } from "react-native-charts-wrapper";

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";

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
      pic: "http://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg",
      BadData: [],
      BadPlot: [{y:0, x:0, marked: ""}],
      NoPlot: [{y:0, x:0, marked: ""}]
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  static navigationOptions = {
    title: 'Diário Da Saúde',
  }

  async GetUserData() {
    let userID = await AsyncStorage.getItem('userID');
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

  componentDidMount() {
    this.GetUserData();
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
      NummarkedDateNo: markedDateNo.length,
      NummarkedDate: markedDate.length,
      markedDate: markedDate,
      markedDateNo: markedDateNo,
    })

    let BadReport = markedDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#64C2D4' } }), {});
    let GoodReport = markedDateNo.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: '#C19036' } }), {});

    Object.assign(GoodReport, BadReport);

    this.setState({ datesMarked: GoodReport });
    this.ChartData();
  }

  ChartData = () => {
    let badData = this.state.markedDate;
    let NoSymptomData = this.state.markedDateNo
    let BadDataAux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let NoDataAux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    badData.map((data, index) => {
      // YYYY-MM-DD
      switch (data.split("-")[1]) {
        case "01":
          BadDataAux[0]++
          break;
        case "02":
          BadDataAux[1]++
          break;
        case "03":
          BadDataAux[2]++
          break;
        case "04":
          BadDataAux[3]++
          break;
        case "05":
          BadDataAux[4]++
          break;
        case "06":
          BadDataAux[5]++
          break;
        case "07":
          BadDataAux[6]++
          break;
        case "08":
          BadDataAux[7]++
          break;
        case "09":
          BadDataAux[8]++
          break;
        case "10":
          BadDataAux[9]++
          break;
        case "11":
          BadDataAux[10]++
          break;
        case "12":
          BadDataAux[11]++
          break;
      }
    })
    var BadPlotAux = [
      { y: BadDataAux[0], x: 0, marked: 'No mês de Janeiro tivemos ' + BadDataAux[0] },
      { y: BadDataAux[1], x: 1, marked: 'No mês de Fevereiro tivemos ' + BadDataAux[1]  },
      { y: BadDataAux[2], x: 2, marked: 'No mês de Março tivemos ' + BadDataAux[2]   },
      { y: BadDataAux[3], x: 3, marked: 'No mês de Abril tivemos ' + BadDataAux[3]   },
      { y: BadDataAux[4], x: 4, marked: 'No mês de Maio tivemos ' + BadDataAux[4]   },
      { y: BadDataAux[5], x: 5, marked: 'No mês de Junho tivemos ' + BadDataAux[5]   },
      { y: BadDataAux[6], x: 6, marked: 'No mês de Julho tivemos ' + BadDataAux[6]   },
      { y: BadDataAux[7], x: 7, marked: 'No mês de Agosto tivemos ' + BadDataAux[7]   },
      { y: BadDataAux[8], x: 8, marked: 'No mês de Setembrom tivemos ' + BadDataAux[8]   },
      { y: BadDataAux[9], x: 9, marked: 'No mês de Outubro tivemos ' + BadDataAux[9]   },
      { y: BadDataAux[10], x: 10, marked: 'No mês de Novembro tivemos ' + BadDataAux[10]   },
      { y: BadDataAux[11], x: 11, marked: 'No mês de Dezembro tivemos ' + BadDataAux[11]   }]

      NoSymptomData.map((data, index) => {
        // YYYY-MM-DD
        switch (data.split("-")[1]) {
          case "01":
            NoDataAux[0]++
            break;
          case "02":
            NoDataAux[1]++
            break;
          case "03":
            NoDataAux[2]++
            break;
          case "04":
            NoDataAux[3]++
            break;
          case "05":
            NoDataAux[4]++
            break;
          case "06":
            NoDataAux[5]++
            break;
          case "07":
            NoDataAux[6]++
            break;
          case "08":
            NoDataAux[7]++
            break;
          case "09":
            NoDataAux[8]++
            break;
          case "10":
            NoDataAux[9]++
            break;
          case "11":
            NoDataAux[10]++
            break;
          case "12":
            NoDataAux[11]++
            break;
        }
      })

      var NoPlotAux = [
        { y: NoDataAux[0], x: 0, marked: 'No mês de Janeiro tivemos ' + NoDataAux[0] },
        { y: NoDataAux[1], x: 1, marked: 'No mês de Fevereiro tivemos ' + NoDataAux[1]  },
        { y: NoDataAux[2], x: 2, marked: 'No mês de Março tivemos ' + NoDataAux[2]   },
        { y: NoDataAux[3], x: 3, marked: 'No mês de Abril tivemos ' + NoDataAux[3]   },
        { y: NoDataAux[4], x: 4, marked: 'No mês de Maio tivemos ' + NoDataAux[4]   },
        { y: NoDataAux[5], x: 5, marked: 'No mês de Junho tivemos ' + NoDataAux[5]   },
        { y: NoDataAux[6], x: 6, marked: 'No mês de Julho tivemos ' + NoDataAux[6]   },
        { y: NoDataAux[7], x: 7, marked: 'No mês de Agosto tivemos ' + NoDataAux[7]   },
        { y: NoDataAux[8], x: 8, marked: 'No mês de Setembrom tivemos ' + NoDataAux[8]   },
        { y: NoDataAux[9], x: 9, marked: 'No mês de Outubro tivemos ' + NoDataAux[9]   },
        { y: NoDataAux[10], x: 10, marked: 'No mês de Novembro tivemos ' + NoDataAux[10]   },
        { y: NoDataAux[11], x: 11, marked: 'No mês de Dezembro tivemos ' + NoDataAux[11]   }]


    this.setState({ BadData: BadDataAux,
                    BadPlot: BadPlotAux,
                    NoPlot: NoPlotAux});
  }

  render() {
    const AUXdata = this.state.BadData
    const BadplotAux = this.state.BadPlot
    const NoPlotAux = this.state.NoPlot
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
                style={{ borderWidth: 1, borderColor: 'red', }}
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
                  <Text style={styles.numGood}> {this.state.NummarkedDateNo === 1 ? this.state.NummarkedDateNo + ' informe' : this.state.NummarkedDateNo + ' informes'}</Text>
                </View>
              </View>
              <View style={styles.BadData}>
                <Image style={{ width: 35, height: 35, paddingRight: 10 }} source={imagemBad} />
                <View style={styles.columnData}>
                  <Text style={styles.BadPercent}>{this.state.BadPercent}% Mal</Text>
                  <Text style={styles.numBad}>{this.state.NummarkedDate === 1 ? this.state.NummarkedDate + ' informe' : this.state.NummarkedDate + ' informes'}</Text>
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
          <View style={styles.chartView}>
            <View style={styles.ViewCalendario}><Text style={styles.Calendario}>Gráfico</Text></View>


            <LineChart
              style={styles.chart}
              data={{
                dataSets: [
                  {
                    values: BadplotAux,
                    label: "",
                    config: {
                      mode: "CUBIC_BEZIER",
                      drawValues: false,
                      lineWidth: 2,
                      drawCircles: true,
                      circleColor: processColor(petrel),
                      drawCircleHole: false,
                      circleRadius: 5,
                      highlightColor: processColor("trasparent"),
                      color: processColor('#64C2D4'),
                      drawFilled: true,
                      // fillGradient: {
                      //   colors: [processColor("#64C2D4"), processColor("#64C2D4")],
                      //   positions: [0, 0.5],
                      //   angle: 90,
                      //   orientation: "TOP_BOTTOM"
                      // },
                      fillAlpha: 1000,
                      valueTextSize: 15
                    }
                  },

                  {
                    values: NoPlotAux,
                    label: "",
                    config: {
                      mode: "CUBIC_BEZIER",
                      drawValues: false,
                      lineWidth: 2,
                      drawCircles: true,
                      circleColor: processColor(greenBlue),
                      drawCircleHole: false,
                      circleRadius: 5,
                      highlightColor: processColor("transparent"),
                      color: processColor( '#C19036'),
                      drawFilled: true,
                      // fillGradient: {
                      //   colors: [processColor("#64C2D4"), processColor("#64C2D4")],
                      //   positions: [0, 0.5],
                      //   angle: 90,
                      //   orientation: "TOP_BOTTOM"
                      // },
                      fillAlpha: 1000,
                      valueTextSize: 15
                    }
                  },
                ]
              }}
              chartDescription={{ text: "" }}
              legend={{
                enabled: false
              }}
              marker={{
                enabled: true,
                markerColor: processColor("white"),
                textColor: processColor("black")
              }}
              xAxis={{
                enabled: true,
                granularity: 1,
                drawLabels: true,
                position: "BOTTOM",
                drawAxisLine: true,
                drawGridLines: false,
                fontFamily: "HelveticaNeue-Medium",
                fontWeight: "bold",
                textSize: 12,
                textColor: processColor("gray"),
                valueFormatter: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
              }}
              yAxis={{
                left: {
                  enabled: true
                },
                right: {
                  enabled: false
                }
              }}
              autoScaleMinMaxEnabled={true}
              animation={{
                durationX: 0,
                durationY: 1500,
                easingY: "EaseInOutQuart"
              }}
              drawGridBackground={false}
              drawBorders={false}
              touchEnabled={true}
              dragEnabled={false}
              scaleEnabled={false}
              scaleXEnabled={false}
              scaleYEnabled={false}
              pinchZoom={false}
              doubleTapToZoomEnabled={false}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              keepPositionOnRotation={false}
              onSelect={this.handleSelect.bind(this)}
              onChange={event => console.log(event.nativeEvent)}
            />
          </View>
          <View style={styles.ViewCalendario}><Text style={styles.Calendario}>Gráfico</Text></View>
          <View style={styles.ViewCalendario}><Text style={styles.Calendario}>Gráfico</Text></View>
          <View style={styles.ViewCalendario}><Text style={styles.Calendario}>Gráfico</Text></View>
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
  },
  chartView: {
    flex: 1,
    padding: 20
},
  chart: {
    height: Dimensions.get('window').height
  }
});
export default Diario;