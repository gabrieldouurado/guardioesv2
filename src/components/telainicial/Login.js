import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Imagem from '../../imgs/imageConst'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "exemplo@dominio.com",
            userPwd: "123456",
            userFirst_name: null,
            userLast_name: null,
            userEmailFB: null
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate
        }
    }

    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            alert('First Name: ' + result.first_name + ' Last Name: ' + result.last_name + ' Email: ' + result.email);
            this.setState({ userFirst_name: result.first_name, userLast_name: result.last_name, userEmailFB: result.email });
            AsyncStorage.setItem('avatar', result.picture.data.url);
            this.props.navigation.navigate('Home')
        }
    }


    render() {
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={Imagem.imagemFundo}>

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
                    <TouchableOpacity onPress={() => { alert("ESQUECEU SUA SENHA") }}>
                        <Text>Esqueceu sua Senha?</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonView}>
                        <Button
                            style={styles.button}
                            title="Entrar"
                            onPress={
                                //this.props.navigation.navigate('Home')
                                this.login
                                
                            } />
                    </View>
                    <View style={{ paddingTop: 20 }}>
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
                                                    '/me?fields=first_name,last_name,email,picture',
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
                            onLogoutFinished={() => { }} />
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
        .then( (response) => response.json())
        .then( (responseJson) => {
            if (responseJson.error === false) {
              AsyncStorage.setItem('user', responseJson.user);
              Keyboard.dismiss()
              this.props.navigation.navigate('Home');
              alert(responseJson.token)
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
        height: 680,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    margTop: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#0084b4',
        height: 50,
        justifyContent: 'space-between'
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
    backButton: {
        alignSelf: 'center',
        marginLeft: 10,
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
        //height: 31,
        width: '90%',
        fontSize: 20,
        borderColor: 'gray',
        borderBottomWidth: 2,
        borderBottomColor: '#008080',
        paddingBottom: 2,
        paddingTop: 2,
    },
    commomText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: "5%",
        fontWeight: 'bold',
    },
    button: {
        //ESTILIZAR BOTÃO
    },
    buttonView: {
        marginTop: 20,
        width: "60%",
    },
    imageLogo: {
        flex: 1,
        marginTop: 20,
        width: '50%',
        resizeMode: 'center',
    }
});

//make this component available to the app
export default Login;
