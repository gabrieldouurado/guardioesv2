import React, { Component } from 'react';
import { View, StyleSheet, PermissionsAndroid, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import translate from '../../../locales/i18n';
import * as Imagem from '../../imgs/imageConst';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../scallingUtils';

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
        const { navigate } = this.props.navigation;
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
                <LinearGradient style={styles.bottomMenu} colors={['#348EAC', '#013444']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.9, y: 1.0 }}>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Home')}>
                            <Image source={Imagem.imagemInicio} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                Inicio
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Diario')}>
                            <Image source={Imagem.imagemDiarioSaude} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthDiary")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Mapa')}>
                            <Image source={Imagem.imagemMapaSaude} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthMap")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Conselho')}>
                            <Image source={Imagem.imagemConselho} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthTips")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Noticias')}>
                            <Image source={Imagem.imagemNoticias} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.news")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end' },
    map: { flex: 1 },
    ///////////////////////////
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '11%',
        backgroundColor: 'red'
    },
    menuButtons: {
        alignItems: 'center'
    },
    viweButtons: {
        justifyContent: 'center',
        width: '20%',
    },
    menuIcons: {
        resizeMode: 'center',
        height: scale(30)
    },
    textButton: {
        fontFamily: 'roboto',
        alignSelf: 'center',
        textAlign: 'justify',
        fontSize: 10,
        color: 'white'
    },
    ////////////////////////////

});

//make this component available to the app
export default Maps;
