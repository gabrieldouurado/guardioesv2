import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Sobre extends Component {
    static navigationOptions = {
        title: 'Sobre',
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> TelaSobre </Text>
      </View>
    );
  }
}

export default Sobre;
