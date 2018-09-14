import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, ScrollView, Button, TouchableOpacity, Picker, AsyncStorage, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal'
import DatePicker from 'react-native-datepicker'
import * as Imagem from '../../imgs/imageConst'
import { LoginManager } from 'react-native-fbsdk';


let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class AddInfo extends Component {
    static navigationOptions = {
        title: "Informações Adicionais"
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
            userApp: 'd41d8cd98f00b204e9800998ecf8427e',
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
        if (this.state.sessionStart === null ){
        LoginManager.logOut();
        alert("Cadastro Cancelado")
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
                        <Text style={styles.titleText}>Olá {this.state.userFirstName} {this.state.userLastName}!</Text>
                        <Text style={styles.subTitleText}>Precisamos de algumas informações adicionais para completar o cadastro</Text>
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
                                style={{ width: '80%', height: 30, backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                                showIcon={false}
                                date={this.state.userDob}
                                androidMode='spinner'
                                mode="date"
                                placeholder="DD/MM/AAAA"
                                format="YYYY-MM-DD"
                                minDate="1918-01-01"
                                maxDate={today}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        marginBottom: 10,
                                        fontFamily: 'poiretOne',
                                        fontSize: 17
                                    },
                                    placeholderText: {
                                        marginBottom: 10,
                                        fontFamily: 'poiretOne',
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

                    <View style={styles.buttonView}>
                        <Button
                            title="Finalizar Cadastro"
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
                    alert("Registrado via Facebook com Sucesso")
                    AsyncStorage.removeItem('userLastName');
                    AsyncStorage.removeItem('userEmail');
                    AsyncStorage.removeItem('userPwd');
                    this.setState({sessionStart: 'true'})
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
        fontFamily: 'poiretOne',
        fontWeight: '400',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: "5%",
    },
    titleText: {
        fontSize: 23,
        fontFamily: 'poiretOne',
        fontWeight: '400',
        color: '#465F6C',
        alignSelf: 'center',
        marginTop: 10,
    },
    subTitleText: {
        fontSize: 21,
        fontFamily: 'poiretOne',
        fontWeight: '400',
        color: '#465F6C',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    commomTextView: {
        fontSize: 17,
        fontFamily: 'poiretOne',
        fontWeight: '400',
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
        fontFamily: 'poiretOne',
        fontWeight: '400',
    }
});

//make this component available to the app
export default AddInfo;
