import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native'

export default  class TextBox extends Component {
    constructor (props){
        super(props);
        this.state = { text : this.props.value || ""};
    }

    render (){
        return (
            <View style={TextBoxStyles.TextBoxView}>
                <TextInput 
                style={TextBoxStyles.TextBox}
                placeholder={this.props.placeholder} 
                onChangeText={(text)=>{ 
                    this.setState({text:text});
                    this.props.onChangeText && this.props.onChangeText(text);
                }} 
                underlineColorAndroid={'transparent'}
                secureTextEntry={this.props.secureTextEntry}
                defaultValue={this.props.value}
                />
            </View>
        );
    }
    value (){
        return this.state.text;
    }
}

const TextBoxStyles = StyleSheet.create({
  TextBoxView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius:5,
    borderWidth:0.3,
    justifyContent: 'center',
  },

  TextBox: {
    backgroundColor: '#ffffff',
    height:45,
    margin:18,
    padding:0
  },
});