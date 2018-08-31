//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Maps extends Component {
    static navigationOptions = {
        title: 'Mapa da Saúde',
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            dataSource: [],
            region: {
                latitude: -15.76855881,
                longitude: -47.86667418,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
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
    }

    render() {
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
    container: { ...StyleSheet.absoluteFillObject },
    map: { ...StyleSheet.absoluteFillObject }
});

//make this component available to the app
export default Maps;
