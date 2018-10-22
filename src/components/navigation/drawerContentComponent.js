import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Linking, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Emoji from 'react-native-emoji';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { moderateScale, verticalScale, scale } from '../scallingUtils'
import { Avatar } from 'react-native-elements'
import { LoginButton } from 'react-native-fbsdk';
import * as Imagem from '../../imgs/imageConst'

export default class drawerContentComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginOnFB: null,
            loginOnApp: null,
            userFirstName: null
        }
    }

    //Funcao responsavel por pegar as variaveis do Facebook e salva-las em variaveis de estado 
    _getInfoFB = async () => {
        let valueAvatar = await AsyncStorage.getItem('avatar');
        let valueFB = await AsyncStorage.getItem('loginOnFB');
        let valueApp = await AsyncStorage.getItem('loginOnApp');
        let valueName = await AsyncStorage.getItem('userName');
        this.setState({ pic: valueAvatar, loginOnFB: valueFB, loginOnApp: valueApp, userFirstName: valueName })
    }

    //Funcao responsavel por apagar as variaveis de do facebook salvas no celular ao encerrar uma sessão
    _logoutFacebook = async () => {
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('loginOnFB');
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('avatar');
        AsyncStorage.removeItem('userHousehold');
        this.setState({ pic: null })
        this.props.navigation.navigate('TelaInicial')
    }

    //Funcao responsavel por apagar as variaveis de login do app salvas no celular ao encerrar uma sessão
    _logoutApp = async () => {
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('loginOnApp');
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userHousehold');
        this.setState({ loginOnApp: null })
        this.props.navigation.navigate('TelaInicial')
    }


    render() {
        const { navigate } = this.props.navigation;
        //Funcoes declaradas dentro do render pois ficam em loop para serem atualizadas automaticamente
        if (this.state.loginOnApp == null) {
            if (this.state.loginOnFB == null || this.state.pic == null) {
                //Laco para parar de executar a funcao no momento em que as variaveis forem gravadas
                this._getInfoFB()
            }
        }

        const loggedOnFacebook = (
            <LoginButton onLogoutFinished={this._logoutFacebook} />
        )

        const loggedOnApp = (
            <Text style={[styles.drawerItemsTxt, { fontSize: 20, fontWeight: 'bold' }]} onPress={this._logoutApp}>Sair</Text>
        )

        let loginType;
        if (this.state.loginOnFB === 'true') {
            loginType = loggedOnFacebook
        }
        else {
            loginType = loggedOnApp
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <ImageBackground source={Imagem.imagemDrawer} style={{ flex: 1, justifyContent: 'center' }} >
                            <View style={styles.shadowAvatar}>
                                <View style={{ borderWidth: 3.5, borderColor: '#348EAC', borderRadius: 180 }}>
                                    <Avatar
                                        xlarge
                                        rounded
                                        source={{ uri: this.state.pic }}
                                        activeOpacity={0.7}
                                    />
                                </View>
                            </View>
                            <Text style={styles.headerText}>{this.state.userFirstName}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ backgroundColor: '#348EAC', height: 10 }}></View>
                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Home')}
                    >
                        <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Início</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity 
                    style={styles.itemsContainer} 
                    onPress={() => Linking.openURL('https://google.com')}
                >
                    <FontAwesome name='newspaper-o' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '13%' }]} />
                    <Text style={styles.drawerItemsTxt}>Publicações</Text>
                </TouchableOpacity> */}

                    {/* <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Perfil')}
                    >
                        <MaterialIcons name='person' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Perfil</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity 
                    style={styles.itemsContainer}
                    onPress={() => null}
                >
                    <Entypo name='open-book' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Wikilancia</Text>
                </TouchableOpacity> */}

                    {/* <TouchableOpacity 
                    style={styles.itemsContainer}
                    onPress={() => null}
                >
                    <FontAwesome name='graduation-cap' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '13%' }]} />
                    <Text style={styles.drawerItemsTxt}>EAD</Text>
                </TouchableOpacity> */}

                    {/* <TouchableOpacity 
                    style={styles.itemsContainer}
                    onPress={() => null}
                >
                    <Feather name='message-circle' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Mensagens</Text>
                </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => Linking.openURL('https://www.facebook.com/AssociacaoProEpi/')}
                    >
                        <Entypo name='facebook' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('CopilotTest')}
                    >
                        <Feather name='help-circle' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Ajuda</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Sobre')}
                    >
                        <Entypo name='info-with-circle' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '16%' }]} />
                        <Text style={styles.drawerItemsTxt}>Sobre</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: scale(30) }}>
                        <Text style={{ alignSelf: 'center', color: '#d6d6d6' }}>Temos mais vindo aí!  </Text>
                        <Emoji
                            name='wink'
                            style={{ fontSize: scale(15) }}
                        />
                    </View>
                </ScrollView>
                <View style={[styles.itemsContainer, { borderBottomWidth: 1, borderBottomColor: 'gray' }]}></View>
                <View style={[{ flexDirection: 'row', justifyContent: 'center', padding: 8 }]}>
                    {loginType}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: moderateScale(293),
    },
    headerText: {
        fontSize: 25,
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 25,
        color: '#465F6C'
    },
    shadowAvatar: {
        borderBottomRightRadius: 90,
        borderTopRightRadius: 90,
        width: '75%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'rgba(70, 95, 108, 0.85)'
    },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
    },
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '15%',
        paddingLeft: '8%',
    },
    drawerItemsTxt: {
        textAlignVertical: 'center',
        fontFamily: 'roboto',
        fontSize: verticalScale(15),

    },

});