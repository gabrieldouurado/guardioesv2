import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import Login from '../telainicial/Login';
import AddInfo from '../telainicial/RegistrarFacebook';
import Home from '../principal/Home';
import Diario from '../principal/Diario';
import Conselho from '../principal/Conselho';
import Noticias from '../principal/Noticias';
import Reportar from '../principal/Reportar';
import BadReport from '../principal/badReport';
import Household from '../principal/Household';
import drawerContentComponents from './drawerContentComponent';
import Maps from '../principal/Maps';
import Perfil from '../principal/Perfil';
import Ajuda from '../principal/Ajuda';
import Sobre from '../principal/Sobre';
import { Botao1 } from '../principal/AjudaBtn1';
import { Botao2 } from '../principal/AjudaBtn2';
import Prevention from '../conselhos/prevention';
import TravelHealth from '../conselhos/travelhealth';
import Dengue from '../conselhos/dengue';
import Diseases from '../conselhos/diseases';
import Phones from '../conselhos/phones';
import ChooseReporter from '../principal/ChooseReporter';


export const Cadastro = createStackNavigator({
    TelaInicial: { screen: TelaInicial },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
    AddInfo: { screen: AddInfo },
}, {
        navigationOptions: {
            headerTintColor: '#9B6525',
            headerStyle: {
                backgroundColor: '#dfdfd0',
                elevation: 0,
                borderBottomWidth: 5,
                borderColor: '#9B6525',
            },
            headerTitleStyle: {
                fontFamily: 'poiretOne', // FontWeight can't be > 400 and fontFamily WON'T WORK without it
                fontWeight: '400'
            }
        }
    })

export const Stack = createStackNavigator({
    Home,
    Diario,
    Conselho,
    Noticias,
    Reportar,
    BadReport,
    Mapa: { screen: Maps },
    Household,
    Perfil,
    Ajuda,
    Sobre,
    Botao1,
    Botao2,
    Prevention,
    TravelHealth,
    Dengue,
    Diseases,
    Phones,
    Household,
    ChooseReporter,
}, {
        initialRouteName: 'Home',
        navigationOptions: {
            headerTintColor: '#9B6525',
            headerStyle: {
                backgroundColor: '#dfdfd0',
                elevation: 0,
                borderBottomWidth: 5,
                borderColor: '#9B6525',
            },
            headerTitleStyle: {
                fontFamily: 'poiretOne',
                fontWeight: '400',
            }
        }
    }, {
        initialRouteName: 'Home'
    }


)

export const Drawer = createDrawerNavigator({
    Cadastro: { screen: Cadastro, navigationOptions: { drawerLockMode: 'locked-closed' } },
    Stacks: { screen: Stack },
}, {
        contentComponent: drawerContentComponents
    })
