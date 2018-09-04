import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { imagemUnb } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';

const Redirect = (titulo, message, url) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Ok", onPress: () => Linking.openURL(`${url}`) }
        ]
    )
}

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
                    <Text style={styles.text}> {textos[0].textoGrande} </Text>
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
                        <Image source={imagemUnb} style={styles.imageTwo} />
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
        paddingHorizontal: '10%'
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

const textos = [
    {
        textoGrande: 'aaaaaaaaa'
    },
    {
        tituloBtnUnb: 'Universidade de Brasilia',
        mensagemBtnUnb: 'Deseja ser redirecionado ao website da UnB?',
        linkBtnUnb: 'http://www.unb.br' 
    },
    {
        tituloBtnCenteias: 'Universidade de Brasilia',
        mensagemBtnCenteias: 'Deseja ser redirecionado ao website da Centeias?',
        linkBtnCenteias: 'https://fs.unb.br/centeias/'
    }
]
export default Sobre;
