//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';

const nome = (<Icon name='heartbeat' type={'font-awesome'} size={30} color='#C19036' />)
const hospital = (<Icon name='hospital-o' type={'font-awesome'} size={30} color='#C19036' />)
const telefones = (<Icon name='phone' size={30} color='#C19036' />)
const viajante = (<Icon name='wallet-travel' type={'material-community'} size={30} color='#C19036'/>)
const farmacia = (<Icon name='pharmacy' type={'material-community'} size={30} color='#C19036' />)
const ajuste = (<Icon name='healing' size={30}  color='#C19036'/>)

class Conselho extends Component {
    static navigationOptions = {
        title: 'Conselhos de Saúde',
    }
    
    render() {
        return (
            <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
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
                    <TouchableOpacity style={styles.selector} onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=hospitais')}>
                        <Text style={styles.textoSelector}>Instituições de saúde</Text>
                        {hospital}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selector} onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=farmacias')}>
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
        height: 550,
    },
      selector: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          elevation: 5,

          backgroundColor: '#fff',
          padding: 10,
      },
      textoSelector: {
          fontFamily: 'poiretOne',
          fontSize: 18,
          marginLeft: 12,
          alignSelf: 'center',
          color: '#465F6C',
      },

});

//make this component available to the app
export default Conselho;
