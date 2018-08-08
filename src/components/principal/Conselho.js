//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const nome = (<Icon name='heartbeat' size={30} color='red' />)
const hospital = (<Icon name='hospital' size={30} color='red' />)
const telefones = (<Icon name='phone' size={30} color='red' />)
const viajante = (<Icon name='map-marked-alt' size={30} color='red'/>)
const farmacia = (<Icon name='pillls' size={30} color='red' />)
const ajuste = (<Icon name='medkit' size={30} color='red'/>)

// create a component
class Conselho extends Component {
    static navigationOptions = {
        title: 'Notícias',
        headerStyle: {
            backgroundColor: '#3B8686',
            elevation: 0
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
            <ImageBackground source={require('../img/FUNDO.png')} style={styles.container} imageStyle={{ resizeMode: 'stretch' }}>
                <View style={styles.margTop} >

                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                        {back}
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Conselhos de saúde</Text>
                </View>
                <View style={styles.margTop1}>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Conselho;
