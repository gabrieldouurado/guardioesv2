//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Icon from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from 'react-navigation';
import Maps from './Maps'

class Reportar extends Component {
    static navigationOptions = {
        title: 'Guardioes da Saude',
        headerStyle: {
            backgroundColor: '#3B8686'
        },
        headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal'
        },
        headerBackTitleStyle: {
            color: 'white'
        },
        headerLeft: 
            <Icon.Button name='menu' size={scale(30)} backgroundColor='transparent' onPress={() => this.props.navigation.openDrawer()}>
                
            </Icon.Button>
        
    }
    render() {
        const { topo, corpo, inferior, topoTexto1, topoTexto2 } = styles;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={topo}>
                    <Text style={topoTexto1}>
                        Ola Fulano!
                    </Text>
                    <Text style={topoTexto2}>
                        Agora voce e um guardiao da saude!
                    </Text>
                </View>

                <View style={corpo}>
                    <TouchableOpacity 
                        style={{ borderRadius: 180 }}
                        onPress={() => {
                            navigate('')
                        }}
                    >
                        <Image source={Imagem.imagemReportar} style={{ height: scale(160), width: scale(160) }}/>
                    </TouchableOpacity>
                </View>

                <View style={inferior}>
                    
                </View>                                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topo: {
         flex: 0.6, 
         borderWidth: 1, 
         borderColor: 'red', 
         width: '100%', 
         alignItems: 'center', 
         justifyContent: 'center',
    },
    topoTexto1: {
        fontSize: 30,
        fontFamily: 'myriadpro'
    },
    topoTexto2: {
        fontSize: 18,
        fontFamily: 'myriadpro'
    },
    corpo: {
         flex: 1.5, 
         borderWidth: 1, 
         borderColor: 'blue', 
         width: '100%',
         alignItems: 'center',
         justifyContent: 'center'
    },
    inferior : {
         flex: 2, 
         borderWidth: 1,
         borderColor: 'green', 
         width: '100%' 
    }
});

//make this component available to the app
export default Reportar;
