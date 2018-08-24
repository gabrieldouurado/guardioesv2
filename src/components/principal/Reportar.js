//import liraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'

// create a component
class Reportar extends Component {
    static navigationOptions = {
        title: "Reportar",
        headerStyle: {
            backgroundColor: '#3B8686',
            elevation: 0
        },
        headerTitleStyle: {
            color: 'white',
        },
        headerBackTitleStyle: {
            color: 'white'
        }
    }
    render() {
        const moodBad = (<Octicons name='smiley' size={150} color='red' />)
        const moodGood = (<Octicons name='smiley' size={150} color='blue' />)
        return (
            <View style={styles.container}>
                <View style={styles.margTop}>
                </View>
                <View style={styles.textoInicialView}>
                    <Text style={styles.textoInicial}>
                        Nos ajude a prevenir riscos para a saúde durante ou após 8 dias, relatando sintomas que ocorrem durante ou depois de participar de um evento massivo
                    </Text>
                </View>
                <View style={styles.textoPerguntaView}>
                    <Text style={styles.textoPergunta}>Como está sua saúde neste momento?</Text>
                </View>
                <View style={styles.reportView}>
                    <TouchableOpacity onPress={this._onPressButton}>
                        {moodGood}
                        <Text style={styles.moodText}> BEM </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('BadReport')}>
                        {moodBad}
                        <Text style={styles.moodText}> MAL </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.reportFooter}>
                        Se a opção escolhida foi MAL poderá selecionar os sintomas na seguinte tela.
                    </Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 680,
    },
    margTop: {
        backgroundColor: '#CD853F',
        height: 5,
    },
    titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        marginRight: 45,
    },
    textoInicialView: {
        backgroundColor: '#0084b4',
        height: 80,
    },
    textoInicial: {
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: 10,
        fontSize: 13,
        textAlign: 'center',
    },
    textoPerguntaView: {
        marginTop: 50,
        alignItems: 'center',
    },
    textoPergunta: {
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center',
        color: '#0084b4',
    },
    reportView: {
        flex: 1,
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    reportFooter: {
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    moodText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

//make this component available to the app
export default Reportar;
