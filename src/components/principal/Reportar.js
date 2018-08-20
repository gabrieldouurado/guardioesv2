import React, {Component} from 'react';
import {ImageBackground,  ScrollView, Platform, StyleSheet, Text, View, TouchableOpacity,Image, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Imagem from '../../imgs/imageConst';

class Report extends Component {
    
        static navigationOptions = {
            title: 'Reportar',
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
        onPressFuntionGood = () => {
            this.props.navigation.navigate('Home')
            alert('Obrigado por reportar que está bem no aplicativo Guardiões!!')
        }
        onPressFuntionBad = () => {
            this.props.navigation.navigate('badReport')
            alert('Obrigado por reportar seu estado de saúde no aplicativo Guardiões!!')
        }
        render() {
        return(
            <View style={styles.container}>
                
                <View style={styles.textoInicialView}>
                    <Text  style={styles.textoInicial}>
                    Nos ajude a prevenir riscos para a saúde durante ou após 8 dias, relatando sintomas que ocorrem durante ou depois de participar de um evento massivo.
                    </Text>
                </View>
                <ImageBackground source={Imagem.imagemFundo} style={styles.container} imageStyle={{resizeMode:'stretch'}}>
                <View style={styles.textoPerguntaView}>
                    <Text style={styles.textoPergunta}>Como está sua saúde neste momento?</Text>
                </View>
                <View style={styles.reportView}>
                    <TouchableOpacity onPress={() =>this.onPressFuntionGood()}>
                        <Image  style={{width: 150, height: 150}} source={Imagem.imagemGood}/>
                        <Text style={styles.moodText}> BEM </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressFuntionBad()}>
                        <Image style={{width: 150, height: 150}} source={Imagem.imagemBad}/>
                        <Text style={styles.moodText}> MAL </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.reportFooter}>
                       Se a opção escolhida foi MAL poderá selecionar os sintomas na seguinte tela.      
                    </Text>
                </View>
                </ImageBackground>
            </View>
      
        );
    }}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          height: '100%',
        },
          titulo: {
            
          },
          backButton: {
              alignSelf: 'center',
              marginLeft: '1%',
          },
          textoInicialView: {
            backgroundColor: '#0084b4',
            height: '12%',
          },
          textoInicial: {
              justifyContent: 'center',
              fontWeight: 'bold',
              margin: '1.5%',
              fontSize: 16,
              textAlign:'center',
              color: '#ffffff'
          },
          textoPerguntaView: {
              marginTop: '15%',
              alignItems: 'center',
          },
          textoPergunta: {
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 36,
            textAlign: 'center',
            color: '#0084b4',
          },
          reportView: {
              flex: 1,
              marginTop: '10%',
              flexDirection: 'row',
              justifyContent: 'space-around',
          },
          reportFooter: {
              justifyContent: 'center',
              fontWeight: 'bold',
              margin: '1%',
              fontSize: 14,
              textAlign:'center',
          },
          moodText: {
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: '20%'
          },
    })

//make this component available to the app
export default Report;
