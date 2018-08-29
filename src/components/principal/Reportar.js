
import React, { Component } from 'react';
import { ImageBackground, ScrollView, Platform, StyleSheet, Text, View, TouchableOpacity, Image, Button, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';
import { PermissionsAndroid } from 'react-native';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;
class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLatitude: "",
            userLongitude: "",
        }

    }
    static navigationOptions = {
        title: 'Reportar',
        headerStyle: {
            backgroundColor: '#3B8686',
        },
        headerTitleStyle: {
            color: 'white',
        },
        headerTintColor: '#fff'
    }

    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                android.permission.ACCESS_FINE_LOCATION,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    //Function that creates a requisition to send the survey to the API
    sendSurvey = () => {

        this.requestLocationPermission()
        // navigator.geolocation.getCurrentPosition((position) => {
        //     var lat = parseFloat(position.coords.latitude)
        //     var lon = parseFloat(position.coords.longitude)
        //     this.setState({userLatitude: lat})
        //     this.setState({userLongitude: lon})
        // }, (error) => alert(JSON.stringify(error)),
        // {enableHighAccuracy:true, timeout: 20000, maximumAge:1000})
        // alert(this.state.userLatitude)
        fetch('https://guardianes.centeias.net/survey/create', {
            method: 'POST',
            body: JSON.stringify({
                user_id: "5b6db008abbd4916002b97f0",
                houselhold_id: "",
                lat: this.state.userLatitude,
                lon: this.state.userLongitude,
                no_symptom: "Y",
                week_of: "2020-05-20",
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
                    AsyncStorage.setItem('survey_id', responseJson.id);
                    this.props.navigation.navigate('Home');
                    alert(this.state.userLatitude)
                    alert('Obrigado por reportar que está bem no aplicativo Guardiões!!')
                } else {
                    alert(responseJson.message)
                }
            })
            .done();
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.textoInicialView}>
                    <Text style={styles.textoInicial}>
                        Nos ajude a prevenir riscos para a saúde durante ou após 8 dias, relatando sintomas que ocorrem durante ou depois de participar de um evento massivo.
                        </Text>
                </View>
                <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'stretch' }}>
                    <View style={styles.textoPerguntaView}>
                        <Text style={styles.textoPergunta}>Como está sua saúde neste momento?</Text>
                    </View>
                    <View style={styles.reportView}>
                        <TouchableOpacity onPress={() => this.sendSurvey()}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemGood} />
                            <Text style={styles.moodText}> BEM </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sendSurvey()}>
                            <Image style={{ width: 150, height: 150 }} source={Imagem.imagemBad} />
                            <Text style={styles.moodText}> MAL </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.reportFooter}>
                            Se a opção escolhida foi MAL poderá selecionar os sintomas na seguinte tela.
                        </Text>
                    </View>
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    titulo: {

    },
    backButton: {
        alignSelf: 'center',
        marginLeft: '1%',
    },
    textoInicialView: {
        backgroundColor: '#0084b4',
        height: '12%',
    },
    textoInicial: {
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: '1.5%',
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff'
    },
    textoPerguntaView: {
        marginTop: '15%',
        alignItems: 'center',
    },
    textoPergunta: {
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center',
        color: '#0084b4',
    },
    reportView: {
        flex: 1,
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    reportFooter: {
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: '1%',
        fontSize: 14,
        textAlign: 'center',
    },
    moodText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '20%'
    },
})


//make this component available to the app
export default Report;