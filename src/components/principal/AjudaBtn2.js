import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { textos } from '../../constUtils';
import { imagemReportar } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Emoji from 'react-native-emoji';

const emojis = [
    (<Emoji //Emoji thumbs up
        name='+1'
        style={{ fontSize: scale(20) }}
    />),
    (
        <Emoji //Emoji rindo
            name='smiley'
            style={{ fontSize: scale(15) }}
        />
    ),
    (
        <SocialIcon //Twitter icon
            type='twitter'
            style={{height: scale(30), width: scale(30) }}
        />
    ),
    (
        <Emoji 
            name='wink'
            style={{ fontSize: scale(15) }}
        />
    )
]

class Botao2 extends Component {
    static navigationOptions = {
        title: 'Tutorial'
    }
    render() {
        let textoBase = textos[4];
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: scale(30) }}>
                    <Text style={{ fontSize: scale(20), fontWeight: 'bold' }}>{textos[4].tutorial} {emojis[0]}</Text>
                    <Text /* style={{ fontSize: 20, fontWeight: 'bold' }} */>{textos[4].comoUsar}</Text>

                    <View style={{ alignItems: 'center', padding: scale(10) }}>
                        <Image
                            source={imagemReportar}
                            style={{ height: 80, width: 80 }}
                        />
                    </View>

                    <Text>{textoBase.comoUsar2} {emojis[1]}</Text>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold' }}>{textoBase.noticias}</Text>
                        {emojis[2]}
                    </View>
                    <Text>{textoBase.noticiasCont}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{textoBase.noticiasPs} {emojis[3]}</Text>
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
