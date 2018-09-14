import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import * as Imagem from '../../imgs/imageConst'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';


class Login extends Component {
    static navigationOptions = {
        title: "Login",
    }
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: null,
            userEmail: null,
            userPwd: null,
            loginOnFB: null,
            loginOnApp: null,
            pic: "http://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg"
        }
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
        return (
            <ImageBackground style={styles.container} imageStyle={{resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={Imagem.imagemLogo} />
                </View>
                <View style={styles.viewForm}>
                    <Text style={styles.commomText}>E-mail:</Text>
                    <TextInput
                        style={styles.formInput}
                        returnKeyType='next'
                        keyboardType='email-address'
                        multiline={false} maxLength={33}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({ userEmail: text })}
                    />
                    <Text style={styles.commomText}>Senha:</Text>
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
                            title="Entrar"
                            color="#9B6525"
                            onPress={this.login} />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 5, fontFamily: 'poiretOne', fontSize: 15, color: '#465F6C' }}>
                            Conectar Via Facebook
                    </Text>
                        <LoginButton
                            readPermissions={['public_profile', 'email']}
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        alert("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        alert("login is cancelled.");
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
            </ImageBackground>
        );
    }

    login = () => {
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
                        AsyncStorage.setItem('userHousehold', this.state.userHousehold);
                        this.props.navigation.navigate('Home');
                        alert("Logado via Facebook")
                    } else {
                        Keyboard.dismiss()
                        this.setState({ loginOnApp: 'true' })
                        AsyncStorage.setItem('loginOnApp', this.state.loginOnApp);
                        AsyncStorage.setItem('userID', responseJson.user.id);
                        AsyncStorage.setItem('userToken', responseJson.token);
                        AsyncStorage.setItem('userName', responseJson.user.firstname);
                        AsyncStorage.setItem('userHousehold', this.state.userHousehold);
                        AsyncStorage.setItem('avatar', this.state.pic);
                        this.props.navigation.navigate('Home');
                        alert(responseJson.token)
                    }


                } else {
                    if (this.state.loginOnFB === 'true') {
                        alert(responseJson.message)
                        this.setState({ userFirstName: null, userEmail: null, userPwd: null, pic: null, loginOnFB: null });
                        LoginManager.logOut();
                    } else {
                        alert(responseJson.message)
                    }
                }
            })
            .done();
    }
}

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
        borderBottomColor: '#9B6525',
        paddingBottom: 0,
        paddingTop: 2,
    },
    commomText: {
        fontFamily: 'poiretOne',
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
        width: '40%',
        resizeMode: 'center',
    }
});

//make this component available to the app
export default Login;
