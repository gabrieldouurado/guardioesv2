import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, View, AsyncStorage, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { Redirect } from '../../constUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';


class Conselho extends Component {
    static navigationOptions = {
        title: translate("advices.title")
    }
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.warn(payload)
            this.getInfos();
        });
        this.state = {
            modalVisible: false,
            isLoading: true,
            contentData: null
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getInfos = async () => { //Ger user infos
        let userToken = await AsyncStorage.getItem('userToken');
        let appID = await AsyncStorage.getItem('appID');
        this.setState({ userToken, appID });
        this.getContents();
    }

    getContents = () => {
        return fetch(`${API_URL}/contents/`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.contents,
                    isLoading: false,
                })
            })
    }


    render() {

        const contentsData = this.state.dataSource;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible); //Exit to modal view
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTextTitle}>{this.state.contentTitle}</Text>
                        </View>
                        <Text style={styles.modalBodyText}>{this.state.contentBody}</Text>
                    </View>
                </Modal>

                {contentsData != null ?
                    contentsData.map(content => {
                        if (content.app.id == this.state.appID) {
                            return (
                                <ScrollView>
                                    <TouchableOpacity onPress={() => {
                                        this.setModalVisible(true)
                                        this.setState({ contentTitle: content.title, contentBody: content.body })
                                    }}>
                                        <View style={styles.selector}>
                                            <Text style={styles.textSelector}>{content.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            )
                        }
                    })
                    : null}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        elevation: 5,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    },
    textSelector: {
        fontFamily: 'roboto',
        fontSize: 18,
        //fontWeight: 'bold',
        marginLeft: 12,
        alignSelf: 'center',
        color: '#348EAC'
    },
    modalView: {
        alignSelf: 'center',
        width: '93%',
        //height: '88%',
        marginTop: '3%',
        padding: '5%',
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 15
    },
    modalTitle: {
        borderBottomWidth: 2,
        borderColor: '#348EAC',
    },
    modalTextTitle: {
        fontFamily: 'roboto',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
        marginLeft: 5,
        color: '#348EAC'
    },
    modalBodyText: {
        textAlign: 'justify',
        fontSize: 16,
        marginTop: 7,
        marginLeft: 5,
        color: '#348EAC'
    }
});

//make this component available to the app
export default Conselho;
