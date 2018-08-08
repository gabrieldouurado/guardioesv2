//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Maps extends Component {
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
            <View style={styles.container}>
                <Text>Maps</Text>
            </View>
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
export default Maps;
