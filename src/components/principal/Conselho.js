import React, { Component } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, View, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { imagemFundo } from '../../imgs/imageConst';
import { Redirect } from '../../constUtils';
import translate from '../../../locales/i18n';

const nome = (<Icon name='heartbeat' type={'font-awesome'} size={30} color='#348EAC' />)
const hospital = (<Icon name='ambulance' type={'font-awesome'} size={30} color='#348EAC' />)
const disease = (<Icon name='bug' type={'font-awesome'} size={30} color='#348EAC' />)
const telefones = (<Icon name='phone' size={30} color='#348EAC' />)
const viajante = (<Icon name='airplane' type={'material-community'} size={30} color='#348EAC' />)
const farmacia = (<Icon name='medkit' type={'font-awesome'} size={30} color='#348EAC' />)

const DButtons = (props) => {
    return (
        <TouchableOpacity
            style={styles.selector}
            onPress={() => props.navigation.navigate(props.route, {
                body: `${props.content.body}`
            })}
        >
            <Text style={styles.textoSelector}>
                {props.title}
        </Text>
            {props.icon}
        </TouchableOpacity>
    )
}

class Conselho extends Component {
    static navigationOptions = {
        title: translate("advices.title")
    }
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            contentData: null
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
        const contentObj = this.state.contentData;
        
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ImageBackground source={imagemFundo} style={styles.container} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>
                <ScrollView>
                    {/* Botao para prevencao */}
                    {
                        contentObj.map(content => {
                            switch (content.title) {
                                case translate("advices.advicesCaseChoices.prevention.caseChoice"):
                                    return(
                                        <DButtons content={content} title={translate("advices.advicesCaseChoices.prevention.screenTitle")} icon={nome} route={'Prevention'} navigation={this.props.navigation} />
                                    )

                                case translate("advices.advicesCaseChoices.travelerHealth.caseChoice"):
                                    return (
                                        <DButtons content={content} title={translate("advices.advicesCaseChoices.travelerHealth.screenTitle")} icon={viajante} route={'TravelHealth'} navigation={this.props.navigation} />
                                    )
                                
                                case translate("advices.advicesCaseChoices.dengueChicungunyaZica.caseChoice"):
                                    return (
                                        <DButtons content={content} title={translate("advices.advicesCaseChoices.dengueChicungunyaZica.screenTitle")} icon={disease} route={'Dengue'} navigation={this.props.navigation} />
                                    )
                                
                                case translate("advices.advicesCaseChoices.imunoPreventables.caseChoice"):
                                    return (
                                        <DButtons content={content} title={translate("advices.advicesCaseChoices.imunoPreventables.screenTitle")} icon={disease} route={'Diseases'} navigation={this.props.navigation} />
                                    )
                                
                                case translate("advices.advicesCaseChoices.usefulNumbers.caseChoice"):
                                    return (
                                        <DButtons content={content} title={translate("advices.advicesCaseChoices.usefulNumbers.screenTitle")} icon={telefones} route={'Phones'} navigation={this.props.navigation} />
                                    )
                            }
                        })
                    }
                    
                    {/* Instituições de Saúde */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => Redirect(textoRedirect.hospitais.texto1, textoRedirect.hospitais.texto2, 'https://www.google.com/maps/search/?api=1&query=hospitais')}
                    >
                        <Text style={styles.textoSelector}>
                            {translate("advices.buttons.healthInst")}
                        </Text>
                        {hospital}
                    </TouchableOpacity>

                    {/* Farmacias */}
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => Redirect(textoRedirect.hospitais.texto1, textoRedirect.hospitais.texto2, 'https://www.google.com/maps/search/?api=1&query=farmacias')}
                    >
                        <Text style={styles.textoSelector}>
                        {translate("advices.buttons.pharmacy")}
                        </Text>
                        {farmacia}
                    </TouchableOpacity>

                </ScrollView>
            </ImageBackground>
        );
    }
}

const textoRedirect = {
    hospitais: {
        texto1: translate("advices.buttons.messages.title"),
        texto2: translate("advices.buttons.messages.subtitle")
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
        fontFamily: 'roboto',
        fontSize: 16,
        marginLeft: 12,
        alignSelf: 'center',
        color: '#348EAC',
    },

});

//make this component available to the app
export default Conselho;
