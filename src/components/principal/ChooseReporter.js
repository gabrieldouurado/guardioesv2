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
            userHousehold:[],

        }

    }    
    static navigationOptions = {
        title: 'Guardiões da saúde',
        headerStyle: {
            backgroundColor: '#3B8686',
            elevation: 0
        },
        headerTitleStyle: {
            color: '#DFDFD0',
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
    GetHouseholds = async () => {
        userHousehold = await AsyncStorage.getItem('userHousehold');
        this.setState({ userHousehold: JSON.parse(userHousehold) });
    }

    reportUser(){
        this.props.navigation.navigate('Reportar');
        AsyncStorage.removeItem('HouseholdId');
    }
  
    setHouseholdReporter = async (id) =>{
        AsyncStorage.setItem('HouseholdId', id);
        this.props.navigation.navigate('Reportar');

    }
        render() {
            let HouseholdAux = this.state.userHousehold;
            return (
              <View style={styles.container}>
                     <Text style={styles.titulo}>Quem participará?</Text>
                     <Text style={styles.textoSelector}>Selecione o perfil que quer reportar</Text>
                     <TouchableOpacity onPress={() => this.reportUser()}>
                         <Text style={styles.titulo}>{this.state.UserName}</Text>
                     </TouchableOpacity>
                     <View style={styles.familiar}>
                        {   
                           
                            HouseholdAux.map((houseH , index) => {
                                return(
                                    <ScrollView style={styles.selector}>
                                        <TouchableOpacity onPress={() => this.setHouseholdReporter(houseH.id)}>
                                            <Text>{houseH.firstname}</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            })
                        }
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
        //   justifyContent: 'space-between',
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