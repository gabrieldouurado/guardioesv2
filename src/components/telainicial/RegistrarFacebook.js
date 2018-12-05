import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, Picker, AsyncStorage } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import * as Imagem from '../../imgs/imageConst';
import { LoginManager } from 'react-native-fbsdk';
import { app_token } from '../../constUtils';
import translate from '../../../locales/i18n';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

let minDate = (y - 13) + "-" + m + "-" + d;

class AddInfo extends Component {
    static navigationOptions = {
        title: translate("facebookRegister.title")
    }
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: null,
            userLastName: null,
            userEmail: null,
            userPwd: null,
            userGender: 'Masculino',
            userCountry: 'Brazil',
            userRace: 'Blanco',
            userDob: null,
            userApp: app_token,
            cca2: 'BR',
            loginOnFB: null,
            sessionStart: null,
            pic: "http://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg"
        }
    }

    componentDidMount() {
        this._getInfos()
    }

    componentWillUnmount() {
        if (this.state.sessionStart === null) {
            LoginManager.logOut();
            // alert("Cadastro Cancelado")
        }
    }

    _getInfos = async () => {
        let valueAvatar = await AsyncStorage.getItem('avatar');
        let valueFB = await AsyncStorage.getItem('loginOnFB');
        let valueName = await AsyncStorage.getItem('userName');
        let valueLastName = await AsyncStorage.getItem('userLastName');
        let valueEmail = await AsyncStorage.getItem('userEmail');
        let valuePwd = await AsyncStorage.getItem('userPwd');
        this.setState({ pic: valueAvatar, loginOnFB: valueFB, userFirstName: valueName, userLastName: valueLastName, userEmail: valueEmail, userPwd: valuePwd });
    }

    render() {
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>

                <View>
                    <Text style={styles.titleText}>{translate("facebookRegister.hello")}{this.state.userFirstName} {this.state.userLastName}!</Text>
                    <Text style={styles.subTitleText}>{translate("facebookRegister.moreInformation")}</Text>
                </View>

                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("facebookRegister.gender")}</Text>
                        <Picker
                            selectedValue={this.state.userGender}
                            style={styles.selectSexoRaca}
                            onValueChange={(itemValue) => this.setState({ userGender: itemValue })}>
                            <Picker.Item label={translate("genderChoices.male")} value="Masculino" />
                            <Picker.Item label={translate("genderChoices.female")} value="Femenino" />
                        </Picker>
                    </View>

                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("genderChoices.male")}</Text>
                        <Picker
                            selectedValue={this.state.userRace}
                            style={styles.selectSexoRaca}
                            onValueChange={(itemValue) => this.setState({ userRace: itemValue })}>
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
                        <Text style={styles.commomTextView}>{translate("facebookRegister.birthday")}</Text>
                        <DatePicker
                            style={{ width: '80%', height: 30, backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                            showIcon={false}
                            date={this.state.userDob}
                            androidMode='spinner'
                            mode="date"
                            placeholder={translate("birthDetails.format")}
                            format="YYYY-MM-DD"
                            minDate="1918-01-01"
                            maxDate={minDate}
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
                                    marginBottom: 10,
                                    fontFamily: 'roboto',
                                    fontSize: 15,
                                    color: 'black'
                                }
                            }}
                            onDateChange={date => this.setState({ userDob: date })}
                        />
                    </View>

                    <View style={styles.viewChildPais}>
                        <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>{translate("facebookRegister.country")}</Text></View>
                        <View>
                            <CountryPicker
                                onChange={value => {
                                    this.setState({ cca2: value.cca2, userCountry: value.name })
                                }}
                                cca2={this.state.cca2}
                                translation="eng"
                            />
                            <Text style={styles.textCountry}>{this.state.userCountry}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonView}>
                    <Button
                        title={translate("facebookRegister.finishRegistering")}
                        color="#3B5998"
                        onPress={this.create} />
                </View>

            </ImageBackground>
        );

    }
    create = () => {
        fetch('https://guardianes.centeias.net/user/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.userFirstName,
                lastname: this.state.userLastName,
                email: this.state.userEmail,
                password: this.state.userPwd,
                gender: this.state.userGender,
                country: this.state.userCountry,
                race: this.state.userRace,
                dob: this.state.userDob,
                app: this.state.userApp,
            })
        })
            .then((response) => response.json())
            .then(response => {
                if (response.error === false) {
                    AsyncStorage.removeItem('userLastName');
                    AsyncStorage.removeItem('userEmail');
                    AsyncStorage.removeItem('userPwd');
                    this.setState({ sessionStart: 'true' })
                    this.loginAfterCreate();
                } else {
                    alert(response.message);
                    //Apaga as informações Salvas
                    AsyncStorage.removeItem('userName');
                    AsyncStorage.removeItem('userLastName');
                    AsyncStorage.removeItem('userEmail');
                    AsyncStorage.removeItem('userPwd');
                    AsyncStorage.removeItem('avatar');
                    AsyncStorage.removeItem('loginOnFB');

                    //Desloga do facebook                    
                    LoginManager.logOut();
                }
            })
    }

    loginAfterCreate = () => {
        fetch('https://guardianes.centeias.net/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.userEmail,
                password: this.state.userPwd
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    AsyncStorage.setItem('userID', responseJson.user.id);
                    AsyncStorage.setItem('userHousehold', JSON.stringify(responseJson.user.household));
                    AsyncStorage.setItem('RunTutorial', 'true');
                    this.props.navigation.navigate('Home');
                } else {
                    alert(responseJson.message)
                }
            })
            .done();
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550
    },
    scroll: {
        flex: 1,
        width: '100%',
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
        borderBottomColor: '#9B6525',
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
    titleText: {
        fontSize: 23,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'center',
        marginTop: 10,
    },
    subTitleText: {
        fontSize: 21,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
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
export default AddInfo;
