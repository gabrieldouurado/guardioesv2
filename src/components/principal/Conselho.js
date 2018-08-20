//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';

const nome = (<Icon name='heartbeat' type={'font-awesome'} size={30} color='red' />)
const hospital = (<Icon name='hospital-o' type={'font-awesome'} size={30} color='red' />)
const telefones = (<Icon name='phone' size={30} color='red' />)
const viajante = (<Icon name='wallet-travel' type={'material-community'} size={30} color='red'/>)
const farmacia = (<Icon name='pharmacy' type={'material-community'} size={30} color='red' />)
const ajuste = (<Icon name='healing' size={30}  color='red'/>)

// create a component
class Conselho extends Component {
    static navigationOptions = {
        title: 'Conselhos de Saúde',
        headerStyle: {
            backgroundColor: '#3B8686',
            elevation: 0,
            textAlign: 'center',
        },
        headerTitleStyle: {
            color: 'white',
        },
        headerBackTitleStyle: {
            color: 'white'
        },
    }
    render() {
        return (
            <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'stretch' }}>
                <ScrollView>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('Prevencao')}>
                        <Text style={styles.textoSelector}>Prevenção</Text>
                        {nome}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('SaudedoViajante')}>
                        <Text style={styles.textoSelector}>Saúde do viajante</Text>
                        {viajante}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('DengueeAfins')}>
                        <Text style={styles.textoSelector}>Dengue, Chicungunya e Zyca</Text>
                        {ajuste}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('Gastro')}>
                        <Text style={styles.textoSelector}>Enfermidades gastrointestinais</Text>
                        {ajuste}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('Imuno')}>
                        <Text style={styles.textoSelector}>Enfermidades imunopreviniveis</Text>
                        {ajuste}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('TelefonesUteis')}>
                        <Text style={styles.textoSelector}>Telefones uteis</Text>
                        {telefones}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('InstituicoesSaude')}>
                        <Text style={styles.textoSelector}>Instituições de saúde</Text>
                        {hospital}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => this.props.navigation.navigate('Farmacia')}>
                        <Text style={styles.textoSelector}>Farmácias</Text>
                        {farmacia}
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    margTop: {
        flexDirection: 'row',
        backgroundColor: '#0084b4',
        height: 50,
        justifyContent: 'space-between'
      },
      margTop1: {
        backgroundColor: '#CD853F',
        height: 5,
      },
      titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
        marginRight: 65,
      },
      backButton: {
          alignSelf: 'center',
          marginLeft: 10,
      },
      selector: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          elevation: 5,
          backgroundColor: '#2c3e50',
          padding: 10,
      },
      textoSelector: {
          alignSelf: 'center',
          color: '#e10531',
          fontSize: 16,
          fontWeight: 'bold',
      },

});

//make this component available to the app
export default Conselho;
