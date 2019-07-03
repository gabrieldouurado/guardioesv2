import React from 'react';
import {
  ActivityIndicator, AsyncStorage, Image, StatusBar, StyleSheet
} from 'react-native';
import { imagemLogo, imagemLogoBR } from '../../imgs/imageConst';
import LinearGradient from 'react-native-linear-gradient';
import translate from '../../../locales/i18n';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let UserID = await AsyncStorage.getItem('userID');

    if (UserID !== null) {
      setTimeout(() => {
        this.props.navigation.navigate('BottomMenu');
      }, 1500);
    } else {
      this.props.navigation.navigate('Cadastro');
    }
  };

  // Render any loading content that you like here
  render() {
    const statusColor = (<StatusBar backgroundColor='#348EAC' />)

    const logoBR = (
      <Image style={styles.imageLogo} source={imagemLogoBR} />
    )

    const logoES = (
      <Image style={styles.imageLogo} source={imagemLogo} />
    )

    let imageType;
    if (translate("initialscreen.title") === "Guardianes de la Salud") {
      imageType = logoES
    }
    else {
      imageType = logoBR
    }

    return (
      <LinearGradient style={styles.container} colors={['#348EAC', '#013444']} start={{ x: 1.5, y: 0.6 }} end={{ x: -0.2, y: 1.4 }}>
        {statusColor}
        {imageType}
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    marginBottom: 20,
    height: '35%',
    resizeMode: 'center',
  }
});

export default AuthLoadingScreen;