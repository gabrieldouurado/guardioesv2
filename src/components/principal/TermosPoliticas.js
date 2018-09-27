import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { imagemUnb, imagemCenteias } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import { Redirect, textos } from '../../constUtils';

class TermosPoliticas extends Component {
    static navigationOptions = {
        title: 'Termos e Políticas',
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={styles.textView}>
                    <Text style={styles.text}> {textos[3].textoTermosTitulo} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_1} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_2} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_3} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_4} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_5} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_6} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_7} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_8} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_9} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_10} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_11} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_12} </Text>
                    <Text style={styles.text}> {textos[3].textoTermos_13} </Text>

                    <View style={styles.imagesView}>
                        <TouchableOpacity
                            onPress={() => Redirect(textos[1].tituloBtnUnb, textos[1].mensagemBtnUnb, textos[1].linkBtnUnb)}
                        >
                            <Image source={imagemUnb} style={styles.imageOne} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => Redirect(textos[2].tituloBtnCenteias, textos[2].mensagemBtnCenteias, textos[2].linkBtnCenteias)}
                        >
                            <Image source={imagemCenteias} style={styles.imageTwo} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: '1.5%'
    },
    textView: {
        paddingHorizontal: '5%',
        marginBottom: '1.5%'
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'justify'
    },
    imageOne: {
        height: scale(100),
        width: scale(100)
    },
    imageTwo: {
        height: scale(100),
        width: scale(100)
    }
})

export default TermosPoliticas;
