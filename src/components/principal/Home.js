//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Icon from 'react-native-vector-icons/Feather';

class Home extends Component {
    navOptions // rolê para acessar a drawer em uma função estática
    static navigationOptions = ({ navigation }) => {
        navOptions = navigation; // rolê para acessar a drawer em uma função estática
        const { params = {} } = navigation.state;
        return {
            title: 'Guardioes da Saude',
            headerStyle: {
                backgroundColor: '#3B8686',
                elevation: 0
            },
            headerTitleStyle: {
                color: 'white',
                fontFamily: 'miriadpro'
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

z
    render() {
        const { topo, corpo, inferior, topoTexto1, topoTexto2 } = styles;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#3B8686'/>
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
                            navigate('Reportar')
                        }}
                    >
                        <Image source={Imagem.imagemReportar} style={{ height: scale(160), width: scale(160), borderRadius: 200 }} />
                    </TouchableOpacity>
                </View>

                <View style={inferior}>
                        <TouchableOpacity 
                            style={styles.inferiorBotoes}
                            onPress={() => navigate('Noticias')}>
                            <Image source={Imagem.imagemNoticias} style={{ height: scale(45), width: scale(45) }}/>
                            <Text style={styles.BotoesTexto}>
                                Notícias
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.inferiorBotoes}
                            onPress={() => navigate('Conselho')}>
                            <Image source={Imagem.imagemConselho} style={{ height: scale(45), width: scale(45) }}/>
                            <Text style={styles.BotoesTexto}>
                                Conselho de Saúde
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.inferiorBotoes}
                            onPress={ () => navigate('Diario')}>
                            <Image source={Imagem.imagemDiarioSaude} style={{ height: scale(45), width: scale(45) }}/>
                            <Text style={styles.BotoesTexto}>
                                Diário de Saúde
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inferiorBotoes}>
                            <Image source={Imagem.imagemMapaSaude} style={{ height: scale(45), width: scale(45) }}/>
                            <Text style={styles.BotoesTexto}>
                                Mapa da Saúde
                            </Text>
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
        flexDirection: 'row',
        backgroundColor: 'rgba(123,123,123, 0.15)', 
        width: '80%', 
        borderBottomLeftRadius: 181, 
        borderTopLeftRadius: 181,
        justifyContent: 'flex-start',
    },
    BotoesTexto: {
        alignSelf: 'center',
        width: '50%',
        textAlign: 'justify',
        marginLeft: 70,
        fontSize: 16,
        color: 'black',
        fontWeight: '300'
    }
});

//make this component available to the app
export default Home;
