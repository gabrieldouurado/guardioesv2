import { Alert, Linking } from 'react-native';

export const app_token = 'd41d8cd98f00b204e9800998ecf8427e';
export const API_URL = 'http://192.168.0.10:3001';

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