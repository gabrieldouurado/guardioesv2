import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, AsyncStorage } from 'react-native';

class Maps extends Component {
    static navigationOptions = {
        title: 'Mapa da Saúde',
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
                    'title': 'Permission for the app use the fine location',
                    'message': 'We want to use your fine location to make a report'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getLocation
            } else {
                console.warn("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
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
                                    title="Bem"
                                    pinColor='rgba(136,196,37, 1)'
                                />
                            )
                        }
                        return (
                            <Marker
                                key={index}
                                coordinate={coordinates}
                                title="Mal"
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
