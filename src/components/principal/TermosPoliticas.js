import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { imagemUnb, imagemCenteias } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import { Redirect } from '../../constUtils';
import translate from '../../../locales/i18n';

class TermosPoliticas extends Component {
    static navigationOptions = {
        title: translate("useTerms.title")
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
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermosTitulo")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_1")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_2")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_3")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_4")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_5")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_6")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_7")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_8")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_9")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_10")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_11")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_12")} </Text>
                    <Text style={styles.text}> {translate("useTerms.terms.textoTermos_13")} </Text>

                    <View style={styles.imagesView}>
                        <TouchableOpacity
                            onPress={() => Redirect(translate("about.tituloBtnUnb"), translate("about.mensagemBtnUnb"), translate("about.linkBtnUnb"))}
                        >
                            <Image source={imagemUnb} style={styles.imageOne} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => Redirect(translate("about.tituloBtnCenteias"), translate("about.mensagemBtnCenteias"), translate("about.linkBtnCenteias"))}
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
