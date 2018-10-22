import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    ScrollView,
    Button,
    Picker,
    AsyncStorage,
    Keyboard,
    NetInfo,
    Alert
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import * as Imagem from '../../imgs/imageConst';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { app_token } from '../../constUtils';
import AwesomeAlert from 'react-native-awesome-alerts';
import Emoji from 'react-native-emoji';
import { scale } from '../scallingUtils';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;
let minDate = (y - 13) + "-" + m + "-" + d;
let tomorrow = y + "-" + m + "-" + (d + 1)

class Registrar extends Component {
    static navigationOptions = {
        title: "Registro"
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
        this.state.userEmail && this.state.userPwd && this.state.userFirstName && this.state.userLastName && this.state.userDob ? validation = true : validation = false
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? validation ? this.create() : Alert.alert('Erro', 'Todos os campos devem ser preenchidos') : Alert.alert(
                'Sem Internet!',
                'Poxa parece que você não tem internet, tenta de novo mais tarde ok.',
                [
                    { text: 'Ok, vou tentar mais tarde', onPress: () => null }
                ]
            )
        });
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            this.setState({ userFirstName: result.first_name, userLastName: result.last_name, userEmail: result.email, userPwd: result.id, pic: result.picture.data.url, loginOnFB: 'true' });
            //Salva as informações para ir parar proxima página
            AsyncStorage.setItem('loginOnFB', this.state.loginOnFB);
            AsyncStorage.setItem('userName', this.state.userFirstName);
            AsyncStorage.setItem('userLastName', this.state.userLastName);
            AsyncStorage.setItem('userEmail', this.state.userEmail);
            AsyncStorage.setItem('userPwd', this.state.userPwd);
            AsyncStorage.setItem('avatar', this.state.pic);
            this.props.navigation.navigate('AddInfo');
        }
    }

    render() {
        const { showAlert } = this.state;

        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
                <ScrollView style={styles.scroll}>
                    <View style={{ paddingTop: 10 }}></View>
                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Nome:</Text>
                        <TextInput style={styles.formInput}
                            returnKeyType='next'
                            onSubmitEditing={() => this.sobrenomeInput.focus()}
                            onChangeText={text => this.setState({ userFirstName: text })}
                        />
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Sobrenome:</Text>
                        <TextInput style={styles.formInput}
                            ref={(input) => this.sobrenomeInput = input}
                            onChangeText={text => this.setState({ userLastName: text })}
                        />
                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Sexo:</Text>
                            <Picker
                                selectedValue={this.state.userGender}
                                style={styles.selectSexoRaca}
                                onValueChange={(itemValue, itemIndex) => this.setState({ userGender: itemValue })}>
                                <Picker.Item label="Masculino" value="Masculino" />
                                <Picker.Item label="Feminino" value="Femenino" />
                            </Picker>
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Raça:</Text>
                            <Picker
                                selectedValue={this.state.userRace}
                                style={styles.selectSexoRaca}
                                onValueChange={(itemValue, itemIndex) => this.setState({ userRace: itemValue })}>
                                <Picker.Item label="Branco" value="Blanco" />
                                <Picker.Item label="Indigena" value="Indígena" />
                                <Picker.Item label="Mestiço" value="Mestizo" />
                                <Picker.Item label="Negro, mulato ou afrodescendente" value="Negro, mulato o afrodescendiente" />
                                <Picker.Item label="Palenquero" value="Palenquero" />
                                <Picker.Item label="Raizal" value="Raizal" />
                                <Picker.Item label="Rom-Gitano" value="Rom-Gitano" />
                            </Picker>
                        </View>

                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Nascimento:</Text>
                            <DatePicker
                                style={{ width: '80%', height: scale(25), backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                                showIcon={false}
                                date={this.state.userDob}
                                androidMode='spinner'
                                mode="date"
                                placeholder="DD/MM/AAAA"
                                format="YYYY-MM-DD"
                                minDate="1918-01-01"
                                maxDate={minDate}
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
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
                            <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>País:</Text></View>
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

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Email:</Text>
                        <TextInput
                            style={styles.formInput}
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ userEmail: email })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Senha:</Text>
                        <TextInput style={styles.formInput}
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ userPwd: text })}
                            ref={(input) => this.passwordInput = input}
                        />
                    </View>

                    <View style={styles.buttonView}>
                        <Button
                            title="Registrar"
                            color="#348EAC"
                            onPress={this._isconnected} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ paddingBottom: 10, paddingTop: 10, textAlign: 'center', paddingBottom: 5, fontFamily: 'roboto', fontSize: 15, color: '#465F6C' }}>
                            Cadastar com Facebook
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
                                                    '/me?fields=name,first_name,last_name,email,picture,id',
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

                </ScrollView>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? 'Cadastrando...' : <Text>Obrigado! {emojis[1]}{emojis[1]}{emojis[1]}</Text>}
                    message={this.state.showProgressBar ? null : <Text style={{ alignSelf: 'center' }}>Seu relato foi enviado {emojis[0]}{emojis[0]}{emojis[0]}</Text>}
                    closeOnTouchOutside={this.state.showProgressBar ? false : true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                    cancelText="No, cancel"
                    confirmText="Voltar"
                    confirmButtonColor="#DD6B55"
                    // onCancelPressed={() => {
                    //     this.hideAlert();
                    // }}
                    // onConfirmPressed={() => {
                    //     this.props.navigation.navigate('Home')
                    // }}
                    // onDismiss={() => this.props.navigation.navigate('Home')}
                />
            </ImageBackground>
        );

    }
    create = () => {
        Keyboard.dismiss()
        this.showAlert()
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
                    this.setState({ loginOnApp: 'true' })
                    AsyncStorage.setItem('userName', this.state.userFirstName);
                    AsyncStorage.setItem('avatar', this.state.pic);
                    alert("Registrado com Sucesso")
                    this.loginAfterCreate();
                } else {
                    alert(response.message);
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
                    this.hideAlert();
                    this.props.navigation.navigate('Home');
                } else {
                    alert(responseJson.message)
                }
            })
            .done();
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
        height: 550
    },
    titulo: {
        color: 'white',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        marginRight: '30%',
    },
    viewLogo: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
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
