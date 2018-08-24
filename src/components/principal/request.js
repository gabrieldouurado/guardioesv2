//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, TouchableOpacity, Alert } from 'react-native';

// create a component
class RequestData extends Component {

    constructor(props){
        super(props)
        this.state = {
            userEmail: '',
            userPwd: '',
        }
    }
    componentDidMount(){
      this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      let value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.props.navigation.navigate
      }
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <TextInput
            style={{height: 40, borderColor: 'blue', borderWidth: 1, backgroundColor: 'rgba(232,232,232,0.8)'  }}
            onChangeText={ (text) => this.setState({ userEmail: text }) }
            value={this.state.text}
            placeholder='Email'
          />
          <Text style={{ height: 100 ,backgroundColor: 'gray', justifyContent: 'center' }}>
          {this.state.userEmail}
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'blue', borderWidth: 1, backgroundColor: 'rgba(232,232,232,0.8)' }}
            onChangeText={(text) => this.setState({ userPwd: text }) }
            value={this.state.text}
            placeholder='Password'
          />
          <Text style={{ height: 100, backgroundColor: 'gray', justifyContent: 'center' }}>
          {this.state.userPwd}
          </Text>
          <TouchableOpacity
            onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )
    }
    login = () => {
      fetch('https://guardianes.centeias.net/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.userEmail,
          password: this.state.userPwd
        })
      })
      .then( (response) => response.json())
      .then( (responseJson) => {
          if (responseJson.error === false) {
            AsyncStorage.setItem('user', responseJson.user);
            this.props.navigation.navigate('Reportar');
            alert(responseJson.token)
          } else {
              alert(responseJson.error)
          }
      })
      .done();
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
export default RequestData;
