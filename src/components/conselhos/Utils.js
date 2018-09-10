import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

const app_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjZkYjAwOGFiYmQ0OTE2MDAyYjk3ZjAiLCJleHAiOjE1MzYzMjE5MjB9.fnZmdjQGNFiBlvu_CUu0Y0P2nN5Uzgvbh0ZeCdCk0mw'

const fetchData = () => {
    return fetch('https://guardianes.centeias.net/content/get', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'app_token': {app_token}
        }
    })
    .then(response => response.json())
    .then(responseJson => console.log(responseJson.data[0]))

    .catch(error => console.error(error))
}

class Conselhos extends Component {

  // componentDidMount() {
  //   return fetch('https://guardianes.centeias.net/content/get', {
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'app_token': {app_token}
  //     }
  // })
  // .then(response => response.json())
  // .then(responseJson => console.log(responseJson))

  // .catch(error => console.error(error))
  // }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button 
          title="Fetch NOW!"
          onPress={fetchData}
        />
      </View>
    );
  }
}

export default Conselhos;
