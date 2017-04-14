import React, { Component } from 'react'

import {
    AppRegistry,
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native'

import TextBox from '../lib/TextBox'
import LoginButton from '../lib/LoginButton'
import App from '../app.core'

export default class LoginView extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: '',
            pwd: ''
        };
    }
    render(){
        let self = this;
        return (
            <ScrollView style={loginPageStyles.loginView}>
                    <View style={loginPageStyles.logoContainer}>
                    <Image source={require('../res/images/login_user.png')} style={{resizeMode:'contain',width:180}} />
                    </View>
                    <View style={loginPageStyles.loginForm}>
                    <TextBox placeholder='登录名' onChangeText={(text) => {this.setState({uid: text}) }}/>
                    <TextBox placeholder='密码' secureTextEntry={true} onChangeText={(text) => {this.setState({pwd: text}) }}/>
                    <LoginButton title='登录' onPress={()=>{{this._turnToHomePage()}}}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
                    </View>
            </ScrollView>
            );
    }
    async _turnToHomePage (){
        //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
		//Alert.alert('warning','点击了登录按钮');
        var uobj = this.state;
		
		/*
		var obj = { UserName: "abc", Password: "ddd" };
		fetch('http://10.231.131.15:5000/api/User/GetUserInfo',{
			method: "POST",
			headers: {
                 'Accept': 'application/json', 
                 'Content-Type': 'text/json'
				 //'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
            },
			body: JSON.stringify(obj)
			//body : "=sssss"
        })
        .then((response) => response);
		return;
		*/

      
        if(uobj.uid == ''){ App.showMessage('用户名不允许为空'); return;}
        if(uobj.pwd == ''){ App.showMessage('密码不允许为空'); return;}
        var obj = { UserName: uobj.uid, Password: uobj.pwd };
		
		let data = await App.send('api/User/GetUserInfo',{method:"POST",data:obj});
        if(data && data.isSuccess)
        {
            App.setCache(App.const.token_key,data.data2);
            App.setCache(App.const.user_key,data.data);

            if(this.props.navigator){
                this.props.navigator.push({
                    name: 'JDIndex'
                });
            }
        }

		
		/*
		let aa = await fetch('http://192.168.88.124:5000/api/User/ValidToken?token=76f34866b14a43fd9292920e0eb7af62&_token=abc',{
			headers:{
				'Token': '4fce8ffb6d88483d9f0f684ea9b84e39'
			}
		});
		let result = await aa.json();
		// let aa2 = await fetch('http://192.168.88.124:5000/api/User/GetUserInfo');
		// let result = await aa2.json();
		// Alert.alert(result.token);
		
		/*
		let aa = await fetch('http://10.231.131.15:5000/api/Main/Test2');
		let result = await aa.json();
		Alert.alert(result.token);
		
		/*
		fetch('http://10.231.131.15:5000/api/Main/Test2')
            .then((response) => { 
                return response.json()
            })
            .then((responseJson) => {
				Alert.alert('warning','1111111111111');
            })
            .catch((error) => {
				Alert.alert('warning','22222222222222222');
                console.error(error);
            });

		
		/*
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
		  if (request.readyState !== 4) {
			  Alert.alert('warning','1111111111111');
			return;
		  }

		  if (request.status === 200) {
			  Alert.alert('warning','22222222222222222');
			console.log('success', request.responseText);
		  } else {
			  Alert.alert('warning','33333333333333333|' + request.status + request.responseText);
			console.warn(request);
		  }
		};

		request.open('GET', 'http://10.231.131.15:5000/api/Main/Test2');
		request.send();

		/*
        if(this.props.navigator){
            this.props.navigator.push({
                name: 'HomePage'
            });
        }
		*/
    }
}

const loginPageStyles = StyleSheet.create({
  loginView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 1,
    alignItems: 'flex-start',
  },
  loginForm:{
    marginTop:80
  }
});