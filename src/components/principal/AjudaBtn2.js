import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';
import { textos } from '../../constUtils';
import { imagemReportar } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Emoji from 'react-native-emoji';

const emojis = [
    (
    <Emoji //Emoji thumbs up
        name='+1'
        style={{ fontSize: scale(20) }}
    />
    ),
    (
        <Emoji //Emoji rindo
            name='smiley'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <SocialIcon //Twitter icon
            type='twitter'
            style={{ height: scale(30), width: scale(30) }}
        />
    ),
    (
        <Emoji
            name='wink'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <Emoji
            name='nerd_face'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <SocialIcon
            type='google-plus-official'
            style={{ height: scale(30), width: scale(30) }}
        />
    )
]

onPress = (rota, navigation) => {
    navigation.navigate(`${rota}`)
}

class Botao2 extends Component {
    static navigationOptions = {
        title: 'Tutorial'
    }
    render() {
        let textoBase = textos[5];
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: scale(30) }}>
                    {/* Titulo */}
                    <Text style={{ fontSize: scale(20), fontWeight: 'bold' }}>{textoBase.tutorial} {emojis[0]}</Text>

                    {/* Como Usar */}
                    <Text /* style={{ fontSize: 20, fontWeight: 'bold' }} */>{textoBase.comoUsar}</Text>

                    {/* Icone de reportar */}
                    <View style={{ alignItems: 'center', padding: scale(10) }}>
                        <Image
                            source={imagemReportar}
                            style={{ height: scale(80), width: scale(80) }}
                        />
                    </View>

                    {/* Continuacao de como usar */}
                    <Text>{textoBase.comoUsar2} {emojis[1]}</Text>

                    {/* Mudando para Noticias, titulo */}
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Noticias', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>{textoBase.noticias}</Text>
                        {emojis[2]}
                    </TouchableOpacity>

                    {/* Conteudo de noticias */}
                    <Text>{textoBase.noticiasCont}</Text>
                    {/* Ps em noticias e um emoji piscando */}
                    <Text style={{ fontWeight: 'bold' }}>{textoBase.noticiasPs} {emojis[3]}</Text>

                    {/* Conselhos de Saude */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Conselho', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>{textoBase.conselhos}</Text>
                        <Text> </Text>
                        <Icon name='open-in-new' type={'material-community'} size={scale(16)} />
                    </TouchableOpacity>
                    <Text>{textoBase.conselhosCont}</Text>

                    {/* Diario */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Diario', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>{textoBase.diario}</Text>
                        <Text> </Text>
                        <Icon name='open-in-new' type={'material-community'} size={scale(16)} />
                    </TouchableOpacity>
                    <Text>{textoBase.diarioCont}</Text>

                    {/* Mapa da Saude */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Mapa', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>{textoBase.mapaSaude}</Text>
                        <Text> </Text>
                        {emojis[5]}
                    </TouchableOpacity>
                    <Text>{textoBase.mapaSaudeCont} {emojis[4]}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export { Botao2 };
