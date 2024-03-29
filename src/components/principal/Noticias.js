//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';

// create a component
class Noticias extends Component {
    static navigationOptions = {
        title: 'Notícias',
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                source = {{ uri:
                'https://mobile.twitter.com/minsaude' }}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Noticias;
