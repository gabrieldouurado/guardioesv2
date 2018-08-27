//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        return fetch('https://guardianes.centeias.net/surveys/a')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                >
                </MapView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject },
    map: { ...StyleSheet.absoluteFillObject }
});

//make this component available to the app
export default Maps;
