import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Font, AppLoading } from 'expo';
import store from './app/redux/store';
import Router from './app/config/routes';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }
