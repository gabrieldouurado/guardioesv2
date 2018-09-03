import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{borderWidth: 1, borderColor: 'red'}}>
        <Text> Tela Perfil </Text>
      </View>
    );
  }
}

export default Perfil;
