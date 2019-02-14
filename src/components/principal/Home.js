import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage, ImageBackground, BackHandler, ToastAndroid, NetInfo, Alert } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Icon from 'react-native-vector-icons/Feather';
import translate from "../../../locales/i18n";
import LinearGradient from 'react-native-linear-gradient';
import Emoji from 'react-native-emoji';
import { PermissionsAndroid } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { API_URL } from '../../constUtils';

let cont = 0
let data = new Date();

class Home extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    navOptions // rolê para acessar a drawer em uma função estática
    static navigationOptions = ({ navigation }) => {
        navOptions = navigation; // rolê para acessar a drawer em uma função estática
        const { params = {} } = navigation.state;
        return {
            title: translate("home.title"),
            headerLeft: (
                <Icon.Button name='menu' size={scale(30)} color='#fff' backgroundColor='transparent' onPress={() => params._onHeaderEventControl()} />
            ),
            headerTitleStyle: {
                fontFamily: 'roboto',
                fontWeight: '400' //fontWeight can't be higher than 400
            }

        }
    }

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton));
        this.state = {
            userName: null,
            userID: null,
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            UserID: "",
            error: null,
            HouseholdId: "",
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            showProgressBar: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    _isconnected = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? this.sendSurvey() : Alert.alert(
                translate("noInternet.noInternetConnection"),
                translate("noInternet.ohNo"),
                [
                    { text: translate("noInternet.alertAllRightMessage"), onPress: () => null }
                ]
            )
        });
    }
    
    async requestFineLocationPermission() { //User Location Request Function
        try {
            const granted = await PermissionsAndroid.request(
                android.permission.ACCESS_FINE_LOCATION,
                {
                    'title': translate("maps.locationRequest.requestLocationMessageTitle"),
                    'message': translate("maps.locationRequest.requestLocationMessageMessage")
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.componentDidMount
            } else {
                console.warn(translate("maps.locationRequest.requestDenied"))
                this.props.navigation.navigate('Home')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() {        
        this._getInfos()
        navigator.geolocation.getCurrentPosition( //User get location
            (position) => {
                this.setState({
                    userLatitude: position.coords.latitude,
                    userLongitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 50000 },
        );
        
        this.props.navigation.setParams({ // rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,
            _openNav: () => this.openDrawer()
        })

        //Exit app back button
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton));
    }
    
    handleBackButton() { //Exit app with two click in back button
        cont = cont + 1;
        if (cont == 2) {
            BackHandler.exitApp();
            cont = 0;
            this._didFocusSubscription && this._didFocusSubscription.remove();
            this._willBlurSubscription && this._willBlurSubscription.remove();
        } else {
            ToastAndroid.show(translate("home.toastAlertMessage"), ToastAndroid.SHORT);
        }
        return true;
    }
    
    openDrawer() { // rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }
    
    _getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userID = await AsyncStorage.getItem('userID');
        this.setState({ userName, userID })
    }
    
    sendSurvey = async () => { //Send Survey GOOD CHOICE
        this.requestFineLocationPermission
        this.showAlert();
        return fetch(`${API_URL}/surveys`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                survey:
                {
                    user_id: this.state.userID,
                    latitude: this.state.userLatitude,
                    longitude: this.state.userLongitude,
                }
            })
        })
        .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson !== null) {
                    this.setState({ showProgressBar: false });
                    console.warn("ENVIOU")
                } else {
                    console.warn("NÂO ENVIOU")
                    this.setState({ showProgressBar: false });
                }
            })
    }

    render() {
        const { showAlert } = this.state;
        const { navigate } = this.props.navigation;
        const welcomeMessage = translate("home.hello") + this.state.userName
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#348EAC' />

                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={Imagem.imagemLogoC} />
                </View>

                <View style={styles.viewWelcome}>
                    <Text style={styles.textHelloUser}>
                        {welcomeMessage}
                    </Text>

                    <Text style={styles.textNewGuardion}>
                        {translate("home.nowAGuardian")}
                    </Text>
                </View>

                <View style={styles.viewHousehold}>
                </View>
                <Text style={styles.textFelling}>
                    {translate("home.howYouFelling")}
                </Text>
                <View style={styles.viewReport}>
                    <View style={styles.viewChildGood}>
                        <TouchableOpacity onPress={this._isconnected}>
                            <Text style={styles.textChoiceButton}>{translate("report.goodChoice")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewChildBad}>
                        <TouchableOpacity onPress={() => navigate('BadReport')}>
                            <Text style={styles.textChoiceButton}>{translate("report.badChoice")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}{emojis[1]}{emojis[1]}</Text>}
                    message={this.state.showProgressBar ? null : <Text style={{ alignSelf: 'center' }}>{translate("badReport.alertMessages.reportSent")} {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                    confirmText={translate("badReport.alertMessages.confirmText")}
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    onDismiss={() => this.hideAlert()}
                />
            </View>
        );
    }
}


const emojis = [
    (
        <Emoji //Emoji heart up
            name='heart'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <Emoji //Emoji tada up
            name='tada'
            style={{ fontSize: scale(15) }}
        />
    )
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    viewImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageLogo: {
        height: '75%',
        resizeMode: 'center'
    },
    viewWelcome: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHelloUser: {
        fontSize: 40,
        fontFamily: 'roboto',
        color: '#166B87',
        alignSelf: 'center',
        textAlign: 'center'
    },
    textNewGuardion: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#166B87',
        alignSelf: 'center',
        textAlign: 'center'
    },
    viewHousehold: {
        width: '100%',
        height: '30%',
        //borderColor: 'red',
        //borderWidth: 1
    },
    textFelling: {
        fontSize: 18,
        fontFamily: 'roboto',
        color: '#166B87'
    },
    viewReport: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        height: '10%',
        marginTop: 5,
        marginBottom: 20,
    },
    viewChildBad: {
        width: '50%',
        borderTopRightRadius: 90,
        borderBottomRightRadius: 90,
        backgroundColor: 'rgba(22, 107, 135, 0.25)',
        justifyContent: 'center',
    },
    viewChildGood: {
        width: '50%',
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        backgroundColor: 'rgba(22, 107, 135, 1)',
        justifyContent: 'center',
    },
    textChoiceButton: {
        fontFamily: 'roboto',
        color: 'white',
        fontSize: 27,
        alignSelf: 'center'
    },
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
    }
});

//make this component available to the app
export default Home;
