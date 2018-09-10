//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, View } from 'react-native';
import { Icon } from 'react-native-elements';
import imagemFundo from '../../imgs/imageConst';
import app_token from '../../constUtils';

const nome = (<Icon name='heartbeat' type={'font-awesome'} size={30} color='#C19036' />)
const hospital = (<Icon name='hospital-o' type={'font-awesome'} size={30} color='#C19036' />)
const telefones = (<Icon name='phone' size={30} color='#C19036' />)
const viajante = (<Icon name='wallet-travel' type={'material-community'} size={30} color='#C19036' />)
const farmacia = (<Icon name='pharmacy' type={'material-community'} size={30} color='#C19036' />)
const ajuste = (<Icon name='healing' size={30} color='#C19036' />)

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
                    {contentObj.map((content, key) => {
                        return (
                            <TouchableOpacity index={key} style={styles.selector} onPress={() => this.props.navigation.navigate(`${content.title}`, {
                                body: `${content.body}`
                            })}>
                                <Text style={styles.textoSelector}>{content.title}</Text>
                                {/* {nome} */}
                            </TouchableOpacity>
                        )
                    })}
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
