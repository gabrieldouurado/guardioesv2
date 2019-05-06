import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, ScrollView, Alert, AsyncStorage, Keyboard, NetInfo } from 'react-native';
import * as Imagem from '../../imgs/imageConst'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';

class Login extends Component {
    static navigationOptions = {
        title: translate('login.title'),
    }
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,
            userPwd: null,
            userToken: null,
            statusCode: null,
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
        this.state.userEmail && this.state.userPwd ? validation = true : validation = false
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? validation ? this.login() : Alert.alert(translate("login.errorMessages.emailPwdWrong"), translate("login.errorMessages.emailPwdCantBeBlank")) : Alert.alert(
                translate("login.noInternet.noInternetConnection"),
                translate("login.noInternet.ohNo"),
                [
                    { text: translate("login.noInternet.alertAllRightMessage"), onPress: () => null }
                ]
            )
        });
    }

    render() {
        const { showAlert } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={Imagem.imagemLogoC} />
                </View>
                <View style={styles.viewForm}>
                    <Text style={styles.commomText}>{translate('login.email')}</Text>
                    <TextInput
                        style={styles.formInput}
                        autoCapitalize='none'
                        returnKeyType='next'
                        keyboardType='email-address'
                        multiline={false} maxLength={33}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({ userEmail: text })}
                    />
                    <Text style={styles.commomText}>{translate("login.password")}</Text>
                    <TextInput
                        style={styles.formInput}
                        secureTextEntry={true}
                        multiline={false}
                        maxLength={15}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(text) => this.setState({ userPwd: text })}
                    />
                    <View style={styles.buttonView}>
                        <Button
                            title={translate("login.loginbutton")}
                            color="#348EAC"
                            onPress={this._isconnected} />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 5, fontFamily: 'roboto', fontSize: 15, color: '#465F6C' }}>
                            {translate("login.connectWithFacebook")}
                        </Text>
                    </View>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? translate("login.awesomeAlert.accessing") : null}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}

                    confirmButtonColor="#DD6B55"
                />
            </View>
        );
    }

    //Login Function 
    login = () => {
        Keyboard.dismiss()
        this.showAlert()
        return fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    email: this.state.userEmail,
                    password: this.state.userPwd
                }
            })
        })
            .then((response) => {
                this.setState({ userToken: response.headers.map.authorization, statusCode: response.status })
                if (this.state.statusCode == 200) {
                    return response.json()
                } else {
                    alert("Algo deu errado");
                    this.hideAlert();
                }
            })
            .then((responseJson) => {
                AsyncStorage.setItem('userID', responseJson.user.id.toString());
                AsyncStorage.setItem('userName', responseJson.user.user_name);
                AsyncStorage.setItem('userToken', this.state.userToken);
                AsyncStorage.setItem('appID', responseJson.user.app.id.toString());

                this.props.navigation.navigate('Home');
                this.hideAlert();
            })
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        marginRight: '40%',
    },
    viewImage: {
        flex: 2.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    viewForm: {
        flex: 4,
        width: "100%",
        alignItems: 'center',
    },
    formInput: {
        width: '90%',
        height: 35,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC',
        paddingBottom: 0,
        paddingTop: 2,
    },
    commomText: {
        fontFamily: 'roboto',
        fontWeight: '400',
        fontSize: 20,
        color: '#465F6C',
        marginTop: '3%'
    },
    buttonView: {
        marginTop: 30,
        width: "60%",
    },
    imageLogo: {
        flex: 1,
        marginTop: 9,
        width: '80%',
        resizeMode: 'center',
    }
});

//make this component available to the app
export default Login;
