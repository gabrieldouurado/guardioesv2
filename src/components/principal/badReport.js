import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import * as Imagem from '../../imgs/imageConst'
import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import CountryPicker from 'react-native-country-picker-modal'

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = d + "-" + m + "-" + y;

class BadReport extends Component {
    static navigationOptions = {
        title: 'Bad Report'
    }
    constructor(props) {
        super(props);
        this.state = {
            cca2: 'BR',
            checked_20: false,
        }
    }
    render() {
        const viajou = (
            <View>
                <View><Text style={styles.commomTextView}>Para qual país você viajou?</Text></View>
                <CountryPicker
                    onChange={value => {
                        this.setState({ cca2: value.cca2, country: value })
                    }}
                    cca2={this.state.cca2}
                    translation="por"
                />
                <View><Text style={{ alignSelf: 'center', paddingTop: 2, fontSize: 13 }}>Aperte na bandeira para selecionar!</Text></View>
            </View>
        )

        let checked_22True;
        if (this.state.checked_22 == false) {
            checked_22True = viajou
        }
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={Imagem.imagemFundo}>
                <View style={styles.margTop}>
                </View>
                <View style={{ width: '100%', alignSeft: 'center', marginBottom: '2%', marginTop: '2%' }}>
                    <DatePicker
                        style={{ width: '94%', marginLeft: '3%' }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Desde quando está se sentindo mal?"
                        format="DD-MM-YYYY"
                        minDate="01-01-2018"
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
                            },
                            placeholderText: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'gray'
                            },
                            dateText: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'gray'
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
                <ScrollView style={styles.sintomas}>
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>Selecione abaixo os sintomas que voce está sentindo neste momento:</Text>
                    </View>
                    <CheckBox
                        title='Bolhas no Pé'
                        checked={this.state.checked_1 == false}
                        onPress={() => {
                            if (this.state.checked_1 == false) {
                                this.setState({ checked_1: true })
                            }

                            else {
                                this.setState({ checked_1: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Congestão Nasal'
                        checked={this.state.checked_2 == false}
                        onPress={() => {
                            if (this.state.checked_2 == false) {
                                this.setState({ checked_2: true })
                            }

                            else {
                                this.setState({ checked_2: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Diarreia'
                        checked={this.state.checked_3 == false}
                        onPress={() => {
                            if (this.state.checked_3 == false) {
                                this.setState({ checked_3: true })
                            }

                            else {
                                this.setState({ checked_3: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dificuldade de Respirar'
                        checked={this.state.checked_4 == false}
                        onPress={() => {
                            if (this.state.checked_4 == false) {
                                this.setState({ checked_4: true })
                            }

                            else {
                                this.setState({ checked_4: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dor nas Articulações'
                        checked={this.state.checked_5 == false}
                        onPress={() => {
                            if (this.state.checked_5 == false) {
                                this.setState({ checked_5: true })
                            }

                            else {
                                this.setState({ checked_5: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dor de Cabeça'
                        checked={this.state.checked_6 == false}
                        onPress={() => {
                            if (this.state.checked_6 == false) {
                                this.setState({ checked_6: true })
                            }

                            else {
                                this.setState({ checked_6: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dor no Estômago'
                        checked={this.state.checked_7 == false}
                        onPress={() => {
                            if (this.state.checked_7 == false) {
                                this.setState({ checked_7: true })
                            }

                            else {
                                this.setState({ checked_7: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dor nos Músculos'
                        checked={this.state.checked_8 == false}
                        onPress={() => {
                            if (this.state.checked_8 == false) {
                                this.setState({ checked_8: true })
                            }

                            else {
                                this.setState({ checked_8: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Dor nos Olhos'
                        checked={this.state.checked_9 == false}
                        onPress={() => {
                            if (this.state.checked_9 == false) {
                                this.setState({ checked_9: true })
                            }

                            else {
                                this.setState({ checked_9: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Calafrios'
                        checked={this.state.checked_10 == false}
                        onPress={() => {
                            if (this.state.checked_10 == false) {
                                this.setState({ checked_10: true })
                            }

                            else {
                                this.setState({ checked_10: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Febre'
                        checked={this.state.checked_11 == false}
                        onPress={() => {
                            if (this.state.checked_11 == false) {
                                this.setState({ checked_11: true })
                            }

                            else {
                                this.setState({ checked_11: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Mal-estar'
                        checked={this.state.checked_12 == false}
                        onPress={() => {
                            if (this.state.checked_12 == false) {
                                this.setState({ checked_12: true })
                            }

                            else {
                                this.setState({ checked_12: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Manchas Vermelhas no Corpo'
                        checked={this.state.checked_13 == false}
                        onPress={() => {
                            if (this.state.checked_13 == false) {
                                this.setState({ checked_13: true })
                            }

                            else {
                                this.setState({ checked_13: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Náuseas'
                        checked={this.state.checked_14 == false}
                        onPress={() => {
                            if (this.state.checked_14 == false) {
                                this.setState({ checked_14: true })
                            }

                            else {
                                this.setState({ checked_14: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Olhos Avermelhados'
                        checked={this.state.checked_15 == false}
                        onPress={() => {
                            if (this.state.checked_15 == false) {
                                this.setState({ checked_15: true })
                            }

                            else {
                                this.setState({ checked_15: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Pés e Olhos Amarelados'
                        checked={this.state.checked_16 == false}
                        onPress={() => {
                            if (this.state.checked_16 == false) {
                                this.setState({ checked_16: true })
                            }

                            else {
                                this.setState({ checked_16: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Sangramentos'
                        checked={this.state.checked_17 == false}
                        onPress={() => {
                            if (this.state.checked_17 == false) {
                                this.setState({ checked_17: true })
                            }

                            else {
                                this.setState({ checked_17: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Tosse'
                        checked={this.state.checked_18 == false}
                        onPress={() => {
                            if (this.state.checked_18 == false) {
                                this.setState({ checked_18: true })
                            }

                            else {
                                this.setState({ checked_18: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Vômitos'
                        checked={this.state.checked_19 == false}
                        onPress={() => {
                            if (this.state.checked_19 == false) {
                                this.setState({ checked_19: true })
                            }

                            else {
                                this.setState({ checked_19: false })
                            }
                        }}
                    />
                    <View style={styles.viewText}>
                        <Text style={styles.sintomasText}>Responda as perguntas a seguir:</Text>
                    </View>
                    <CheckBox
                        title='Teve contato com alguem que apresentava os mesmos sintomas?'
                        checked={this.state.checked_20}
                        onPress={() => {
                            if (this.state.checked_20 == false) {
                                this.setState({ checked_20: true })
                            }

                            else {
                                this.setState({ checked_20: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Procurou algum serviço hospitalar?'
                        checked={this.state.checked_21 == false}
                        onPress={() => {
                            if (this.state.checked_21 == false) {
                                this.setState({ checked_21: true })
                            }

                            else {
                                this.setState({ checked_21: false })
                            }
                        }}
                    />
                    <CheckBox
                        title='Deixou seu local de residência nos ultimos 14 dias?'
                        checked={this.state.checked_22 == false}
                        onPress={() => {
                            if (this.state.checked_22 == false) {
                                this.setState({ checked_22: true })
                            }

                            else {
                                this.setState({ checked_22: false })
                            }
                        }}
                    />
                    {checked_22True}
                    <View style={styles.buttonView}>
                        <Button title="Confirmar" onPress={() => { alert(this.state.checked_20) }} />
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    margTop: {
        backgroundColor: '#CD853F',
        height: 5,
    },
    titulo: {
        color: 'white',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        marginRight: 45,
    },
    formInput: {
        width: '90%',
        fontSize: 20,
        borderColor: 'gray',
        borderBottomWidth: 2,
        borderBottomColor: '#008080',
        paddingBottom: 2,
        paddingTop: 2,
        marginLeft: '5%'
    },
    sintomasText: {
        textAlign: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    viewText: {
        backgroundColor: '#0084b4',
    },
    buttonView: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: "60%",
    },
    commomTextView: {
        fontSize: 15,
        alignSelf: 'center',
        paddingBottom: 4,
        fontWeight: 'bold',
    },
});

//make this component available to the app
export default BadReport;
