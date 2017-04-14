import React, { Component } from 'react'

import {
    AppRegistry,
    View,
    Text,
    Button
} from 'react-native'

export default class Home extends Component{
    render(){
        return (
            <View>
                <Text>这里是主页</Text>
                <Button title="退出" onPress={()=>{this._turnToLoginPage();}}></Button>
            </View>
        )
    }
    _turnToLoginPage (){
        this.props.navigator.pop();
    }
}