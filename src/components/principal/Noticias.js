//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, WebView, TouchableOpacity, Image, Text } from 'react-native';
import translate from '../../../locales/i18n';
import * as Imagem from '../../imgs/imageConst';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../scallingUtils';


// create a component
class Noticias extends Component {
    static navigationOptions = {
        title: translate("news.title"),
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri: 'https://twitter.com/Proepi_' }}
                />
                <LinearGradient style={styles.bottomMenu} colors={['#348EAC', '#013444']} start={{ x: 0.0, y: 0.0 }} end={{ x: 1.9, y: 1.0 }}>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Home')}>
                            <Image source={Imagem.imagemInicio} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                Inicio
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Diario')}>
                            <Image source={Imagem.imagemDiarioSaude} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthDiary")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Mapa')}>
                            <Image source={Imagem.imagemMapaSaude} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthMap")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Conselho')}>
                            <Image source={Imagem.imagemConselho} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.healthTips")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viweButtons}>
                        <TouchableOpacity
                            style={styles.menuButtons}
                            onPress={() => navigate('Noticias')}>
                            <Image source={Imagem.imagemNoticias} style={styles.menuIcons} />
                            <Text style={styles.textButton}>
                                {translate("home.homeButtons.news")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ///////////////////////////
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '11%',
        backgroundColor: 'red'
    },
    menuButtons: {
        alignItems: 'center'
    },
    viweButtons: {
        justifyContent: 'center',
        width: '20%',
    },
    menuIcons: {
        resizeMode: 'center',
        height: scale(30)
    },
    textButton: {
        fontFamily: 'roboto',
        alignSelf: 'center',
        textAlign: 'justify',
        fontSize: 10,
        color: 'white'
    },
    ////////////////////////////
});

//make this component available to the app
export default Noticias;
