import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    Picker,
    ActivityIndicator,
    AsyncStorage,
    Keyboard,
    FlatList
} from 'react-native';
import Household from './Household';

const AdicionarFamiliar = (<Icon name='plus' type={'evilicon'} size={30} color='red' />)
class ChooseReporter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            error: null,
            isLoading: true,
            url: "",
        }

    }    
    static navigationOptions = {
        title: 'Guardiões da saúde',
        headerStyle: {
            backgroundColor: '#3B8686',
            elevation: 0
        },
        headerTitleStyle: {
            color: 'white',
            margin: '8%',
            fontWeight: 'bold',
            fontSize: 30,
            alignSelf: 'center',
            marginRight: '10%',
        },
        headerBackTitleStyle: {
            color: 'white'
            },
    }
    
    getUserData = async () => {
        UserID = await AsyncStorage.getItem('userID');
        this.setState({ UserID: UserID });
        UserName = await AsyncStorage.getItem('userName');
        this.setState({ UserName: UserName });
    }
    componentDidMount(){
        
        this.getUserData();
        this.GetHouseholds();
        
    }
    GetHouseholds = () => {
        return fetch('https://guardianes.centeias.net/user/household/${this.state.UserID}')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });
    }
  
    
        render() {
            if(this.state.isLoading){
                return(
                  <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                  </View>
                )
              }

            familiar = this.state.dataSource.map((item) => {
              return (
                  <View key={item.firstname} style={ styles.container }>
                    <Text style={styles.textoSelector}>
                      {item.firstname}
                    </Text>
                  </View>
                );
             });
            return (
              <View style={styles.container}>
                     <Text style={styles.titulo}>Quem participará?</Text>
                     <Text style={styles.textoSelector}>Selecione o perfil que quer reportar</Text>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Reportar')}>
                         <Text style={styles.titulo}>{this.state.UserName}</Text>
                     </TouchableOpacity>
                     <View style={styles.familiar}>
                        {familiar}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Household')}>
                            {AdicionarFamiliar}
                        </TouchableOpacity>
                        
                    </View>
                </View>
            );
          }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    margTop: {
        flexDirection: 'row',
        backgroundColor: '#0084b4',
        height: 50,
        justifyContent: 'space-between'
      },
      margTop1: {
        backgroundColor: '#CD853F',
        height: 5,
      },
      titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
      },
      backButton: {
          alignSelf: 'center',
          marginLeft: 10,
      },
      selector: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          elevation: 5,

          backgroundColor: '#fff',
          padding: 10,
      },
      textoSelector: {
          alignSelf: 'center',
          color: '#e10531',
          fontSize: 16,
          fontWeight: 'bold',
      },
      familiar: {
          flexDirection: 'row',
          justifyContent: 'space-between'
      }

});

export default ChooseReporter;