import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Button, AsyncStorage, NetInfo } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import CountryPicker from 'react-native-country-picker-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';
import { app_token } from '../../constUtils';
import { translate } from '../../../locales/i18n';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class BadReport extends Component {
    static navigationOptions = {
        title: translate("badReport.title")
    }

    constructor(props) {
        super(props);
        this.state = {
            cca2: 'BR',
            country: 'Brazil',
            checked_1: false,
            checked_2: false,
            checked_3: false,
            checked_4: false,
            checked_5: false,
            checked_6: false,
            checked_7: false,
            checked_8: false,
            checked_9: false,
            checked_10: false,
            checked_11: false,
            checked_12: false,
            checked_13: false,
            checked_14: false,
            checked_15: false,
            checked_16: false,
            checked_17: false,
            checked_18: false,
            checked_19: false,
            checked_20: false,
            checked_21: false,
            checked_22: false,
            date: today,
            showAlert: false, //Custom Alerts
            showProgressBar: false //Custom Progress Bar
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            progressBarAlert: true
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
                'Sem Internet!',
                'Poxa parece que você não tem internet, tenta de novo mais tarde ok.',
                [
                    {text: 'Ok, vou tentar mais tarde', onPress: () => null}
                ]
            )
        });
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
                console.warn("Location permission denied")
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

        fetch('https://guardianes.centeias.net/survey/create', {
            method: 'POST',
            body: JSON.stringify({
                user_id: this.state.UserID,
                houselhold_id: "",
                lat: this.state.userLatitude,
                lon: this.state.userLongitude,
                no_symptom: "N",
                week_of: this.state.date,
                hadContagiousContact: this.state.checked_20,
                hadHealthCare: this.state.checked_21,
                hadTravlledAbroad: this.state.checked_22,
                travelLocation: this.state.country,
                app_token: app_token,
                platform: "",
                bolhasNoPe: this.state.checked_1,
                congestaoNasal: this.state.checked_2,
                diarreia: this.state.checked_3,
                dificuldadeDeRespirar: this.state.checked_4,
                doNasArticulacoes: this.state.checked_5,
                headache: this.state.checked_6,
                dorEstomago: this.state.checked_7,
                bodypain: this.state.checked_8,
                dorOlhos: this.state.checked_9,
                calafrio: this.state.checked_10,
                fever: this.state.checked_11,
                fatigue: this.state.checked_12,
                manchasVermelhas: this.state.checked_13,
                nauseas: this.state.checked_14,
                olhosVermelhos: this.state.checked_15,
                pesOlhosAmarelados: this.state.checked_16,
                sangramento: this.state.checked_17,
                tosse: this.state.checked_18,
                vomito: this.state.checked_19,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this.setState({ progressBarAlert: false });
                    AsyncStorage.setItem('survey_id', responseJson.id);
                }
            })
    }

    render() {
        const { showAlert } = this.state;

        const viajou = (
            <View>
                <View><Text style={styles.commomTextView}>Para qual país você viajou?</Text></View>
                <CountryPicker
                    onChange={value => {
                        this.setState({ cca2: value.cca2, country: value.name })
                    }}
                    cca2={this.state.cca2}
                    translation="por"
                />
                <Text style={styles.textCountry}>{this.state.country}</Text>
                <View><Text style={{ alignSelf: 'center', paddingTop: 2, fontSize: 13 }}>Aperte na bandeira para selecionar!</Text></View>
            </View>
        )

        let checked_22True;
        if (this.state.checked_22 == true) {
            checked_22True = viajou
        }
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
                <View style={{ width: '100%', alignSeft: 'center', marginBottom: '2%', marginTop: '2%' }}>
                    <Text style={styles.dateText}>
                        {translate("badReport.sickAge")}
                    </Text>
                    <DatePicker
                        style={{ width: '94%', marginLeft: '3%', backgroundColor: '#DFDFD0', borderRadius: 20 }}
                        //showIcon={false}
                        date={this.state.date}
                        mode="date"
                        placeholder="Clique aqui para inserir a data!"
                        format={translate("birthDetails.format")}
                        minDate="2018-01-01"
                        maxDate={today}
                        confirmBtnText={translate("birthDetails.confirmButton")}
                        cancelBtnText={translate("birthDetails.cancelButton")}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            },
                            dateText: {
                                fontFamily: 'poiretOne',
                                fontSize: 20
                            },
                            placeholderText: {
                                marginLeft: 14,
                                fontFamily: 'poiretOne',
                                fontSize: 18,
                                color: '#465F6C'
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>
                            {translate("badReports.symptoms")}
                        </Text>
                    </View>
                    <CheckBox
                        title={translate("badReport.blisters")}
                        checked={this.state.checked_1}
                        onPress={() => {
                            if (this.state.checked_1 == false) {
                                this.setState({ checked_1: true })
                            }

                            else {
                                this.setState({ checked_1: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReports.noseCongestion")}
                        checked={this.state.checked_2}
                        onPress={() => {
                            if (this.state.checked_2 == false) {
                                this.setState({ checked_2: true })
                            }

                            else {
                                this.setState({ checked_2: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.diarrhea")}
                        checked={this.state.checked_3}
                        onPress={() => {
                            if (this.state.checked_3 == false) {
                                this.setState({ checked_3: true })
                            }

                            else {
                                this.setState({ checked_3: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.breathingDifficulty")}
                        checked={this.state.checked_4}
                        onPress={() => {
                            if (this.state.checked_4 == false) {
                                this.setState({ checked_4: true })
                            }

                            else {
                                this.setState({ checked_4: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.jointPain")}
                        checked={this.state.checked_5}
                        onPress={() => {
                            if (this.state.checked_5 == false) {
                                this.setState({ checked_5: true })
                            }

                            else {
                                this.setState({ checked_5: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.headache")}
                        checked={this.state.checked_6}
                        onPress={() => {
                            if (this.state.checked_6 == false) {
                                this.setState({ checked_6: true })
                            }

                            else {
                                this.setState({ checked_6: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.stomachache")}
                        checked={this.state.checked_7}
                        onPress={() => {
                            if (this.state.checked_7 == false) {
                                this.setState({ checked_7: true })
                            }

                            else {
                                this.setState({ checked_7: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.musclePain")}
                        checked={this.state.checked_8}
                        onPress={() => {
                            if (this.state.checked_8 == false) {
                                this.setState({ checked_8: true })
                            }

                            else {
                                this.setState({ checked_8: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.eyePain")}
                        checked={this.state.checked_9}
                        onPress={() => {
                            if (this.state.checked_9 == false) {
                                this.setState({ checked_9: true })
                            }

                            else {
                                this.setState({ checked_9: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.chills")}
                        checked={this.state.checked_10}
                        onPress={() => {
                            if (this.state.checked_10 == false) {
                                this.setState({ checked_10: true })
                            }

                            else {
                                this.setState({ checked_10: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.fever")}
                        checked={this.state.checked_11}
                        onPress={() => {
                            if (this.state.checked_11 == false) {
                                this.setState({ checked_11: true })
                            }

                            else {
                                this.setState({ checked_11: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.fellingIll")}
                        checked={this.state.checked_12}
                        onPress={() => {
                            if (this.state.checked_12 == false) {
                                this.setState({ checked_12: true })
                            }

                            else {
                                this.setState({ checked_12: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.redSpots")}
                        checked={this.state.checked_13}
                        onPress={() => {
                            if (this.state.checked_13 == false) {
                                this.setState({ checked_13: true })
                            }

                            else {
                                this.setState({ checked_13: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.sickness")}
                        checked={this.state.checked_14}
                        onPress={() => {
                            if (this.state.checked_14 == false) {
                                this.setState({ checked_14: true })
                            }

                            else {
                                this.setState({ checked_14: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.redishEyes")}
                        checked={this.state.checked_15}
                        onPress={() => {
                            if (this.state.checked_15 == false) {
                                this.setState({ checked_15: true })
                            }

                            else {
                                this.setState({ checked_15: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.feetEyeRedissh")}
                        checked={this.state.checked_16}
                        onPress={() => {
                            if (this.state.checked_16 == false) {
                                this.setState({ checked_16: true })
                            }

                            else {
                                this.setState({ checked_16: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.bleeding")}
                        checked={this.state.checked_17}
                        onPress={() => {
                            if (this.state.checked_17 == false) {
                                this.setState({ checked_17: true })
                            }

                            else {
                                this.setState({ checked_17: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.cough")}
                        checked={this.state.checked_18}
                        onPress={() => {
                            if (this.state.checked_18 == false) {
                                this.setState({ checked_18: true })
                            }

                            else {
                                this.setState({ checked_18: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.vomiting")}
                        checked={this.state.checked_19}
                        onPress={() => {
                            if (this.state.checked_19 == false) {
                                this.setState({ checked_19: true })
                            }

                            else {
                                this.setState({ checked_19: false })
                            }
                        }}
                    />
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>{translate("badReport.answerQuestions")}</Text>
                    </View>
                    <CheckBox
                        title={translate("badReport.checkboxes.first")}
                        checked={this.state.checked_20}
                        onPress={() => {
                            if (this.state.checked_20 == false) {
                                this.setState({ checked_20: true })
                            }

                            else {
                                this.setState({ checked_20: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.second")}
                        checked={this.state.checked_21}
                        onPress={() => {
                            if (this.state.checked_21 == false) {
                                this.setState({ checked_21: true })
                            }

                            else {
                                this.setState({ checked_21: false })
                            }
                        }}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.third")}
                        checked={this.state.checked_22}
                        onPress={() => {
                            if (this.state.checked_22 == false) {
                                this.setState({ checked_22: true })
                            }

                            else {
                                this.setState({ checked_22: false })
                            }
                        }}
                    />
                    {checked_22True}
                    <View style={styles.buttonView}>
                        <Button title={translate("badReport.checkboxConfirm")} color="#9B6525" onPress={() => {
                            if (this.state.date !== null) {
                                this.showAlert();
                                this.sendSurvey();
                            }
                            else {
                                alert(translate("badReport.checkboxDateConfirmation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 "));
                            }
                        }
                        } />
                    </View>
                </ScrollView>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.progressBarAlert ? true : false}
                    title={this.state.progressBarAlert ? translate("badReport.alertMessages.sending") : <Text>{translate("badReport.alertMessages.thanks")} {emojis[1]}</Text>}
                    message={this.state.progressBarAlert ? null : <Text>{translate("badReport.alertMessages.reportSent")}{"\n"}{translate("badReport.alertMessages.seeADoctor")} {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
                    closeOnTouchOutside={this.state.progressBarAlert ? false : true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.progressBarAlert ? false : true}
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
            </ImageBackground>
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
            name='heavy_check_mark'
            style={{ fontSize: scale(15) }}
        />
    )
]               

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    scroll: {
        paddingRight: '5%'
    },
    sintomasText: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'poiretOne',
        color: '#465F6C'
    },
    dateText: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'poiretOne',
        color: '#465F6C'
    },
    viewText: {
        backgroundColor: '#A0B1B2'
    },
    buttonView: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20,
        width: "60%"
    },
    commomTextView: {
        fontSize: 15,
        alignSelf: 'center',
        paddingBottom: 4,
        fontWeight: 'bold'
    },
    textCountry: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'poiretOne',
        fontWeight: '400',
    }
});

//make this component available to the app
export default BadReport;
