import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import TelaInicial from './src/components/telainicial/TelaInicial';
import Registrar from './src/components/telainicial/Registrar';
import Login from './src/components/telainicial/Login';

const Guardioes = createStackNavigator({
  TelaInicial: { screen: TelaInicial},
  Registrar: { screen: Registrar },
  Login: { screen: Login }
},{
  initialRouteName: 'TelaInicial'
})

export default Guardioes;