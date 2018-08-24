import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import CarouselImagens from '../carousel/Carousel';

class TelaInicial extends Component {
    static navigationOptions = {
        title: 'Guardiões da Saúde',
        headerStyle: {
            backgroundColor: '#3B8686',
        },
        headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal',
        },
    }

    componentDidMount() {
        this._loadInitialState()
    }

    //Funcao responsavel por verificar se o usuario está logado e ser redirecionado automaticamente para Home
    _loadInitialState = async () => {
        let valueUserFB = await AsyncStorage.getItem('userNameFB');
        let valueUserID = await AsyncStorage.getItem('userID');
        if (valueUserFB !== null || valueUserID !== null) {
            this.props.navigation.navigate('Home')
        }
    }


    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground style={styles.container} source={Imagem.imagemFundo} imageStyle={{ resizeMode: 'stretch' }}>
                <View style={{ flex: 9 }}>
                    <CarouselImagens />
                </View>
                <View style={styles.botoes}>
                    <TouchableOpacity
                        onPress={() => navigate('Registrar')}
                        style={styles.estiloBotao1}
                    >
                        <Text style={styles.textoBotao}>Registre-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Login')}
                        style={styles.estiloBotao2}
                    >
                        <Text style={styles.textoBotao}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    botoes: {
        flex: 0.65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 9,
    },
    estiloBotao1: {
        backgroundColor: '#3B8686',
        height: '100%',
        width: '48%',
        borderTopRightRadius: 180,
        borderBottomRightRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    estiloBotao2: {
        backgroundColor: '#3B8686',
        height: '100%',
        width: '48%',
        borderTopLeftRadius: 180,
        borderBottomLeftRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        fontSize: 25,
        color: 'yellow'
    }
});

export default TelaInicial;
