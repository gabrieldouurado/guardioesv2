import { Alert, Linking } from 'react-native';

export const app_token = 'd41d8cd98f00b204e9800998ecf8427e';

export const Redirect = (titulo, message, url) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Cancelar", style: 'cancel' },
            { text: "Ok", onPress: () => Linking.openURL(`${url}`) }
        ]
    )
}

export const textos = [
    {
        textoGrande: 'aaaaaaaaa'
    },
    {
        tituloBtnUnb: 'Universidade de Brasilia',
        mensagemBtnUnb: 'Deseja ser redirecionado ao website da UnB?',
        linkBtnUnb: 'https://www.unb.br' 
    },
    {
        tituloBtnCenteias: 'Universidade de Brasilia - CENTEIAS',
        mensagemBtnCenteias: 'Deseja ser redirecionado ao website do Centeias?',
        linkBtnCenteias: 'https://fs.unb.br/centeias/'
    }
]