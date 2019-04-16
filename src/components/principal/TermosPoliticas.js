import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { imagemUnb, imagemCenteias } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import { Redirect } from '../../constUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';
import { Button } from 'react-native-elements';

class TermosPoliticas extends Component {
    static navigationOptions = {
        title: translate("useTerms.title")
    }
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            userToken: null,
            householdID: null,
            dataSource: null
        };
    }

    componentDidMount = async () => {
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userID: userID, userToken: userToken });
        this.getHouseholds();
        //this.git();
    }

    //TESTING HOUSEHOLDS
    getHouseholds = () => {//Get households
        console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
        return fetch(`${API_URL}/user/${this.state.userID}/households`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => {
                console.warn(response)
                return response.json()})
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.households,
                })
            })
    }

    git = () => {
        return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            dataSource: responseJson.movies,
        })
      
    })
    .catch((error) => {
      console.error(error);
    });
    }


    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                console.warn(this.state.dataSource)
            }}>
                <Text>Bla</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: '1.5%'
    },
    textView: {
        paddingHorizontal: '5%',
        marginBottom: '1.5%'
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'justify'
    },
    imageOne: {
        height: scale(100),
        width: scale(100)
    },
    imageTwo: {
        height: scale(100),
        width: scale(100)
    }
})

export default TermosPoliticas;
