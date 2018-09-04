import React, { Component } from 'react';
import { Text } from 'react-native';

class Botao1 extends Component {
    static navigationOptions = {
        title: 'Botao 1'
    }
    render() {
        return (
            <Text>
                Ola, sou o botao 1
            </Text>
        )
    }
}

export { Botao1 };
