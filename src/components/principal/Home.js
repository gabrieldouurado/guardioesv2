//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Icon from 'react-native-vector-icons/Feather';

class Reportar extends Component {
    navOptions // rolê para acessar a drawer em uma função estática
    static navigationOptions = ({ navigation }) => {
        navOptions = navigation; // rolê para acessar a drawer em uma função estática
        const { params = {} } = navigation.state;
        return {
            title: 'Guardioes da Saude',
            drawerLockMode: 'unlocked',
            headerStyle: {
                backgroundColor: '#3B8686',
                elevation: 0
            },
            headerTitleStyle: {
                color: 'white',
                fontWeight: 'normal'
            },
            headerBackTitleStyle: {
                color: 'white'
            },
            headerLeft: (
                <Icon.Button name='menu' size={scale(30)} backgroundColor='transparent' onPress={() => params._onHeaderEventControl()}>

                </Icon.Button>
            )
        
        }
    }

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() { 
        this.props.navigation.setParams({// rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,// rolê para acessar a drawer em uma função estática
            _openNav: () => this.openDrawer()// rolê para acessar a drawer em uma função estática
        })
    }

    openDrawer() {// rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }// rolê para acessar a drawer em uma função estática

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
                        <Image source={Imagem.imagemReportar} style={{ height: scale(160), width: scale(160), borderRadius: 200 }} />
                    </TouchableOpacity>
                </View>

                <View style={inferior}>
                        <TouchableOpacity style={styles.inferiorBotoes}>
                            <Image source={Imagem.imagemNoticias} style={{ height: scale(45), width: scale(45), alignSelf: 'flex-start' }}/>
                            <Text style= {{ textAlign: 'center', textAlignVertical: 'center' }}>
                                Notícias
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: 'rgba(123,123,123, 0.3)', flex: 0.155, width: '80%', borderBottomLeftRadius: 181, borderTopLeftRadius: 181 }}>
                            <Image source={Imagem.imagemConselho} style={{ height: scale(45), width: scale(45) }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: 'rgba(123,123,123, 0.3)', flex: 0.155, width: '80%', borderBottomLeftRadius: 181, borderTopLeftRadius: 181 }}>
                            <Image source={Imagem.imagemDiarioSaude} style={{ height: scale(45), width: scale(45) }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: 'rgba(123,123,123, 0.3)', flex: 0.155, width: '80%', borderBottomLeftRadius: 181, borderTopLeftRadius: 181 }}>
                            <Image source={Imagem.imagemMapaSaude} style={{ height: scale(45), width: scale(45) }}/>
                        </TouchableOpacity>

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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inferior: {
        flex: 2,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
    },
    inferiorBotoes: {
        flex: 0.155,
        flexDirection: 'row',
        backgroundColor: 'rgba(123,123,123, 0.3)', 
        width: '80%', 
        borderBottomLeftRadius: 181, 
        borderTopLeftRadius: 181,
        justifyContent: 'center',
    }
});

//make this component available to the app
export default Reportar;
