import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, Linking, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { moderateScale, verticalScale } from '../scallingUtils'
import { Avatar } from 'react-native-elements'
import { LoginButton } from 'react-native-fbsdk';
import * as Imagem from '../../imgs/imageConst'

export default class drawerContentComponents extends Component {

    // navigateToScreen = ( route ) =>(
    //     () => {
    //     const navigateAction = NavigationActions.navigate({
    //         routeName: route
    //     });
    //     this.props.navigation.dispatch(navigateAction);
    // })

    constructor(props) {
        super(props);
        this.state = {
            pic: null,
            loginOnFB: null,
            loginOnApp: null
        }
    }

    //Funcao responsavel por pegar as variaveis do Facebook e salva-las em variaveis de estado 
    _getInfoFB = async () => {
        let valueAvatar = await AsyncStorage.getItem('avatar');
        let valueFB = await AsyncStorage.getItem('loginOnFB');
        let valueApp = await AsyncStorage.getItem('loginOnApp');
        this.setState({ pic: valueAvatar, loginOnFB: valueFB, loginOnApp: valueApp })
    }

    //Funcao responsavel por apagar as variaveis de do facebook salvas no celular ao encerrar uma sessão
    _logoutFacebook = async () => {
        AsyncStorage.removeItem('userNameFB');
        AsyncStorage.removeItem('loginOnFB');
        AsyncStorage.removeItem('avatar');
        this.setState({ pic: null })
        this.props.navigation.navigate('TelaInicial')
    }

    //Funcao responsavel por apagar as variaveis de login do app salvas no celular ao encerrar uma sessão
    _logoutApp = async () => {
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('loginOnApp');
        this.setState({ loginOnApp: null })
        this.props.navigation.navigate('TelaInicial')
    }


    render() {
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
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground source={Imagem.imagemDrawer} style={{ flex: 1, justifyContent: 'center' }} >
                        <View style={styles.shadowAvatar}>
                            <Avatar
                                xlarge
                                rounded
                                source={{ uri: this.state.pic }}
                                activeOpacity={0.7}
                            />
                        </View>
                        <Text style={styles.headerText}>Header Portion</Text>
                        <Text style={styles.headerText}>You can display here logo or profile image</Text>
                    </ImageBackground>
                </View>

                <TouchableOpacity style={styles.itemsContainer} onPress={() => this.props.navigation.navigate()}>
                    <FontAwesome name='home' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer} onPress={() => Linking.openURL('https://google.com')}>
                    <FontAwesome name='newspaper-o' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '13%' }]} />
                    <Text style={styles.drawerItemsTxt}>Publicações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <MaterialIcons name='person' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <Entypo name='open-book' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Wikilancia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <FontAwesome name='graduation-cap' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '13%' }]} />
                    <Text style={styles.drawerItemsTxt}>EAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <Feather name='message-circle' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Mensagens</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <Entypo name='facebook' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer}>
                    <Feather name='help-circle' size={verticalScale(30)} color='gray' style={styles.iconStyle} />
                    <Text style={styles.drawerItemsTxt}>Ajuda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemsContainer} onPress={() => this.props.navigation.navigate('Sobre')}>
                    <FontAwesome name='home' size={verticalScale(30)} color='gray' style={[styles.iconStyle, { paddingRight: '16%' }]} />
                    <Text style={styles.drawerItemsTxt}>Sobre</Text>
                </TouchableOpacity>

                <View style={[styles.itemsContainer, { borderBottomWidth: 1, borderBottomColor: 'gray' }]}></View>

                <View style={[{ flexDirection: 'row', padding: 8, justifyContent: 'center' }]}>
                    {loginType}
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    headerContainer: {
        height: moderateScale(300),
    },
    headerText: {
        color: '#fff8f8',
    },
    shadowAvatar: {
        borderBottomRightRadius: 90,
        borderTopRightRadius: 90,
        width: '75%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#465F6C',
        borderColor: '#465F6C',
        borderWidth: 1
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
        fontSize: verticalScale(21.5),

    },

});