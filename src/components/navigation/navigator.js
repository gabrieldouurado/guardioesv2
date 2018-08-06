import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import TelaInicial from '../telainicial/TelaInicial';
import Registrar from '../telainicial/Registrar';
import Login from '../telainicial/Login';
import Home from '../principal/Home';
import drawerContentComponents from './drawerContentComponent';

export const Stack = createStackNavigator({
  TelaInicial: { screen: TelaInicial },
  Registrar: { screen: Registrar },
  Login: { screen: Login },
  Home: { screen: Home },  
},{
  initialRouteName: 'Home'
})

export const Drawer = createDrawerNavigator({
	Stacks: { screen: Stack, navigationOptions: { drawerLockMode: 'locked-closed' } },
}, {
  contentComponent: drawerContentComponents
})