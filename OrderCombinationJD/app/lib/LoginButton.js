import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native'

export default class LoginButton extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <TouchableOpacity style={LoginButtonStyles.LoginButtonView}
                onPressOut={this.props.onPress}
            >
                <Text style={LoginButtonStyles.LoginButton} >
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const LoginButtonStyles = StyleSheet.create({
  LoginButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    width:30,
  },
  LoginButtonView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#3281DD',
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
})