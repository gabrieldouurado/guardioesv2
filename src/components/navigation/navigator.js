import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import Login from '../telainicial/Login';
import Home from '../principal/Home';
import Diario from '../principal/Diario';
import Conselho from '../principal/Conselho';
import Noticias from '../principal/Noticias';
import Reportar from '../principal/Reportar';
import Request from '../principal/request';
import BadReport from '../principal/badReport';
import Prevencao from '../conselhos/prevencao';
import drawerContentComponents from './drawerContentComponent';
import { Badge } from 'react-native-elements';

export const Cadastro = createStackNavigator({
  TelaInicial: { screen: TelaInicial },
  Registrar: { screen: Registrar },
  Login: { screen: Login },
})

export const Stack = createStackNavigator({
  Home: { screen: Home },
  Diario: { screen: Diario },
  Conselho: { screen: Conselho },
  Noticias: { screen: Noticias },
  Reportar: { screen: Reportar },
  Prevencao: { screen: Prevencao},
  BadReport: { screen: BadReport },
},{
  initialRouteName: 'Home'
})

export const Drawer = createDrawerNavigator({
  Cadastro: { screen: Cadastro, navigationOptions: { drawerLockMode: 'locked-closed' }},
	Stacks: { screen: Stack },
}, {
  contentComponent: drawerContentComponents
})
