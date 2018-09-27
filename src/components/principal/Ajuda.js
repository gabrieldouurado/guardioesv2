import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imgTermos, imgTutorial } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';

class Ajuda extends Component {
  static navigationOptions = {
    title: 'Ajuda'
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnOne}
          onPress={() => navigate('TermosPoliticas')}
        >
          <Image source={imgTermos} style={styles.btnOneImg}/>
          <Text style={styles.btnOneTxt}>Termos e Políticas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOne}
          onPress={() => navigate('Botao2')}
        >
          <Image source={ imgTutorial } style={styles.btnOneImg}/>
          <Text style={styles.btnOneTxt}>Tutorial</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnOne: {
    height: scale(100),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnOneImg: {
    height: scale(60),
    width: scale(60),
    marginHorizontal: scale(30),
  },
  btnOneTxt: {
    fontFamily: 'poiretOne',
    fontSize: 18,
  }
})

export default Ajuda;
