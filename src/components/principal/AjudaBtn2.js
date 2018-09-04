import React, { Component } from 'react';
import { Text } from 'react-native';

class Botao2 extends Component {
    static navigationOptions = {
        title: 'Botao 2'
    }
    render() {
        return (
            <Text>
                Ola, sou o botao 2
            </Text>
        )
    }
}

export { Botao2 };
