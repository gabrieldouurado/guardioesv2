//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const imageFundo = require('../../imgs/fundo.png')

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
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground style={styles.container} source={imageFundo} imageStyle={{ resizeMode: 'stretch' }}>
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '2.7%',
    },
    estiloBotao1: {
        backgroundColor: '#3B8686',
        height: '8%', width: '48%', 
        borderTopRightRadius: 180, 
        borderBottomRightRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    estiloBotao2: {
        backgroundColor: '#3B8686',
        height: '8%', width: '48%', 
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

//make this component available to the app
export default TelaInicial;
