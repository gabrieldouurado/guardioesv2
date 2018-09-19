import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import CarouselImagens from '../carousel/Carousel';

class TelaInicial extends Component {
    static navigationOptions = {
        title: 'Guardiões da Saúde',
    }

    componentDidMount() {
        this._loadInitialState()
    }

    //Funcao responsavel por verificar se o usuario está logado e ser redirecionado automaticamente para Home
    _loadInitialState = async () => {
        let valueUserID = await AsyncStorage.getItem('userID');
        if (valueUserID !== null) {
            this.props.navigation.navigate('Home')
        }
    }


    render() {
        const { navigate } = this.props.navigation
        const statusColor = (<StatusBar backgroundColor='#babaae' />)

        return (
            <View style={styles.container}>
                {statusColor}
                <View style={{alignItems: 'center', marginTop: 25}}>
                    <Text style={styles.textTitulo}>Bem Vindo!</Text>
                    <Text style={styles.textCorpo}>Pronto para ser um Guardião da Saúde?</Text>
                </View>
                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={Imagem.imagemLogo} />
                </View>
                <View style={styles.viewBotoes}>
                    <View style={styles.viewChildBotoes}>
                        <TouchableOpacity onPress={() => navigate('Registrar')}>
                            <Image source={Imagem.imagemRegistar} style={styles.imageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewChildBotoes}>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Image source={Imagem.imagemEntrar} style={styles.imageStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imageLogo: {
        flex: 1,
        width: '70%',
        resizeMode: 'center',
        marginTop: -30
    },
    textTitulo: {
        fontFamily: 'poiretOne',
        fontSize: 27,
        color: '#9B6525',
        marginBottom: 5
    },
    textCorpo: {
        fontFamily: 'poiretOne',
        fontSize: 19,
        color: '#9B6525'
    },
    viewBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '7%',
        marginTop: 10,
        marginBottom: 20
    },
    imageStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    viewChildBotoes: {
        width: '48.5%'
    }
});

export default TelaInicial;
