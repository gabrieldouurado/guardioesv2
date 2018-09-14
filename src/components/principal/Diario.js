//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Diario extends Component {
    static navigationOptions = {
        title: 'Diário',
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Diario</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Diario;
