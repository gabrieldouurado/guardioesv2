import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { imagemUnb, imagemCenteias } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import { Redirect, textos } from '../../constUtils';

class Sobre extends Component {
    static navigationOptions = {
        title: 'Sobre',
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.textView}>
                    <Text style={styles.textTitulo}> {textos[4].textoSobreTitulo} </Text>
                    <Text style={styles.text}> {textos[4].textoSobre} </Text>
                </View>

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textView: {
        flex: 3,
        paddingHorizontal: '5%'
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'justify'
    },
    textTitulo: {
        fontFamily: 'myriadpro',
        fontSize: 20,
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

export default Sobre;
