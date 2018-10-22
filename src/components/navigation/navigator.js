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
import requestTest from '../principal/requestTest';
import TermosPoliticas from '../principal/TermosPoliticas';
import CopilotTest from '../principal/copilot';


export const Cadastro = createStackNavigator({
    TelaInicial: { screen: TelaInicial },
    Registrar: { screen: Registrar },
    Login: { screen: Login },
    AddInfo: { screen: AddInfo },
}, {
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#04617E',
                elevation: 10,
            },
            headerTitleStyle: {
                fontFamily: 'roboto',
                
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
    requestTest,
    TermosPoliticas,
    CopilotTest,

}, {
        initialRouteName: 'Home',
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#04617E',
                elevation: 10,

            },
            headerTitleStyle: {
                fontFamily: 'roboto',
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
