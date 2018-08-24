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
import drawerContentComponents from './drawerContentComponent';
import { Badge } from 'react-native-elements';

export const Stack = createStackNavigator({
  TelaInicial: { screen: TelaInicial },
  Registrar: { screen: Registrar },
  Login: { screen: Login },
  Home: { screen: Home },
  Diario: { screen: Diario },
  Conselho: { screen: Conselho },
  Noticias: { screen: Noticias },
  Reportar: { screen: Reportar },
  Request: { screen: Request },
  BadReport: { screen: BadReport },
},{
  initialRouteName: 'TelaInicial'
})

export const Drawer = createDrawerNavigator({
	Stacks: { screen: Stack, navigationOptions: { drawerLockMode: 'locked-closed' } },
}, {
  contentComponent: drawerContentComponents
})
