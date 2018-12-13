import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage, ImageBackground, BackHandler, ToastAndroid, NetInfo, Alert  } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import translate from "../../../locales/i18n";
import LinearGradient from 'react-native-linear-gradient';
import Emoji from 'react-native-emoji';
import { PermissionsAndroid } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
let cont = 0
let data = new Date();

class Home extends Component {
    static propTypes = {
        start: PropTypes.func.isRequired,
        copilotEvents: PropTypes.shape({
            on: PropTypes.func.isRequired,

        }).isRequired,
    };

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
            userFirstName: null,
            secondStepActive: true,
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            UserID: "",
            error: null,
            HouseholdId: "",
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
        }
    }
    ///////
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
                    {text: translate("noInternet.alertAllRightMessage"), onPress: () => null}
                ]
            )
        });
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
                this.componentDidMount
            } else {
                console.warn(translate("maps.locationRequest.requestDenied"))
                this.props.navigation.navigate('Home')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    //Function that creates a requisition to send the survey to the API
    sendSurvey = async () => {
        this.showAlert();
        this.requestFineLocationPermission

        let UserID = await AsyncStorage.getItem('userID');
        this.setState({ UserID: UserID })

        let HouseholdId = await AsyncStorage.getItem('HouseholdId');
        this.setState({ HouseholdId: HouseholdId })

        fetch('https://guardianes.centeias.net/survey/create', {
            method: 'POST',
            body: JSON.stringify({
                user_id: this.state.UserID,
                houselhold_id: this.state.HouseholdId,
                lat: this.state.userLatitude,
                lon: this.state.userLongitude,
                no_symptom: "Y",
                week_of: data,
                hadContagiousContact: "none",
                hadHealthCare: "none",
                hadTravlledAbroad: "none",
                travelLocation: "none",
                app_token: "d41d8cd98f00b204e9800998ecf8427e",
                platform: "",

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this.setState({ showProgressBar: false });
                    AsyncStorage.setItem('survey_id', responseJson.id);
                } else {
                    alert(responseJson.message)
                    this.setState({ showProgressBar: false });
                }
            })
            .done();
    }
    ////////////

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
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


        this.runTutorial();

        this.props.navigation.setParams({// rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,// rolê para acessar a drawer em uma função estática
            _openNav: () => this.openDrawer()// rolê para acessar a drawer em uma função estática
        })
        this._getInfos()

        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton));

    }

    runTutorial = async () => {
        let runTutorial = await AsyncStorage.getItem('RunTutorial');
        this.setState({ runTutorial: runTutorial });
        if (this.state.runTutorial === 'true') {
            this.props.copilotEvents.on('stepChange', this.handleStepChange);
            this.props.start();
            AsyncStorage.removeItem('RunTutorial');
        }
    }

    handleStepChange = (step) => {
        console.log(`Current step is: ${step.name}`);
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton));
    }

    //componentWillUnmount() {
    //    this._didFocusSubscription && this._didFocusSubscription.remove();
    //    this._willBlurSubscription && this._willBlurSubscription.remove();
    //}

    handleBackButton() {

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

    openDrawer() {// rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }// rolê para acessar a drawer em uma função estática

    _getInfos = async () => {
        let valueName = await AsyncStorage.getItem('userName');
        this.setState({ userFirstName: valueName })
    }

    render() {
        const { showAlert } = this.state;
        const { navigate } = this.props.navigation;
        const welcomeMessage = translate("home.hello") + " " + this.state.userFirstName
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#348EAC' />

                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={Imagem.imagemLogoC} />
                </View>

                <View style={styles.viewWelcome}>
                    <CopilotStep text="Agora você conhecerá nossas principais funções!" order={1} name="openApp">
                        <WalkthroughableText style={styles.textHelloUser}>
                            {welcomeMessage}
                        </WalkthroughableText>

                    </CopilotStep>
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
                            <CopilotStep text="Aqui você pode acompanhar seu diário da saúde" order={5} name="fifthText">
                                <WalkthroughableImage source={Imagem.imagemInicio} style={styles.menuIcons} />
                            </CopilotStep>
                            <Text style={styles.textButton}>
                                Inicio
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Diario')}>
                            <CopilotStep text="Aqui você pode acompanhar seu diário da saúde" order={5} name="fifthText">
                                <WalkthroughableImage source={Imagem.imagemDiarioSaude} style={styles.menuIcons} />
                            </CopilotStep>
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthDiary")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Mapa')}>
                            <CopilotStep text="Aqui você pode acessar um mapa para ver como as pessoas estão ao seu redor" order={6} name="sixthText">
                                <WalkthroughableImage source={Imagem.imagemMapaSaude} style={styles.menuIcons} />
                            </CopilotStep>
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthMap")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Conselho')}>
                            <CopilotStep text="Aqui você encontra diversas informações relacionadas à saúde" order={4} name="fourthText">
                                <WalkthroughableImage source={Imagem.imagemConselho} style={styles.menuIcons} />
                            </CopilotStep>
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthTips")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Noticias')}>
                            <CopilotStep text="Aqui temos notícias quentinhas relacionadas à saúde" order={3} name="thirdText">
                                <WalkthroughableImage source={Imagem.imagemNoticias} style={styles.menuIcons} />
                            </CopilotStep>
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.news")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={ this.state.showProgressBar ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}{emojis[1]}{emojis[1]}</Text> }
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
        fontSize: 20,
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
        fontSize: 35,
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
export default copilot({
    animated: true, // Can be true or false
    overlay: 'svg', // Can be either view or svg
})(Home);
