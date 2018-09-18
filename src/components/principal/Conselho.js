import React, { Component } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, View, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';

const nome = (<Icon name='heartbeat' type={'font-awesome'} size={30} color='#C19036' />)
const hospital = (<Icon name='ambulance' type={'font-awesome'} size={30} color='#C19036' />)
const desease = (<Icon name='bug' type={'font-awesome'} size={30} color='#C19036' />)
const telefones = (<Icon name='phone' size={30} color='#C19036' />)
const viajante = (<Icon name='airplane' type={'material-community'} size={30} color='#C19036' />)
const farmacia = (<Icon name='medkit' type={'font-awesome'} size={30} color='#C19036' />)

const tabs = [
    {title: 'Prevencão'},
    {title: 'Saúde do Viajante'},
    {title: 'Dengue, Chicungunya e Zyca'},
    {title: 'Enfermidades Imunopreviniveis'},
    {title: 'Telefones Úteis'},
]

class Conselho extends Component {
    static navigationOptions = {
        title: 'Conselhos de Saúde',
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            contentData: []
        }
    }

    componentDidMount() {
        return fetch('https://guardianes.centeias.net/content/app/d41d8cd98f00b204e9800998ecf8427e')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.pages)
                this.setState({
                    isLoading: false,
                    contentData: responseJson.pages
                })
            })

            .catch(error => console.error(error))
    }

    render() {
        const { navigate } = this.props.navigation;
        const contentObj = this.state.contentData;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
            {/* It'd be a better approach if I create a Content Util function that receives the content and then renders what whould be inside the screen
                and inside the screen I just call that function receiving the content that is passed inside the 'navigate' of these buttons here
            */}
                <ScrollView>
                    {/* Botao para prevencao */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => navigate('Prevention', {
                            body: `${contentObj[4].body}`
                        })}
                    >
                        <Text style={styles.textoSelector}>
                            {tabs[0].title}
                        </Text>
                        {nome}
                    </TouchableOpacity>
                    
                    {/* Botão para Saúde do Viajante */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => navigate('TravelHealth', {
                            body: `${contentObj[0].body}`
                        })}
                    >
                        <Text style={styles.textoSelector}>
                            {tabs[1].title}
                        </Text>
                        {viajante}
                    </TouchableOpacity>

                    {/* Botão Dengue, Chicungunya e Zyka */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => navigate('Dengue', {
                            body: `${contentObj[1].body}`
                        })}
                    >
                        <Text style={styles.textoSelector}>
                            {tabs[2].title}
                        </Text>
                        {desease}
                    </TouchableOpacity>

                    {/* Enfermidades Imunopreviniveis */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => navigate('Deseases', {
                            body: `${contentObj[2].body}`
                        })}
                    >
                        <Text style={styles.textoSelector}>
                            {tabs[3].title}
                        </Text>
                        {desease}
                    </TouchableOpacity>

                    {/* Telefones Uteis */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => navigate('Phones', {
                            body: `${contentObj[3].body}`
                        })}
                    >
                        <Text style={styles.textoSelector}>
                            {tabs[4].title}
                        </Text>
                        {telefones}
                    </TouchableOpacity>

                    {/* Instituições de Saúde */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=hospitais')}
                    >
                        <Text style={styles.textoSelector}>
                            Instituições de Saúde
                        </Text>
                        {hospital}
                    </TouchableOpacity>

                    {/* Farmacias */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=farmacias')}
                    >
                        <Text style={styles.textoSelector}>
                            Farmacias
                        </Text>
                        {farmacia}
                    </TouchableOpacity>

                </ScrollView>
            </ImageBackground>
        );
    }
}
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
