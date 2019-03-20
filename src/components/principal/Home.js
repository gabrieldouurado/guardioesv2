import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage, NetInfo, Alert, Modal, ScrollView } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import translate from "../../../locales/i18n";
import Emoji from 'react-native-emoji';
import { PermissionsAndroid } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { API_URL } from '../../constUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';

class Home extends Component {
    navOptions // rolê para acessar a drawer em uma função estática

    constructor(props) {
        super(props);
        this.getLocation();
        this.state = {
            modalVisible: false,
            userSelect: null,
            userName: null,
            userID: null,
            userToken: null,
            householdName: null,
            householdID: null,
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            error: null,
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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() {
        this.getInfos()

        this.props.navigation.setParams({ // rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,
            _openNav: () => this.openDrawer()
        })
    }

    openDrawer() { // rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }

    getLocation() {
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
    }

    getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userName, userID, userToken });
        await this.setState({ userSelect: this.state.userName });
        AsyncStorage.setItem('userSelected', this.state.userSelect);
        this.getHouseholds();
    }

    getHouseholds = () => {//Get households
        //console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
        return fetch(`${API_URL}/user/${this.state.userID}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.user.households,
                })
            })
    }

    sendSurvey = async () => { //Send Survey GOOD CHOICE
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
                    household_id: this.state.householdID,
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
        const welcomeMessage = translate("home.hello") + this.state.userName;
        const householdHowYouFellingText = translate("home.householdHowYouFelling_part_1") + this.state.householdName + translate("home.householdHowYouFelling_part_2");
        const householdsData = this.state.data;

        const userHowYouFelling = (
            <Text style={styles.textFelling}>
                {translate("home.userHowYouFelling")}
            </Text>
        )

        const householdHowYouFelling = (
            <Text style={styles.textFelling}>
                {householdHowYouFellingText}
            </Text>
        )

        let howYouFelling;
        if (this.state.householdID !== null) {
            howYouFelling = householdHowYouFelling
        }
        else {
            howYouFelling = userHowYouFelling
        }

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
                    <View style={styles.viewHouseholdSelect}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalVisible); //Exit to modal view
                            }}>
                            <View style={styles.modalView}>
                                <View style={styles.modalViewTop}>
                                    <View style={styles.viewAvatar}>
                                        <Avatar
                                            large
                                            rounded
                                            source={Imagem.imagemFather}
                                            activeOpacity={0.7}
                                            onPress={async() => {
                                                await this.setState({ householdID: null, userSelect: this.state.userName });
                                                this.setModalVisible(!this.state.modalVisible);
                                                AsyncStorage.setItem('userSelected', this.state.userSelect);
                                                AsyncStorage.removeItem('householdID');
                                            }}
                                        />
                                        <Text>{this.state.userName}</Text>
                                    </View>
                                    <ScrollView horizontal={true}>
                                        {householdsData != null ?
                                            householdsData.map(household => {
                                                return (
                                                    <View style={styles.viewAvatar}>
                                                        <Avatar
                                                            large
                                                            rounded
                                                            source={Imagem.imagemMother}
                                                            activeOpacity={0.7}
                                                            onPress={async () => {
                                                                await this.setState({ householdID: household.id, householdName: household.description, userSelect: household.description });
                                                                this.setModalVisible(!this.state.modalVisible);
                                                                AsyncStorage.setItem('userSelected', this.state.userSelect);
                                                                AsyncStorage.setItem('householdID', this.state.householdID.toString());
                                                            }}
                                                        />
                                                        <Text>{household.description}</Text>
                                                    </View>
                                                )
                                            })
                                            : null}
                                    </ScrollView>
                                </View>
                                <View style={styles.modalViewBottom}>
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                        navigate('Household');
                                        this.setModalVisible(!this.state.modalVisible);
                                    }
                                    }>
                                        <FontAwesome name="plus-circle" size={scale(30)} color='rgba(22, 107, 135, 1)' />
                                        <Text>Adicionar Perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Text style={{ marginBottom: 7 }}>Selecione um Perfil:</Text>
                        <Avatar
                            large
                            rounded
                            source={Imagem.imagemFather}
                            activeOpacity={0.7}
                            onPress={() => {
                                this.getHouseholds();
                                this.setModalVisible(true);
                            }}
                        />
                        <Text>{this.state.userSelect}</Text>
                    </View>
                    <View style={styles.viewHouseholdAdd}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigate('Household')}>
                            <FontAwesome name="plus-circle" size={scale(30)} color='rgba(22, 107, 135, 1)' />
                            <Text>Adicionar Perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {howYouFelling}
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
        flexDirection: 'row',
        width: '85%',
        height: '30%',
    },
    viewHouseholdSelect: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: 'green',
        //borderWidth: 1
    },
    viewHouseholdAdd: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: 'blue',
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
    modalView: {
        alignSelf: 'center',
        width: '93%',
        marginTop: '60%',
        borderRadius: 30,
        backgroundColor: 'white',
        elevation: 15
    },
    modalViewTop: {
        flexDirection: 'row'
    },
    modalViewBottom: {
        alignItems: 'center',
        marginBottom: 17
    },
    viewAvatar: {
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 17,
        marginBottom: 13
    }
});

//make this component available to the app
export default Home;
