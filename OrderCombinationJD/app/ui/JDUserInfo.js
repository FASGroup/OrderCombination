import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Image,
    Button,
    TextInput,
    ScrollView,
    View,
    Text,
    Navigator,
    TouchableOpacity,
    DrawerLayoutAndroid,
    NavigationView,
}
    from 'react-native';

//import SecondPageComponent from './SecondPageComponent'
//import ThirdPageComponent from './ThirdPageComponent'
// import CoudanIndexPageComponent from './CoudanIndexPageComponent'
// import ImageUITEST from './ImageUITEST'
// import JDOrder from './JDOrder'
// import JDIndex from './JDIndex'


export default class FirstPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
 
    _pressBackButton() {
         if(this.props.navigator){
            this.props.navigator.push({
                name: 'JDUserInfo'
            });
        }
    }

    _pressButton_editInfo() {
          if(this.props.navigator){
            this.props.navigator.push({
                name: 'JDUserInfoEdit'
            });
        }
    }
_turnToJDUserPage (){
        //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
        if(this.props.navigator){
            this.props.navigator.push({
                name: 'JDUserInfo'
            });
        }
    }   
      _turnToJDIndexPage (){
        //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
        if(this.props.navigator){
            this.props.navigator.push({
                name: 'JDIndex'
            });
        }
    }
    
     _turnToJDShppingCarPage (){
        //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
        if(this.props.navigator){
            this.props.navigator.push({
                name: 'shoppingCar'
            });
        }
    }
    render() {
        //左边抽屉菜单效果
        var navigationView = (
            <View style={{ flex: 1, height: 300, backgroundColor: '#e0f6ff' }}>
                 <TouchableOpacity onPress={()=>{{this._turnToJDIndexPage()}}}>
                    <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单首页</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{{this._turnToJDShppingCarPage()}}}>
                    <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>少辉页面</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{{this._turnToJDIndexPage()}}}>
                    <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单记录</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{{this._turnToJDUserPage()}}}>
                    <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>收货地址</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{{this._turnToJDUserPage()}}}>
                    <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>个人信息</Text>
                </TouchableOpacity>
            </View>)
        return (
            <DrawerLayoutAndroid
                drawerWidth={150}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>

                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "#05a5d1" }}>
                       
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 8 }}>
                         <TouchableOpacity onPress={()=>{{this._pressBackButton()}}}>
                            <Text style={{ fontSize: 18, color: 'red' }}>
                                返回
                             </Text>
                              </TouchableOpacity>
                        </View>

                        <View style={{ flex: 4, justifyContent: 'center', }}>
                            <TouchableOpacity onPress={()=>{{this._pressBackButton()}}}>
                                <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                                    个人信息
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', marginRight: 8 }}>
                            <TouchableOpacity onPress={()=>{{this._pressButton_editInfo()}}}>
                                <Text style={{ fontSize: 18, color: 'red' }}>
                                    编辑
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                            <Text>
                                头像
                                </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Image source={require('../res/images/q.png')} />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                            <Text>
                                昵称
                                </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', }}>
                            <Text>
                                张三
                             </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                            <Text>
                                邮箱
                             </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', }}>
                            <Text>
                                rickpeng@apjcorp.com
                            </Text>
                        </View>
                    </View>

                    <View style={{ flex: 6 }}>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                <TextInput
                                    style={{ height: 40 }}
                                    //水印
                                  //  placeholder="first!"
                                    onChangeText={(text) => this.setState({ text })}
                                />
                                <Text style={{ padding: 10, fontSize: 42 }}>

                                    {this.state.text}
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    edit: {
        marginTop: 30,
        height: 40,
        fontSize: 20,
        backgroundColor: '#fff'
    },

});
