import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, AsyncStorage } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { API_URL } from '../../constUtils';

const { height, width } = Dimensions.get('window');

let markerLat = 0;
let markerLon = 0;

export class Rumor extends Component {
  static navigationOptions = {
    title: "Rumor"
  }

  constructor(props) {
    super(props);

    this.getLocation(); //Get user location

    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      userLatitudeDelta: 0.0222,
      userLongitudeDelta: 0.0121,
      circleRadius: 600,
      modalVisibility: false,
      showMarker: false,
      descriptionHeight: 40,


      description: '',
      confirmed_cases: 0,
      confirmed_deaths: 0,
      title: ''
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
        console.log("Log the position -> ", position);
        console.log("Log the state after get location", this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 50000 },
    );
  }

  _setModalVisible = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility })
  }

  _showMarker = () => {
    this.setState({ showMarker: true })
  }

  _updateUserLoc = (lat, lon) => {
    this.setState({
      userLatitude: lat,
      userLongitude: lon
    })
  }

  updateSize = (height) => {
    this.setState({
      descriptionHeight: height
    });
  }

  _createRumor = async () => {
    const user_token = await AsyncStorage.getItem('userToken');
    const { title, description, confirmed_cases, confirmed_deaths } = this.state;

    try {
      fetch(API_URL + "/rumors", {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          Authorization: user_token
        },
        body: JSON.stringify({
          rumor: {
            title,
            description,
            confirmed_cases,
            confirmed_deaths
          }
        })
      })
        .then(res => {
          console.log("Res -> ", res);
          return res.json();
        })
        .then(resJson => {
          console.log("ResJson -> ", resJson);
          console.log("Data -> ", resJson.data)
          if(resJson.message == "Sucesso"){
            this.props.navigation.navigate('Home');
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { height, description } = this.state;

    const checked = (<Feather name="check-square" size={20} color='green' />)
    const unchecked = (<EvilIcons name="close" size={20} color="red" />)

    let newStyle = {
      height
    }
    const marker = (
      <Marker
        coordinate={{
          // latitude: this.state.userLatitude,
          // longitude: this.state.userLongitude,
          latitude: markerLat,
          longitude: markerLon
        }}
      />
    )

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Modal
            transparent={true}
            visible={this.state.modalVisibility}
            onRequestClose={() => {
              this._setModalVisible();
            }}
          >
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.userLatitude,
                longitude: this.state.userLongitude,
                latitudeDelta: this.state.userLatitudeDelta,
                longitudeDelta: this.state.userLongitudeDelta
              }}
              // liteMode={true}
              showsUserLocation={true}
              scrollEnabled={true}
              rotateEnabled={true}
              onPress={e => {
                // console.log("My Coordinate -> ", this.state.userLatitude, this.state.userLongitude);
                // console.log("Coordinate Position -> ", e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                markerLat = e.nativeEvent.coordinate.latitude;
                markerLon = e.nativeEvent.coordinate.longitude;
                console.warn("Show Marker", markerLat, markerLon);

                this._showMarker();
                //When user scrolls through the map and clicks, the map goes back to where the
                //the user is, thus is required userLatitude and userLongitude to be changed as well
                this._updateUserLoc(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);

                setTimeout(() => {
                  this._setModalVisible();
                }, 500);
              }}
            >
              {this.state.showMarker ? marker : null}
            </MapView>

            <TouchableOpacity
              style={styles.exitModalBtn}
              onPress={() => this._setModalVisible()}
            >
              <Text style={styles.exitModalText}>X</Text>
            </TouchableOpacity>
          </Modal>
          <View>
            <Text style={styles.normalTexts}>Título:</Text>
          </View>
          <View>
            <TextInput
              placeholder="Título do Rumor"
              style={styles.textInput}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
            />
          </View>
          <View>
            <Text style={styles.normalTexts}>Descriçao:</Text>
          </View>

          {/* <View> */}
          <TextInput
            placeholder="Mensagem descrevendo os eventos"            
            multiline={true}
            maxLength={300}
            style={[styles.textInput, newStyle]}
            onChangeText={description => this.setState({ description })}
            value={description}
            onSubmitEditing={() => console.log("Texto -> ", this.state)}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />
          {/* </View> */}

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //borderColor: 'red',
            //borderWidth: 1
          }}>
            <View style={styles.viewCasos}>
              <Text style={styles.normalTexts}>Numero de Casos:</Text>
              <TextInput
                placeholder="Casos"
                keyboardType={"number-pad"}
                style={{
                  marginLeft: '4%',
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  width: '22%'
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.openMapBtn}
              onPress={() => this._setModalVisible()}
            >
              <Text>Local</Text>
              {this.state.showMarker ? checked : unchecked}
            </TouchableOpacity>
          </View>

        </View>

        <View>
          <TouchableOpacity
            onPress={() => this._createRumor()}
            style={styles.sendBtn}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
    justifyContent: 'space-between',
  },
  body: {
  },
  map: {
    flex: 1
  },
  exitModalBtn: {
    position: 'absolute',
    top: width * 0.05,
    left: width * 0.05,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#348EAC',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 90,
    elevation: 10
  },
  exitModalText: {
    //padding: '3%',
    fontSize: 'bold',
    color: 'white',
    fontSize: 21
  },
  openMapBtn: {
    width: '40%',
    padding: '2%',
    alignItems: 'center',
    //borderBottomColor: 'lightgray',
    //borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textInput: {
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '100%',
    marginBottom: '3%'
  },
  sendBtn: {
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#166B87',
    borderWidth: 1,
    borderRadius: 10
  },
  normalTexts: {
    marginBottom: 5,
    fontSize: 15,
    fontFamily: 'roboto',
    color: '#166B87',
    fontWeight: 'bold'
  },
  viewCasos: {
    flexDirection: 'row',
    alignItems: 'center'
    //borderColor: 'green',
    //borderWidth: 1,
  }
})

export default Rumor;
