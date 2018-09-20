import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage, ImageBackground } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import Icon from 'react-native-vector-icons/Feather';

class Home extends Component {
    navOptions // rolê para acessar a drawer em uma função estática
    static navigationOptions = ({ navigation }) => {
        navOptions = navigation; // rolê para acessar a drawer em uma função estática
        const { params = {} } = navigation.state;
        return {
            title: 'Guardiões da Saúde',
            headerLeft: (
                <Icon.Button name='menu' size={scale(30)} color='#9B6525' backgroundColor='transparent' onPress={() => params._onHeaderEventControl()} />
            ),
            headerTitleStyle: {
                fontFamily: 'poiretOne',
                fontWeight: '400' //fontWeight can't be higher than 400
            }

        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userFirstName: null
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
        this._getInfos()
    }

    openDrawer() {// rolê para acessar a drawer em uma função estática
        this.props.navigation.openDrawer();
    }// rolê para acessar a drawer em uma função estática

    _getInfos = async () => {
        let valueName = await AsyncStorage.getItem('userName');
        this.setState({ userFirstName: valueName })
    }

    render() {
        const { topo, corpo, inferior, topoTexto1, topoTexto2 } = styles;
        const { navigate } = this.props.navigation;

        return (
            <ImageBackground style={styles.container} imageStyle={{resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
                <StatusBar backgroundColor='#babaae'/>
                <View style={topo}>
                    <Text style={topoTexto1}>
                        Olá {this.state.userFirstName}!
                    </Text>
                    <Text style={topoTexto2}>
                        Agora você é um guardião da saúde!
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
                        <Image source={Imagem.imagemNoticias} style={{ height: scale(45), width: scale(45) }} />
                        <Text style={styles.BotoesTexto}>
                            Notícias
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => navigate('Conselho')}>
                        <Image source={Imagem.imagemConselho} style={{ height: scale(45), width: scale(45) }} />
                        <Text style={styles.BotoesTexto}>
                            Conselho de Saúde
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => alert("Em Desenvolvimento")}>
                        <Image source={Imagem.imagemDiarioSaude} style={{ height: scale(45), width: scale(45) }} />
                        <Text style={styles.BotoesTexto}>
                            Diário de Saúde
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.inferiorBotoes}
                            onPress={() => navigate('Mapa')}
                        >
                            <Image source={Imagem.imagemMapaSaude} style={{ height: scale(45), width: scale(45) }}/>
                            <Text style={styles.BotoesTexto}>
                                Mapa da Saúde
                            </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
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
        fontFamily: 'poiretOne'
    },
    topoTexto2: {
        fontSize: 18,
        fontFamily: 'poiretOne',
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
        backgroundColor: 'rgba(135, 150, 151, 0.6)',
        width: '80%',
        borderBottomLeftRadius: 181,
        borderTopLeftRadius: 181,
        justifyContent: 'flex-start',
    },
    BotoesTexto: {
        fontFamily: 'poiretOne',
        alignSelf: 'center',
        textAlign: 'justify',
        marginLeft: 40,
        fontSize: 18,
        color: 'black',
    }
});

//make this component available to the app
export default Home;
