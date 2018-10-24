import React, { Component } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import translate from '../../../locales/i18n';

class Maps extends Component {
    static navigationOptions = {
        title: translate("maps.title")
    }

    constructor(props) {
        super(props);

        this.state = {
            userLatitude: null,
            userLongitude: null,
            isLoading: true,
            dataSource: [],            
        }
    }

    componentDidMount() {
        fetch('https://guardianes.centeias.net/surveys/a')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                });

            })
            .catch((error) => {
                console.error(error);
            });
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    },
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 50000 },
        );
    }

    async requestFineLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                android.permission.ACCESS_FINE_LOCATION,
                {
                    'title': translate("maps.locationRequest.requestLocationMessageTitle"),
                    'message': translate("maps.locationRequest.requestLocationMessageMessage")
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getLocation
            } else {
                console.warn(translate("maps.locationRequest.requestDenied"))
                this.props.navigation.navigate('Home')
            }
        } catch (err) {
        }
    }

    render() {
        this.requestFineLocationPermission;
        let markers = this.state.dataSource;
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                >
                    {markers.map((marker, index) => {
                        let coordinates = { latitude: marker.lat, longitude: marker.lon }
                        if (marker.no_symptom === "Y") {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={coordinates}
                                    title={translate("maps.reportGood")}
                                    pinColor='rgba(136,196,37, 1)'
                                />
                            )
                        }
                        return (
                            <Marker
                                key={index}
                                coordinate={coordinates}
                                title={translate("maps.reportBad")}
                            />
                        )
                    }
                    )}
                </MapView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end' },
    map: { flex: 1 }
});

//make this component available to the app
export default Maps;
