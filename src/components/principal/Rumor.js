import React, { Component } from 'react'
<<<<<<< HEAD
import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput } from 'react-native';
=======
import { Text, View, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, AsyncStorage } from 'react-native';
>>>>>>> DiarioSaude
import MapView, { Marker } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { API_URL } from '../../constUtils';

<<<<<<< HEAD

=======
>>>>>>> DiarioSaude
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
<<<<<<< HEAD
=======
      confirmed_cases: 0,
      confirmed_deaths: 0,
>>>>>>> DiarioSaude
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
<<<<<<< HEAD
    const { title, event_description, confirmed_cases, confirmed_deaths } = this.state;

    try {
      fetch(API_URL + "rumors", {
        method: 'POST',
        header: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
=======
    const { title, description, confirmed_cases, confirmed_deaths } = this.state;

    try {
      fetch(API_URL + "/rumors", {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
>>>>>>> DiarioSaude
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
<<<<<<< HEAD
=======
        .then(res => {
          console.log("Res -> ", res);
          return res.json();
        })
        .then(resJson => {
          console.log("ResJson -> ", resJson);
          console.log("Data -> ", resJson.data)
        })
>>>>>>> DiarioSaude
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
              alert('Modal has been closed.');
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
                }, 3000);
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
            <TextInput
              placeholder="Título"
              style={styles.textInput}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
            />
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

<<<<<<< HEAD
          <TouchableOpacity
            style={styles.openMapBtn}
            onPress={() => this._setModalVisible()}
          >
            <Text>Marque no mapa</Text>
            {this.state.showMarker ? checked : unchecked}
          </TouchableOpacity>
=======
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-around',
            borderColor: 'red',
            borderWidth: 1
          }}>

            <View style={{
              width: '15%',
              borderColor: 'red',
              borderWidth: 1
            }}>
              <TextInput
                placeholder="Casos"
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
>>>>>>> DiarioSaude

        </View>

        <View>
          <TouchableOpacity
            onPress={() => this._createRumor()}
            style={styles.sendBtn}
          >
            <Text>Ola</Text>
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
    marginTop: height * 0.10,
    paddingVertical: height * 0.10,
<<<<<<< HEAD
    borderColor: 'red',
    borderWidth: 1
=======
>>>>>>> DiarioSaude
  },
  map: {
    flex: 1
  },
  exitModalBtn: {
    position: 'absolute',
    top: width * 0.06,
    left: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 1
  },
  exitModalText: {
    padding: '3%',
    fontSize: 18
  },
  openMapBtn: {
    width: '40%',
    padding: '2%',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
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
<<<<<<< HEAD
    borderColor: 'red',
    borderWidth: 1
=======
    borderColor: '#166B87',
    borderWidth: 1,
    borderRadius: 10
>>>>>>> DiarioSaude
  }
})

export default Rumor;
