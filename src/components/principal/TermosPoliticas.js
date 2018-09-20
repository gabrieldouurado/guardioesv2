import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
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
                </ScrollView>

                <View style={styles.imagesView}>
                    <TouchableOpacity
                        onPress={() => Redirect(textos[1].tituloBtnUnb, textos[1].mensagemBtnUnb, textos[1].linkBtnUnb)}
                    >
                        <Image source={Imagem.imagemUnb} style={styles.imageOne} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Redirect(textos[2].tituloBtnCenteias, textos[2].mensagemBtnCenteias, textos[2].linkBtnCenteias)}
                    >
                        <Image source={Imagem.imagemCenteias} style={styles.imageTwo} />
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center'
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
