import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, Linking, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { moderateScale, verticalScale } from '../scallingUtils'
import * as Imagem from '../../imgs/imageConst'

export default class drawerContentComponents extends Component {

    // navigateToScreen = ( route ) =>(
    //     () => {
    //     const navigateAction = NavigationActions.navigate({
    //         routeName: route
    //     });
    //     this.props.navigation.dispatch(navigateAction);
    // })

  render() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={Imagem.imagemDrawer} style={{flex: 1, width: moderateScale(280), justifyContent: 'center'}} >
                    <Text style={styles.headerText}>Header Portion</Text>
                    <Text style={styles.headerText}>You can display here logo or profile image</Text>
                </ImageBackground>
            </View>

            <TouchableOpacity style={styles.itemsContainer} onPress={() => this.props.navigation.navigate()}>
                <FontAwesome name='home' size={verticalScale(30)} color='gray'  style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer} onPress={() => Linking.openURL('https://google.com')}>
                <FontAwesome name='newspaper-o' size={verticalScale(30)} color='gray'  style={[styles.iconStyle, {paddingRight: '13%'}]}/>
                <Text style={styles.drawerItemsTxt}>Publicações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <MaterialIcons name='person' size={verticalScale(30)} color='gray' style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <Entypo name='open-book' size={verticalScale(30)} color='gray'  style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Wikilancia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <FontAwesome name='graduation-cap' size={verticalScale(30)} color='gray' style={[styles.iconStyle, {paddingRight: '13%'}]}/>
                <Text style={styles.drawerItemsTxt}>EAD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <Feather name='message-circle' size={verticalScale(30)} color='gray'  style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Mensagens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <Entypo name='facebook' size={verticalScale(30)} color='gray'  style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer}>
                <Feather name='help-circle' size={verticalScale(30)} color='gray'  style={styles.iconStyle}/>
                <Text style={styles.drawerItemsTxt}>Ajuda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemsContainer} onPress={() => this.props.navigation.navigate('Sobre')}>
                <FontAwesome name='home' size={verticalScale(30)} color='gray'  style={[styles.iconStyle, {paddingRight: '16%'}]}/>
                <Text style={styles.drawerItemsTxt}>Sobre</Text>
            </TouchableOpacity>

            <View style={[styles.itemsContainer, { borderBottomWidth: 1, borderBottomColor: 'gray' }]}></View>

            <TouchableOpacity style={[{flexDirection: 'row', marginTop: 10,padding: 8, backgroundColor: 'red', justifyContent: 'center', paddingRight: '15%', paddingLeft: '8%', }]}>
                    <Text style={[styles.drawerItemsTxt, { fontSize: 20, fontWeight: 'bold' }]} onPress={null}>Sair</Text>
            </TouchableOpacity>
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