import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, ScrollView, Alert, AsyncStorage, Keyboard, NetInfo } from 'react-native';
import * as Imagem from '../../imgs/imageConst'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';
import translate from '../../../locales/i18n';

class Login extends Component {
    static navigationOptions = {
        title: translate('login.title'),
    }
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: null,
            userEmail: null,
            userPwd: null,
            loginOnFB: null,
            loginOnApp: null,
            pic: "http://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg",
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
                    {text: translate("login.noInternet.alertAllRightMessage"), onPress: () => null}
                ]
            )
        });
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            console.warn('Error fetching data: ' + error.toString());
        } else {
            this.setState({ userFirstName: result.first_name, userEmail: result.email, userPwd: result.id, pic: result.picture.data.url, loginOnFB: 'true' });
            this.login()
        }
    }

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView>
                <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
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
                                //onPress={this._isconnected} //Retirado para conseguir usar o emulador IOS
                                onPress={this.login}
                                />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Text style={{ textAlign: 'center', paddingBottom: 5, fontFamily: 'roboto', fontSize: 15, color: '#465F6C' }}>
                                {translate("login.connectWithFacebook")}
                    </Text>
                            <LoginButton
                                readPermissions={['public_profile', 'email']}
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            alert(translate("login.facebookLogin.error") + result.error);
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(
                                                (data) => {
                                                    const infoRequest = new GraphRequest(
                                                        '/me?fields=first_name,email,picture,id',
                                                        null,
                                                        this._responseInfoCallback
                                                    );
                                                    // Start the graph request.
                                                    new GraphRequestManager().addRequest(infoRequest).start();
                                                }
                                            )
                                        }
                                    }
                                }
                                onLogoutFinished={() => { null }} />
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
                </ImageBackground>
            </ScrollView>
        );
    }

    login = () => {
            this.showAlert();

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
                        if (this.state.loginOnFB === 'true') {
                            AsyncStorage.setItem('userID', responseJson.user.id);
                            AsyncStorage.setItem('loginOnFB', this.state.loginOnFB);
                            AsyncStorage.setItem('avatar', this.state.pic);
                            AsyncStorage.setItem('userName', this.state.userFirstName);
                            AsyncStorage.setItem('userHousehold', JSON.stringify(responseJson.user.household));
                            this.props.navigation.navigate('Home');
                            // alert("Logado via Facebook")
                        } else {
                            Keyboard.dismiss()
                            this.hideAlert()
                            this.setState({ loginOnApp: 'true' })
                            AsyncStorage.setItem('loginOnApp', this.state.loginOnApp);
                            AsyncStorage.setItem('userID', responseJson.user.id);
                            AsyncStorage.setItem('userToken', responseJson.token);
                            AsyncStorage.setItem('userName', responseJson.user.firstname);
                            AsyncStorage.setItem('userSurveys', responseJson.user.surveys);
                            AsyncStorage.setItem('avatar', this.state.pic);
                            AsyncStorage.setItem('userHousehold', JSON.stringify(responseJson.user.household));
                            this.props.navigation.navigate('Home');
                        }
    
    
                    } else {
                        if (this.state.loginOnFB === 'true') {
                            alert(responseJson.message)
                            this.setState({ userFirstName: null, userEmail: null, userPwd: null, pic: null, loginOnFB: null });
                            LoginManager.logOut();
                        } else {
                            this.hideAlert()
                            alert(responseJson.message)
                        }
                    }
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
