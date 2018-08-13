import React, {Component} from 'react';
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
  AsyncStorage,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal'
import DatePicker from 'react-native-datepicker'
import * as Imagem from '../../imgs/imageConst'

class Registrar extends Component {
  static navigationOptions = {
    title: 'Registrar-se'
  }
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPwd: '',
      userGender: '',
      userCountry: 'Brasil',
      userRace: '',
      userDob: '',
      userApp: 'd41d8cd98f00b204e9800998ecf8427e',
      cca2: 'BR'
    }
  }
  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    let value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Reportar')
    }
  }
  render() {
    const back = (<Ionicons name='md-arrow-round-back' size={30} />)
    return (
      <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'stretch' }} source={Imagem.imagemFundo}>
        <View style={styles.viewLogo}>
          <Image style={styles.imageLogo} source={Imagem.imagemLogo} />
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Nome:</Text>
            <TextInput style={styles.formInput} />
          </View>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Sobrenome:</Text>
            <TextInput style={styles.formInput} />
          </View>
          <View style={styles.viewRow}>
            <View style={styles.viewChildSexoRaca}>
              <Text style={styles.commomTextView}>Sexo:</Text>
              <Picker
                selectedValue={this.state.userGender}
                style={styles.selectSexoRaca}
                onValueChange={(itemValue, itemIndex) => this.setState({ userGender: itemValue })}>
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
              </Picker>
            </View>
            <View style={styles.viewChildSexoRaca}>
              <Text style={styles.commomTextView}>Raça:</Text>
              <Picker
                selectedValue={this.state.userRace}
                style={styles.selectSexoRaca}
                onValueChange={(itemValue, itemIndex) => this.setState({ userRace: itemValue })}>
                <Picker.Item label="Branco" value="Blanco" />
                <Picker.Item label="Indigena" value="indigena" />
                <Picker.Item label="Mestiço" value="mestico" />
                <Picker.Item label="Negro, mulato ou afrodescendente" value="negro" />
              </Picker>
            </View>
          </View>
          <View style={styles.viewRow}>
            <View style={styles.viewChildData}>

              <DatePicker
                style={{ width: '80%' }}
                date={this.state.userDob}
                androidMode='spinner'
                mode="date"
                placeholder="Nascimento"
                format="DD-MM-YYYY"
                minDate="01-01-1918"
                maxDate="01-01-2019"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ userDob: date }) }}
              />
            </View>
            <View style={styles.viewChildPais}>
              <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>País:</Text></View>
              <View><CountryPicker
                onChange={value => {
                  this.setState({ cca2: value.cca2, country: value })
                  // this.setState({ userCountry: this.state.country.name })
                }}
                cca2={this.state.cca2}
                translation="eng"
              /></View>
            </View>
          </View>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Email:</Text>
            <TextInput style={styles.formInput} keyboardType='email-address' />
          </View>
          <View style={styles.viewCommom}>
            <Text style={styles.commomText}>Senha:</Text>
            <TextInput style={styles.formInput} secureTextEntry={true} />
          </View>
          <View style={styles.buttonView}>
            <Button title="Cadastrar" onPress={this.create}
            />
          </View>
          <TouchableOpacity onPress={this.create}>
            <Text>Send</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );

  }

  create = () => {
    fetch('http://guardianes.centeias.net/user/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.userFirstName,
        lastname: this.state.userLastName,
        email: this.state.email,
        password: this.state.userPwd,
        gender: this.state.userGender,
        country: this.state.userCountry,
        race: this.state.userRace,
        dob: this.state.userDob,
        app: this.state.userApp
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
    .done()
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  margTop: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#4169E1',
    height: 50,
    justifyContent: 'space-between'
  },
  titulo: {
    color: 'white',
    justifyContent: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    marginRight: '30%',
  },
  backButton: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  viewLogo: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  viewCommom: {
    width: '100%',
    height: 65,
    alignItems: 'center',
  },
  viewRow: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
  },
  viewChildSexoRaca: {
    width: "50%",
    height: 65,
    alignItems: 'center',
  },
  viewChildPais: {
    width: "50%",
    height: 65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewChildData: {
    width: "50%",
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '5%',
  },
  selectSexoRaca: {
    width: "80%",
  },
  formInput: {
    width: "90%",
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderBottomColor: '#008080',
    paddingBottom: 2,
    paddingTop: 2,
  },
  formData: {
    width: "80%",
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderBottomColor: '#008080',
    paddingBottom: 2,
    paddingTop: 2,
  },
  commomText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: "5%",
    fontWeight: 'bold',
  },
  commomTextView: {
    fontSize: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    paddingLeft: '10%',
    fontWeight: 'bold',
  },
  buttonView: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: "60%",
  },
  imageLogo: {
    flex: 1,
    marginTop: 20,
    width: '35%',
    resizeMode: 'center',
  }
});

//make this component available to the app
export default Registrar;
