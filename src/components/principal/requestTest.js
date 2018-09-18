import React, { Component } from 'react';
import { View, Text } from 'react-native';

class requestTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount(){
    return fetch('https://guardianes.centeias.net/user/surveys/5b6db008abbd4916002b97f0', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error === false) {
            alert('OK')
          } else {
            alert('NOT OK')
          }
      })
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
export default requestTest;