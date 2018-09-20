import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, StatusBar, Alert } from 'react-native';
import { imagemEntrar, imagemLogo, imagemRegistar } from '../../imgs/imageConst';

const Redirect = (titulo, message, navigation) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Cancelar", onPress: () => navigation.navigate('TelaInicial') , style: 'cancel' },
            { text: "Ok", onPress: () => navigation.navigate('Registrar') }
        ]
    )
}

class TelaInicial extends Component {
    static navigationOptions = {
        title: 'Guardiões da Saúde',
    }

    componentDidMount() {
        this._loadInitialState()
    }

    //Funcao responsavel por verificar se o usuario está logado e ser redirecionado automaticamente para Home
    _loadInitialState = async () => {
        let valueUserID = await AsyncStorage.getItem('userID');
        if (valueUserID !== null) {
            this.props.navigation.navigate('Home')
        }
    }


    render() {
        const { navigate } = this.props.navigation
        const statusColor = (<StatusBar backgroundColor='#babaae' />)

        return (
            <View style={styles.container}>
                {statusColor}
                <View style={{alignItems: 'center', marginTop: 25}}>
                    <Text style={styles.textTitulo}>Bem Vindo!</Text>
                    <Text style={styles.textCorpo}>Pronto para ser um Guardião da Saúde?</Text>
                </View>
                <View style={styles.viewImage}>
                    <Image style={styles.imageLogo} source={imagemLogo} />
                </View>
                <View style={styles.viewBotoes}>
                    <View style={styles.viewChildBotoes}>
                        <TouchableOpacity onPress={() => Redirect(textos.tituloTermosDeUso, textos.mensagem, navigation=this.props.navigation)}>
                            <Image source={imagemRegistar} style={styles.imageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewChildBotoes}>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Image source={imagemEntrar} style={styles.imageStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imageLogo: {
        flex: 1,
        width: '70%',
        resizeMode: 'center',
        marginTop: -30
    },
    textTitulo: {
        fontFamily: 'poiretOne',
        fontSize: 27,
        color: '#9B6525',
        marginBottom: 5
    },
    textCorpo: {
        fontFamily: 'poiretOne',
        fontSize: 19,
        color: '#9B6525'
    },
    viewBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '7%',
        marginTop: 10,
        marginBottom: 20
    },
    imageStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    viewChildBotoes: {
        width: '48.5%'
    }
});


const textos = {
    tituloTermosDeUso: 'Termos de uso',
    mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec quam non augue vehicula vehicula. Vivamus ultrices nisl lobortis leo tempor maximus. Phasellus vitae urna sit amet mi sodales venenatis. Vivamus malesuada risus id lacus porta, in vulputate dui vulputate. Duis neque turpis, posuere nec felis in, aliquam tincidunt felis. Etiam ac sem volutpat, bibendum leo quis, luctus tellus. Praesent consectetur consequat malesuada. Cras leo ligula, volutpat imperdiet ultricies sit amet, fermentum sed sapien. Vivamus dignissim leo non neque dapibus consectetur. Donec quis ligula fermentum, mattis turpis ut, tincidunt eros. Donec pharetra turpis in arcu euismod viverra. Praesent blandit tortor vitae est imperdiet cursus. Integer pellentesque dapibus eros, sit amet pretium mi mollis vitae. Curabitur pretium sapien non neque fermentum pharetra. Phasellus consectetur fringilla pharetra. \
    Nullam porttitor, enim non iaculis auctor, lectus nunc varius tortor, sit amet eleifend nisi ex ac dolor. Fusce magna eros, fermentum et commodo sed, rhoncus id libero. Donec ultrices, tellus id vestibulum venenatis, arcu dui scelerisque nibh, vel aliquam eros lacus et neque. Donec gravida neque a nisl efficitur, at sagittis augue pellentesque. Curabitur tempus enim sit amet magna porttitor, a sagittis dolor auctor. Maecenas rutrum velit ut nisl sagittis suscipit. Donec eget sagittis lacus. Duis bibendum mauris ut ultricies faucibus. Etiam tincidunt risus sed purus malesuada eleifend. Quisque euismod scelerisque vulputate. Aliquam in blandit dolor. Phasellus mattis dignissim magna ut tristique. \
    Fusce ullamcorper erat lectus, mattis euismod leo tempus sed. In hendrerit ex est, sit amet faucibus massa malesuada eu. Vestibulum congue consequat placerat. Mauris in eros at odio pretium tincidunt. Mauris quis mattis libero. Pellentesque ac ex eu augue bibendum consequat. Nunc egestas aliquam felis, id cursus nibh sodales ac. \
    Aliquam erat volutpat. Mauris viverra pulvinar tortor, eget cursus risus dapibus vitae. Donec lacinia enim nunc, vitae aliquet arcu sagittis nec. Integer at augue pulvinar, ultrices sem in, finibus risus. Aenean ultrices, sem non pharetra auctor, lorem ex rutrum mi, a blandit orci turpis sit amet dui. Cras vel fringilla quam, sit amet finibus massa. Praesent eget nulla ut ligula porttitor tempor. Proin consequat sapien tristique, ultrices sem vitae, aliquam sem. In ultrices ligula eget ante vulputate, tempor tempus ante iaculis. Phasellus hendrerit ipsum nec ex eleifend bibendum quis quis magna. \
    Cras sodales accumsan mi a congue. Suspendisse egestas tincidunt eros non interdum. Etiam molestie feugiat fermentum. Sed cursus semper ex, id sollicitudin massa aliquet vitae. Aenean at dolor efficitur, hendrerit nunc ut, elementum augue. Nunc vel velit sit amet purus fermentum pretium ac ac ipsum. Vivamus metus metus, ultricies at ante eget, venenatis tincidunt mauris. Ut a pretium felis, ornare convallis urna. Proin dolor sapien, posuere vel condimentum in, eleifend ac ante. \
    Vestibulum tempus velit mauris. Nulla vitae sapien ac metus placerat laoreet a a elit. In pellentesque semper semper. Mauris sagittis elementum tincidunt. Aenean molestie et eros vel tempor. Nam mattis mauris at tortor porttitor, vitae imperdiet est ultricies. Mauris enim nisi, commodo nec consectetur id, tristique eget lacus. In semper metus quis ligula maximus auctor. Fusce venenatis nisl eget leo suscipit, vel pretium nulla scelerisque. Nam varius augue ligula, quis ultricies nunc laoreet in. Pellentesque non porta leo, nec interdum ipsum. Proin tempor quis tellus in feugiat. Fusce sed justo laoreet, venenatis ex non, pulvinar ante. Ut auctor condimentum est id placerat. Cras molestie nisi vel justo aliquet posuere. \
    Morbi sem augue, accumsan ut porta gravida, mattis ut lacus. In feugiat neque non sapien semper, ut mollis orci consectetur. Nulla molestie eu quam ut varius. Sed commodo nec tortor in consectetur. Maecenas ullamcorper eu nulla eget fermentum. Aenean egestas volutpat sem non condimentum. Etiam eget enim et ante faucibus egestas. \
    ",
    ifYes: 'Registrar',
    ifNo: 'TelaInicial'
}

export default TelaInicial;
