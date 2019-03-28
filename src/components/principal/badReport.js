import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, AsyncStorage, NetInfo } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import CountryPicker from 'react-native-country-picker-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';

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
        this.getLocation();
        this.state = {
            cca2: 'BR',
            country: 'Brazil',
            contactWithSymptom: false,
            lookedForHospital: false,
            hadTraveled: false,
            symptoms: [],
            today_date: today,
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
            showAlert: false,
            progressBarAlert: true
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

    componentDidMount() {        
        this.getSymptoms();
        this.getInfos();
    }
    
    //componentWillUnmount() {
        //Remover o HouseholdID afim de evitar possiveis erros no IOS
        //AsyncStorage.removeItem('householdID');
    //}

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

    getSymptoms = () => {//Get Symptoms
        return fetch(`${API_URL}/symptoms`, {
            headers: {
                Accept: 'application/vnd.api+json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.symptoms
                })
            })
    }

    getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userSelected = await AsyncStorage.getItem('userSelected');
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userName, userSelected, userID, userToken });

        //Para não dar BO de variavel nula no IOS -- So puxa o async quando é um household
        if (this.state.userSelected === this.state.userName) {
            this.setState({ householdID: null })
        } else {
            let householdID = await AsyncStorage.getItem('householdID');
            this.setState({ householdID })
        }
    }

    sendSurvey = async () => {
        this.showAlert();
        return fetch(`${API_URL}/user/${this.state.userID}/surveys`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify({
                survey:
                {
                    user_id: this.state.userID,
                    household_id: this.state.householdID,
                    latitude: this.state.userLatitude,
                    longitude: this.state.userLongitude,
                    bad_since: this.state.today_date,
                    symptom: this.state.symptoms
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson !== null) {
                    this.setState({ showProgressBar: false });
                    console.warn("ENVIOU")
                    this.props.navigation.navigate('Home')
                } else {
                    console.warn("NÂO ENVIOU")
                    this.setState({ showProgressBar: false });
                }
            })
    }

    render() {
        const { showAlert } = this.state;
        const symptomsData = this.state.dataSource;

        const traveled = (
            <View>
                <View><Text style={styles.commomTextView}>{translate("badReport.checkboxes.fourth")}</Text></View>
                <CountryPicker
                    onChange={value => {
                        this.setState({ cca2: value.cca2, country: value.name })
                    }}
                    cca2={this.state.cca2}
                    translation="por"
                />
                <Text style={styles.textCountry}>{this.state.country}</Text>
                <View><Text style={{ alignSelf: 'center', paddingTop: 2, fontSize: 13 }}>{translate("badReport.checkboxes.fifth")}</Text></View>
            </View>
        )

        let traveledTrue;
        if (this.state.hadTraveled == true) {
            traveledTrue = traveled
        }

        return (
            <View style={styles.container}>
                <View style={{ width: '100%', alignSeft: 'center', marginBottom: '2%', marginTop: '2%' }}>
                    <Text style={{alignSelf: 'center'}}>
                        Reportanto como: {this.state.userSelected}
                    </Text>
                    <Text style={styles.dateText}>
                        {translate("badReport.sickAge")}
                    </Text>
                    <DatePicker
                        style={{ width: '94%', marginLeft: '3%', backgroundColor: '#a9cedb', borderRadius: 20 }}
                        date={this.state.today_date}
                        mode="date"
                        placeholder={translate("badReport.datePlaceHolder")}
                        format="YYYY-MM-DD"
                        minDate="2018-01-01"
                        maxDate={today}
                        confirmBtnText={translate("birthDetails.confirmButton")}
                        cancelBtnText={translate("birthDetails.cancelButton")}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            },
                            dateText: {
                                fontFamily: 'roboto',
                                fontSize: 20
                            },
                            placeholderText: {
                                marginLeft: 14,
                                fontFamily: 'roboto',
                                fontSize: 18,
                                color: '#465F6C'
                            }
                        }}
                        onDateChange={(date) => { this.setState({ today_date: date }) }}
                    />
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>
                            {translate("badReport.symptoms")}
                        </Text>
                    </View>
                    {symptomsData != null ?
                        symptomsData.map((symptom, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={symptom.description}
                                    checked={this.state[symptom.code]}
                                    onPress={async () => {
                                        await this.setState({
                                            [symptom.code]: !this.state[symptom.code]
                                        })
                                        if (this.state[symptom.code] == true) {
                                            let symptomsClone = this.state.symptoms.slice(); //creates the clone of the state
                                            symptomsClone[index] = symptom.code;
                                            await this.setState({ symptoms: symptomsClone });
                                            //console.warn(symptom.description + ": " + this.state[symptom.code])
                                        } else {
                                            let symptomsClone = this.state.symptoms.slice(); //creates the clone of the state
                                            symptomsClone[index] = null;
                                            await this.setState({ symptoms: symptomsClone });
                                            //console.warn(symptom.description + ": " + this.state[symptom.code])
                                        }
                                    }}
                                />
                            )
                        })
                        : null}
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>{translate("badReport.answerQuestions")}</Text>
                    </View>
                    <CheckBox
                        title={translate("badReport.checkboxes.first")}
                        checked={this.state.contactWithSymptom}
                        onPress={async () => await this.setState({ contactWithSymptom: !this.state.contactWithSymptom })}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.second")}
                        checked={this.state.lookedForHospital}
                        onPress={async () => await this.setState({ lookedForHospital: !this.state.lookedForHospital })}
                    />
                    <CheckBox
                        title={translate("badReport.checkboxes.third")}
                        checked={this.state.hadTraveled}
                        onPress={async () => await this.setState({ hadTraveled: !this.state.hadTraveled })}
                    />
                    {traveledTrue}
                    <View style={styles.buttonView}>
                        <Button title={translate("badReport.checkboxConfirm")} color="#348EAC" onPress={() => {
                            if (this.state.date !== null) {
                                this.sendSurvey()
                                //console.warn(this.state.today_date)
                                //console.warn(this.state.symptoms)
                                //console.warn("Viajou:" + this.state.hadTraveled)
                                //console.warn("Procurou:" + this.state.lookedForHospital)
                                //console.warn("Contato:" + this.state.contactWithSymptom)
                            }
                            else {
                                alert(translate("badReport.checkboxDateConfirmation"));
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
        marginTop: 10,
        marginBottom: 12,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#465F6C'
    },
    dateText: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'roboto',
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
        fontFamily: 'roboto',
    }
});

//make this component available to the app
export default BadReport;
