import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    Picker,
    AsyncStorage,
    Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import * as Imagem from '../../imgs/imageConst';

class FloatingLabelInput extends Component {
    state = {
        isFocused: false
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200
        }).start();
    }

    render() {
        const { label, ...props } = this.props;
        const labelStyle = {
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 15]
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#000']
            }),
            position: 'absolute',
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0]
            }),
            left: 0,
            alignSelf: 'flex-start',
            textAlign: 'left',
            paddingLeft: "5%",
            fontWeight: 'bold',
        };
        return (
            <View style={{ paddingTop: 18, alignItems: 'center', }}>
                <Animated.Text style={labelStyle}>{label}</Animated.Text>
                <TextInput
                    {...props}
                    style={styles.formInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </View>
        );
    }
}

class Registrar extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: '#3B8686'
    }
    constructor(props) {
        super(props);
        this.state = {
            Nome: '',
            Sobrenome: '',
            Email: '',
            Senha: '',
            Sexo: 'Masculino',
            País: 'Brazil',
            Raça: 'Blanco',
            userDob: '',
            userApp: 'd41d8cd98f00b204e9800998ecf8427e',
            cca2: 'BR',
        }

        this.atualizaValor = this.atualizaValor.bind(this)
    }
    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('Home')
        }
    }

    atualizaValor(texto) {
        console.log(texto)
    }

    render() {
        const back = (<Ionicons name='md-arrow-round-back' size={30} />)
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={Imagem.imagemFundo}>
                <ScrollView style={styles.scroll}>

                    <FloatingLabelInput
                        label='Nome'
                        value={this.state.Nome}
                        onChangeText={text => this.setState({ Nome: text })}
                    />

                    <FloatingLabelInput
                        label='Sobrenome'
                        value={this.state.Sobrenome}
                        onChangeText={text => this.setState({ Sobrenome: text })}
                    />

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
                        <View style={styles.viewChildData}>

                            <DatePicker
                                style={{ width: '80%' }}
                                date={this.state.userDob}
                                androidMode='spinner'
                                mode="date"
                                placeholder="Nascimento"
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate="01-01-2019"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={date => this.setState({ userDob: date })}
                            />
                        </View>

                        <View style={styles.viewChildPais}>
                            <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>País:</Text></View>
                            <View><CountryPicker
                                onChange={value => {
                                    this.setState({ cca2: value.cca2, userCountry: value.name })
                                }}
                                cca2={this.state.cca2}
                                translation="eng"
                            /></View>
                        </View>
                    </View>

                    <FloatingLabelInput
                        label='Email'
                        value={this.state.Email}
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ Email: text })}
                    />

                    <FloatingLabelInput
                        label='Senha'
                        secureTextEntry
                        value={this.state.Senha}
                        returnKeyType='next'
                        onChangeText={text => this.setState({ Senha: text })}
                        onSubmitEditing={this.create}
                    />

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.enviar}
                            onPress={this.create}
                        >
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
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
                firstname: this.state.Nome,
                lastname: this.state.Sobrenome,
                email: this.state.Email,
                password: this.state.Senha,
                gender: this.state.Sexo,
                country: this.state.País,
                race: this.state.Raça,
                dob: this.state.userDob,
                app: this.state.userApp,
            })
        })
            .then((response) => response.json())
            .then(response => {
                if (response.error === false) {
                    this.props.navigation.navigate('Reportar');
                }
                else {
                    alert(response.message);
                }
            })

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    margTop: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#4169E1',
        height: 50,
        justifyContent: 'space-between'
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
    backButton: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    viewLogo: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
    },
    scroll: {
        flex: 1,
        paddingTop: '10%',
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
        fontSize: 20,
        borderColor: 'gray',
        borderBottomWidth: 2,
        borderBottomColor: '#008080',
        paddingBottom: 2,
        paddingTop: 2,
    },
    formData: {
        width: "80%",
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
    commomTextView: {
        fontSize: 15,
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: '10%',
        fontWeight: 'bold',
    },
    buttonView: {
        height: '8%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: "60%",
    },
    imageLogo: {
        flex: 1,
        marginTop: 20,
        width: '35%',
        resizeMode: 'center',
    },
    enviar: {
        backgroundColor: 'skyblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    }
});

//make this component available to the app
export default Registrar;
