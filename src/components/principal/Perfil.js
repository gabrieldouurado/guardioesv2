import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, ScrollView, TouchableOpacity, NetInfo, Alert } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../scallingUtils';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';

class Perfil extends Component {
    static navigationOptions = {
        title: "Perfil"
    }
    constructor(props) {
        super(props);
        this._getInfos();
        this.state = {
        };
    }

    confirmDelete = () => {
        Alert.alert(
            "Deletar Usuário",
            "Deseja deletar esse usuário?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deleteHousehold() },
            ],
            { cancelable: false },
        );

    }

    _getInfos = async () => { //Ger user infos
        let userName = await AsyncStorage.getItem('userName');
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userName, userID, userToken });
        this.setState({ userSelect: this.state.userName });
        this.getHouseholds();
    }

    getHouseholds = () => {//Get households
        //console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
        return fetch(`${API_URL}/user/${this.state.userID}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.user.households,
                })
            })
    }

    deleteHousehold = async () => {
        return fetch(`${API_URL}/households/${this.state.householdID}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        }).then((response) => {
            console.warn(response.status)
            this.getHouseholds();
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        const householdsData = this.state.data;
        return (
            <View style={styles.container}>
                <View style={styles.viewTop}>
                    <View style={styles.userAvatar}>
                        <Avatar
                            large
                            rounded
                            source={Imagem.imagemFather}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={styles.userInfos}>
                        <Text style={styles.userName}>
                            {this.state.userName}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.userDobText}>
                                Idade:
                            </Text>
                            <Text style={styles.userDob}>
                                35 anos
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>
                        Familiares
                    </Text>
                </View>
                <ScrollView>
                    {householdsData != null ?
                        householdsData.map(household => {
                            return (
                                <View style={styles.viewHousehold}>
                                    <Avatar
                                        large
                                        rounded
                                        source={Imagem.imagemMother}
                                        activeOpacity={0.7}
                                    />
                                    <View style={{ flexDirection: 'column', marginLeft: 10, width: scale(220) }}>
                                        <Text style={styles.householdName}>{household.description}</Text>
                                        <Text style={styles.householdKinship}>{household.kinship}</Text>
                                    </View>
                                    <View style={styles.viewButtons}>
                                        <FontAwesome name="edit" size={scale(25)} color='rgba(22, 107, 135, 1)' />
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ householdID: household.id });
                                            this.confirmDelete();
                                        }}>
                                            <FontAwesome name="trash" size={scale(25)} color='rgba(22, 107, 135, 1)' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                        : null}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewTop: {
        height: '18%',
        flexDirection: 'row',
        backgroundColor: '#2298BF',
        borderColor: 'red',
        //marginBottom: 2,
        //borderWidth: 1,
    },
    userAvatar: {
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    userInfos: {
        borderColor: 'green',
        //borderWidth: 1,
    },
    userName: {
        fontFamily: 'roboto',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
    },
    userDobText: {
        fontFamily: 'roboto',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    userDob: {
        fontFamily: 'roboto',
        fontSize: 14,
        color: 'white'
    },
    viewHousehold: {
        justifyContent: 'space-between',
        margin: 2,
        padding: 5,
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: 'rgba(22, 107, 135, 0.15)',
    },
    householdName: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#348EAC',
        fontSize: 20,
    },
    householdKinship: {
        fontFamily: 'roboto',
        fontSize: 14,
    },
    viewButtons: {
        justifyContent: 'space-between',
        padding: 5,
    }
});

export default Perfil;
