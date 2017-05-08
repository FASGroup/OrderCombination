import React, { Component } from 'react'

import {
    AppRegistry,
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Alert,
    Platform,
    BackAndroid ,
    ToastAndroid
} from 'react-native'

import TextBox from '../lib/TextBox'
import LoginButton from '../lib/LoginButton'

import App from '../app.core'
import config from '../../app.json';  

export default class LoginView extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let self = this;
        return (
            <ScrollView style={loginPageStyles.loginView}>
                    <View style={loginPageStyles.logoContainer}>
                    <Image source={require('../res/images/login_user.png')} style={{resizeMode:'contain',width:180}} />
                    </View>
                    <View style={loginPageStyles.loginForm}>
                    <TextBox ref="loginuser" value={config.testuser.uid} placeholder='登录名' />
                    <TextBox ref="loginpwd" placeholder='密码' value={config.testuser.pwd} secureTextEntry={true}/>
                    <LoginButton title='登录' onPress={()=>{{this._turnToHomePage()}}}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
                    </View>
            </ScrollView>
            );
    }
    async _turnToHomePage (){
        //获取登陆名和密码
        var uobj = {
            uid : this.refs.loginuser.value(),
            pwd : this.refs.loginpwd.value(),
        };
      
        if(uobj.uid == ''){ App.showMessage('用户名不允许为空'); return;}
        if(uobj.pwd == ''){ App.showMessage('密码不允许为空'); return;}
        var obj = { UserName: uobj.uid, Password: uobj.pwd };
        //与数据库进行交互 验证登陆信息与数据
		   let data = await App.send('api/User/GetUserInfo',{method:"POST",data:obj,timeout:5000});
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
    }

    
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  
  onBackAndroid = () => {
     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    return true;
  };
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