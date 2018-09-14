import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
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
            <ImageBackground style={styles.container} source={Imagem.imagemFundo} imageStyle={{resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
                {statusColor}
                <View>
                    <CarouselImagens />
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
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '7%'
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
