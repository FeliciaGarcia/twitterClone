import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Actions } from 'react-native-router-flux';
import {View} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Thumbnail,
  Icon
} from 'native-base';
import axios from 'axios';
import TextField from '../../components/TextField';
import styles from './styles';
import { addUser } from '../../redux/reducers/users';
import cosmicConfig from '../../config/cosmic';
const mapDispatchToProps = {addUser};
const validate = form => {
  let errorMessage = '';
  if (form.username.includes(" ")){
    errorMessage = "Username cannot contain spaces";
  }
  if (form.password.includes(" ")){
    errorMessage = "Password cannot contain spaces";
  }
  Object.keys(form).slice(0, 5).map(field => {
    if (!form[field]){
      errorMessage = 'All fields must be filled';
    }
  })
  return errorMessage;
}
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      image: null,
      error: '',
    };
  }

  onSubmit(){
  const error = validate(this.state);
  if (error) {
    this.setState({ error })
  } else {
    this.checkUsername(this.state.username);
  }
}
checkUsername(username){
  axios.get(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/users/search?metafield_key=username&metafield_value=${username}`)
  .then(res => res.data)
  .then(data => {
    if (data.objects) {
      this.setState({ error: 'Username not available'})
    } else {
      this.props.addUser(this.state);
    }
  })
}
