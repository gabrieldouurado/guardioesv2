import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Linking, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Emoji from 'react-native-emoji';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale, verticalScale, scale } from '../scallingUtils';
import { Avatar } from 'react-native-elements';
import { LoginButton } from 'react-native-fbsdk';
import * as Imagem from '../../imgs/imageConst';
import translate from '../../../locales/i18n';
import LinearGradient from 'react-native-linear-gradient';

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
            <Text style={[styles.drawerItemsTxt, { fontSize: 20, fontWeight: 'bold' }]} onPress={this._logoutApp}>{translate("drawer.logOut")}</Text>
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
                <LinearGradient style={styles.container} colors={['#348EAC', '#013444']} start={{ x: 1.5, y: 0.6 }} end={{ x: -0.2, y: 1.4 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.viewAvatar}>
                            <Avatar
                                xlarge
                                rounded
                                source={{ uri: this.state.pic }}
                                activeOpacity={0.7}
                            />
                        </View>
                        <Text style={styles.headerText}>{this.state.userFirstName}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Home')}
                    >
                        <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Perfis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Mapa')}
                    >
                        <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.healthMap")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Diario')}
                    >
                        <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.healthDiary")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Home')}
                    >
                        <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>Eventos Massivos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => Linking.openURL('https://www.facebook.com/AssociacaoProEpi/')}
                    >
                        <Entypo name='facebook' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.toFacebook")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemsContainer}
                        onPress={() => navigate('Ajuda')}
                    >
                        <Feather name='help-circle' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                        <Text style={styles.drawerItemsTxt}>{translate("drawer.toHelp")}</Text>
                    </TouchableOpacity>

                    <View style={[{ flexDirection: 'row', justifyContent: 'center', padding: 8, marginTop: 27 }]}>
                        {loginType}
                    </View>
                </LinearGradient>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: moderateScale(250),
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        color: '#166B87'
    },
    viewAvatar: {
        alignSelf: 'center',
        marginTop: 25,
    },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10
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
        fontWeight: 'bold',
        color: 'white',
        fontSize: verticalScale(15),

    },

});