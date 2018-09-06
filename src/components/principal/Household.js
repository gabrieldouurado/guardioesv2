import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    Keyboard
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal'
import DatePicker from 'react-native-datepicker'
import * as Imagem from '../../imgs/imageConst'

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();
let today = d + "-" + m + "-" + y;

const fetchData = () => {
    fetch("https://guardianes.centeias.net/user/household/5b6db008abbd4916002b97f0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then( (response) => {
            if (!response.ok) {
                throw Error(response.error);
            }
            return response;
        }).then( (response) => {
            console.log(response);
        }).catch( (error) => {
            console.log(error);
        });
}

class Household extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            householdFirstName: null,
            householdLastName: null,
            parentesco: 'pai',
            householdGender: 'Masculino',
            householdRace: 'Blanco',
            householdDob: null,
            householdCountry: 'Brazil',
            cca2: 'BR'
        }
    }

    _TesteVariaveis() {
        console.warn("Nome: " + this.state.householdFirstName)
        console.warn("Sobrenome: " + this.state.householdLastName)
        console.warn("Parentesco: " + this.state.parentesco)
        console.warn("Genero: " + this.state.householdGender)
        console.warn("Raça: " + this.state.householdRace)
        console.warn("Data de Nascimento: " + this.state.householdDob)
        console.warn("Pais: " + this.state.householdCountry)
        Keyboard.dismiss()
    }

    render() {
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={Imagem.imagemFundo}>
                <View style={styles.marginTop}>
                    <Text style={styles.titulo}>Preencha todos os campos abaixo para adicionar um novo membro</Text>
                </View>
                <View style={{ width: '100%', height: 6, backgroundColor: '#C19036' }} />

                <ScrollView style={styles.scroll}>
                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Nome:</Text>
                        <TextInput style={styles.formInput}
                            returnKeyType='next'
                            onSubmitEditing={() => this.sobrenomeInput.focus()}
                            onChangeText={text => this.setState({ householdFirstName: text })}
                        />
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Sobrenome:</Text>
                        <TextInput style={styles.formInput}
                            ref={(input) => this.sobrenomeInput = input}
                            onChangeText={text => this.setState({ householdLastName: text })}
                        />
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Parentesco:</Text>
                        <Picker
                            selectedValue={this.state.parentesco}
                            style={{ width: "95%" }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ parentesco: itemValue })}>
                            <Picker.Item label="Pai" value="pai" />
                            <Picker.Item label="Mãe" value="mae" />
                            <Picker.Item label="Filho" value="filho" />
                            <Picker.Item label="Irmão" value="irmao" />
                            <Picker.Item label="Avô" value="avo" />
                            <Picker.Item label="Neto" value="neto" />
                            <Picker.Item label="Tio" value="tio" />
                            <Picker.Item label="Sobrinho" value="sobrinho" />
                            <Picker.Item label="Bisavô" value="bisavo" />
                            <Picker.Item label="Bisneto" value="bisneto" />
                            <Picker.Item label="Primo" value="primo" />
                            <Picker.Item label="Sogro" value="sogro" />
                            <Picker.Item label="Genro" value="genro" />
                            <Picker.Item label="Nora" value="nora" />
                            <Picker.Item label="Padastro" value="padastro" />
                            <Picker.Item label="Madrastra" value="madastra" />
                            <Picker.Item label="Enteado" value="enteado" />
                            <Picker.Item label="Cônjugue" value="conjugue" />
                            <Picker.Item label="Outros" value="outros" />
                        </Picker>
                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Sexo:</Text>
                            <Picker
                                selectedValue={this.state.householdGender}
                                style={{ width: "80%" }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ householdGender: itemValue })}>
                                <Picker.Item label="Masculino" value="Masculino" />
                                <Picker.Item label="Feminino" value="Femenino" />
                            </Picker>
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Raça:</Text>
                            <Picker
                                selectedValue={this.state.householdRace}
                                style={{ width: "80%" }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ householdRace: itemValue })}>
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
                                date={this.state.householdDob}
                                androidMode='spinner'
                                mode="date"
                                placeholder="Nascimento"
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate={today}
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
                                onDateChange={date => this.setState({ householdDob: date })}
                            />
                        </View>

                        <View style={styles.viewChildPais}>
                            <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>País:</Text></View>
                            <View><CountryPicker
                                onChange={value => {
                                    this.setState({ cca2: value.cca2, householdCountry: value.name })
                                }}
                                cca2={this.state.cca2}
                                translation="eng"
                            /></View>
                        </View>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.enviar} onPress={  fetchData/*() => this._TesteVariaveis() */}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </ImageBackground>
        );

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 680
    },
    marginTop: {
        width: '100%',
        backgroundColor: '#DFDFD0',
        elevation: 11
    },
    titulo: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#9B6525',
        marginTop: 15,
        marginBottom: 15
    },
    scroll: {
        flex: 1,
        width: '100%',
        paddingTop: 25,
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
        marginBottom: 60,
        width: "60%",
    },
    enviar: {
        backgroundColor: 'skyblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }
});

//make this component available to the app
export default Household;