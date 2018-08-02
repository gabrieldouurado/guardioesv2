import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const imageLogo = require('../../imgs/logo.png')
const imageFundo = require('../../imgs/fundo.png')

// create a component
class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            emailValidate: '',
            senhaValidate: '',
        }
    }
    render() {
        const back = (<Ionicons name='md-arrow-round-back' size={30} />)
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={imageFundo}>

                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={imageLogo} />
                </View>
                <View style={styles.viewForm}>
                    <Text style={styles.commomText}>E-mail:</Text>
                    <TextInput style={styles.formInput} keyboardType='email-address' multiline={false} maxLength={33}
                        onChangeText={text => {
                            if (text === this.state.email) {
                                this.setState({ emailValidate: this.state.email })
                            }
                        }
                        }
                    />
                    <Text style={styles.commomText}>Senha:</Text>
                    <TextInput style={styles.formInput} secureTextEntry={true} multiline={false} maxLength={15}
                        onChangeText={text => {
                            if (text === this.state.senha) {
                                this.setState({ senhaValidate: this.state.senha })
                            }
                        }
                        }
                    />
                    <TouchableOpacity onPress={() => { alert("ESQUECEU SUA SENHA") }}>
                        <Text>Esqueceu sua Senha?</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonView}>
                        <Button style={styles.button} title="Entrar" onPress={() => {
                            if (this.state.emailValidate === this.state.email && this.state.senhaValidate === this.state.senha) {
                                this.props.navigation.navigate('Report')
                            }
                            else {
                                alert("USUARIO OU SENHA INCORRETA")
                            }
                        }
                        } />
                    </View>
                </View>
            </ImageBackground>
        );
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
