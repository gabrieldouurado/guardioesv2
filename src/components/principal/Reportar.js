import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Imagem from '../../imgs/imageConst';
import { PermissionsAndroid } from 'react-native';
import { scale } from '../scallingUtils';
import Emoji from 'react-native-emoji';

const { height } = Dimensions.get('window')

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let h = data.getHours();

let today = y + "-" + m + "-" + d + "T" + h;


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            UserID: "",
            error: null,
            HouseholdId: "",
            showAlert: false
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    static navigationOptions = {
        title: 'Relato',
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
                this.componentDidMount
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    //Function that creates a requisition to send the survey to the API
    sendSurvey = async () => {

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
                    this.showAlert();
                    AsyncStorage.setItem('survey_id', responseJson.id);
                } else {
                    alert(responseJson.message)
                }
            })
            .done();
    }


    render() {
        const { showAlert } = this.state;

        return (
            <ScrollView /*style={styles.container}*/>
                <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
                    <View style={styles.textoPerguntaView}>
                        <Text style={styles.textoPergunta}>Como está sua saúde neste momento?</Text>
                    </View>
                    <View style={styles.reportView}>
                        <TouchableOpacity onPress={() => this.sendSurvey()}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemGood} />
                            <Text style={styles.moodText}> BEM </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BadReport')}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemBad} />
                            <Text style={styles.moodText}> MAL </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.reportFooter}>
                            Se a opção escolhida for 'MAL' poderá selecionar os sintomas na seguinte tela.
                        </Text>
                    </View>
                </ImageBackground>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={<Text>Obrigado! {emojis[1]}{emojis[1]}{emojis[1]}</Text>}
                    message={<Text style={{alignSelf: 'center'}}>Seu relato foi enviado {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Voltar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.props.navigation.navigate('Home')
                    }}
                    onDismiss={() => this.props.navigation.navigate('Home')}
                />
            </ScrollView>

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
        height: height - scale(70),
    },
    titulo: {

    },
    textoPerguntaView: {
        marginTop: '7%',
        alignItems: 'center',
    },
    textoPergunta: {
        justifyContent: 'center',
        fontSize: 36,
        fontFamily: 'poiretOne',
        fontWeight: '400',
        textAlign: 'center',
        color: '#465F6C',
    },
    reportView: {
        flex: 1,
        marginTop: '19%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    reportFooter: {
        justifyContent: 'center',
        fontFamily: 'poiretOne',
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
        margin: '2%'
    },
    moodText: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'poiretOne',
        fontWeight: '400',
        marginTop: '9%'
    },
})


const telaDeGratidao = (titulo, mensagem) => {
    <TouchableOpacity style={{ flex: 1 }}>
        <View> {/* View to titulo */}
            <Text>{titulo}</Text>
        </View>

        <View> {/* View da mensagem de agradecimento */}
            <Text>
                {mensagem}
            </Text>
        </View>
    </TouchableOpacity>
}

//make this component available to the app
export default Report;
