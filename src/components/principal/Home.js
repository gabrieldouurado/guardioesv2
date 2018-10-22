import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage, ImageBackground } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

class Home extends Component {
    static propTypes = {
        start: PropTypes.func.isRequired,
        copilotEvents: PropTypes.shape({
            on: PropTypes.func.isRequired,

        }).isRequired,
    };

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
            userFirstName: null,
            secondStepActive: true,
        }
    }

    onHeaderEventControl() { // rolê para acessar a drawer em uma função estática
        const { params = {} } = navOptions.state;
        params._openNav()
    }

    componentDidMount() {

        this.runTutorial();

        this.props.navigation.setParams({// rolê para acessar a drawer em uma função estática
            _onHeaderEventControl: this.onHeaderEventControl,// rolê para acessar a drawer em uma função estática
            _openNav: () => this.openDrawer()// rolê para acessar a drawer em uma função estática
        })
        this._getInfos()
        
    }

    runTutorial = async () =>{
        let runTutorial = await AsyncStorage.getItem('RunTutorial');
        this.setState({runTutorial: runTutorial});
        if (this.state.runTutorial === 'true') {
            this.props.copilotEvents.on('stepChange', this.handleStepChange);
            this.props.start();
            AsyncStorage.removeItem('RunTutorial');  
        }
    }

    handleStepChange = (step) => {
        console.log(`Current step is: ${step.name}`);
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
        const welcomeMessage = "                Olá " + this.state.userFirstName + "\n Agora você é um guardião da saúde!"
        return (
            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }} source={Imagem.imagemFundo}>
                <StatusBar backgroundColor='#babaae' />
                <View style={topo}>
                    <CopilotStep text="Agora você conhecerá nossas principais funções!" order={1} name="openApp">
                        <WalkthroughableText style={topoTexto2}>
                            {welcomeMessage}
                        </WalkthroughableText>
                    </CopilotStep>
                </View>

                <View style={corpo}>
                    <TouchableOpacity
                        style={{ borderRadius: 180 }}
                        onPress={() => {
                            navigate('Reportar')
                        }}
                    >
                        <CopilotStep active={this.state.secondStepActive} text="Clicando aqui você poderá informar seu estado de saúde" order={2} name="secondText">
                            <WalkthroughableImage
                                source={Imagem.imagemReportar}
                                style={{ height: scale(160), width: scale(160), borderRadius: 200, marginVertical: 20 }}
                            />
                        </CopilotStep>
                    </TouchableOpacity>
                </View>

                <View style={inferior}>

                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => navigate('Noticias')}>
                        <CopilotStep text="Aqui temos notícias quentinhas relacionadas à saúde" order={3} name="thirdText">
                            <WalkthroughableImage source={Imagem.imagemNoticias} style={{ height: scale(45), width: scale(45) }} />
                        </CopilotStep>
                        <Text style={styles.BotoesTexto}>
                            Notícias
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => navigate('Conselho')}>
                        <CopilotStep text="Aqui você encontra diversas informações relacionadas à saúde" order={4} name="fourthText">
                            <WalkthroughableImage source={Imagem.imagemConselho} style={{ height: scale(45), width: scale(45) }} />
                        </CopilotStep>
                        <Text style={styles.BotoesTexto}>
                            Conselho de Saúde
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => navigate('Diario')}>
                        <CopilotStep text="Aqui você pode acompanhar seu diário da saúde" order={5} name="fifthText">
                            <WalkthroughableImage source={Imagem.imagemDiarioSaude} style={{ height: scale(45), width: scale(45) }} />
                        </CopilotStep>
                        <Text style={styles.BotoesTexto}>
                            Diário de Saúde
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inferiorBotoes}
                        onPress={() => navigate('Mapa')}
                    >
                        <CopilotStep text="Aqui você pode acessar um mapa para ver como as pessoas estão ao seu redor" order={6} name="sixthText">
                            <WalkthroughableImage source={Imagem.imagemMapaSaude} style={{ height: scale(45), width: scale(45) }} />
                        </CopilotStep>
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
        fontSize: 22,
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
        backgroundColor: 'rgba(223, 223, 208, 0.6)',
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
export default copilot({
    animated: true, // Can be true or false
    overlay: 'svg', // Can be either view or svg
})(Home);
