import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    AsyncStorage,
    NetInfo,
    Alert
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { scale } from '../scallingUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class Registrar extends Component {
    static navigationOptions = {
        title: "Adicionar Perfil"
    }
    constructor(props) {
        super(props);
        this.getInfos();
        this.state = {
            statusCode: null,
            kinship: 'pai',
            householdName: null,
            householdGender: 'Masculino',
            householdCountry: 'Brazil',
            householdRace: 'Blanco',
            householdDob: null,
            userID: null,
            cca2: 'BR',
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
        let validation = false
        this.state.householdName && this.state.householdDob ? validation = true : validation = false
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? validation ? this.create() : Alert.alert(translate("register.errorMessages.error"), translate("register.errorMessages.allFieldsAreFilled")) : Alert.alert(
                translate("register.noInternet.noInternet"),
                translate("register.noInternet.ohNo"),
                [
                    { text: translate("register.alertAllRightMessage"), onPress: () => null }
                ]
            )
        });
    }

    getInfos = async () => {
        let userID = await AsyncStorage.getItem('userID');
        this.setState({ userID });
    }

    render() {
        const { showAlert } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ paddingTop: 10 }}></View>
                <View style={styles.viewCommom}>
                    <Text style={styles.commomText}>{translate("register.name")}</Text>
                    <TextInput style={styles.formInput}
                        onChangeText={text => this.setState({ householdName: text })}
                    />
                </View>

                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                        <Picker
                            selectedValue={this.state.householdGender}
                            style={styles.selectSexoRaca}
                            onValueChange={(itemValue) => this.setState({ householdGender: itemValue })}>
                            <Picker.Item label={translate("genderChoices.male")} value="Masculino" />
                            <Picker.Item label={translate("genderChoices.female")} value="Femenino" />
                        </Picker>
                    </View>

                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                        <Picker
                            selectedValue={this.state.householdRace}
                            style={styles.selectSexoRaca}
                            onValueChange={(itemValue) => this.setState({ householdRace: itemValue })}>
                            <Picker.Item label={translate("raceChoices.white")} value="Blanco" />
                            <Picker.Item label={translate("raceChoices.indian")} value="Indígena" />
                            <Picker.Item label={translate("raceChoices.mix")} value="Mestizo" />
                            <Picker.Item label={translate("raceChoices.black")} value="Negro, mulato o afrodescendiente" />
                            <Picker.Item label={translate("raceChoices.palenquero")} value="Palenquero" />
                            <Picker.Item label={translate("raceChoices.raizal")} value="Raizal" />
                            <Picker.Item label={translate("raceChoices.romGitano")} value="Rom-Gitano" />
                        </Picker>
                    </View>

                </View>

                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("register.birth")}</Text>
                        <DatePicker
                            style={{ width: '80%', height: scale(25), backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                            showIcon={false}
                            date={this.state.householdDob}
                            androidMode='spinner'
                            mode="date"
                            placeholder={translate("birthDetails.format")}
                            format="YYYY-MM-DD"
                            minDate="1918-01-01"
                            maxDate={today}
                            confirmBtnText={translate("birthDetails.confirmButton")}
                            cancelBtnText={translate("birthDetails.cancelButton")}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    marginBottom: 10,
                                    fontFamily: 'roboto',
                                    fontSize: 17
                                },
                                placeholderText: {
                                    marginBottom: 15,
                                    fontFamily: 'roboto',
                                    fontSize: 15,
                                    color: 'black'
                                }
                            }}
                            onDateChange={date => this.setState({ householdDob: date })}
                        />
                    </View>

                    <View style={styles.viewChildPais}>
                        <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>{translate("register.country")}</Text></View>
                        <View>
                            <CountryPicker
                                onChange={value => {
                                    this.setState({ cca2: value.cca2, householdCountry: value.name })
                                }}
                                cca2={this.state.cca2}
                                translation="eng"
                            />
                            <Text style={styles.textCountry}>{this.state.householdCountry}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.viewCommom}>
                    <Text style={styles.commomText}>Parentesco:</Text>
                    <Picker
                        selectedValue={this.state.kinship}
                        style={{ width: "95%" }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ kinship: itemValue })}>
                        <Picker.Item label="Pai" value="Pai" />
                        <Picker.Item label="Mãe" value="Mãe" />
                        <Picker.Item label="Filhos" value="Filhos" />
                        <Picker.Item label="Irmãos" value="Irmãos" />
                        <Picker.Item label="Avós" value="Avós" />
                        <Picker.Item label="Outros" value="Outros" />
                    </Picker>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="criar"
                        color="#348EAC"
                        onPress={this._isconnected} />
                </View>


                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? translate("register.awesomeAlert.registeringMessage") : null}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                />
            </View>
        );

    }

    create = () => {
        this.showAlert();
        fetch(`${API_URL}/households/`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    description: this.state.householdName,
                    birthdate: this.state.householdDob,
                    country: this.state.householdCountry,
                    gender: this.state.householdGender,
                    race: this.state.householdRace,
                    kinship: this.state.kinship,
                    user_id: this.state.userID
                }
            )
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 201) {
                    alert("CRIADO");
                    this.hideAlert();
                    this.props.navigation.navigate('Home');
                } else {
                    this.hideAlert();
                    alert("Algo deu errado");
                }
            })
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550
    },
    viewCommom: {
        width: '100%',
        height: 65,
        alignItems: 'center',
    },
    viewRow: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
    },
    viewChildSexoRaca: {
        width: "50%",
        height: 65,
        alignItems: 'center',
    },
    viewChildPais: {
        width: "50%",
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    viewChildData: {
        width: "50%",
        height: 65,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
    },
    selectSexoRaca: {
        width: "80%",
    },
    formInput: {
        width: "90%",
        height: 35,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC',
        paddingBottom: 0,
        paddingTop: 2,
    },
    commomText: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: "5%",
    },
    commomTextView: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: '10%',
    },
    buttonView: {
        width: "60%",
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    textCountry: {
        fontSize: 15,
        fontFamily: 'roboto',
    }
});

//make this component available to the app
export default Registrar;
