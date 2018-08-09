//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

// create a component
class RequestData extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true
        }
    }
    componentDidMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')
                .then( response => response.json())
                .then( responseJson => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.movies,
                    }, function(){

                    }
                );
                })
                .catch( error => console.error(error))
    }
    render() {
        if(this.state.isLoading) {
            return(
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                keyExtractor={(item, index) => index}
                />
          </View>
        )
        
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
