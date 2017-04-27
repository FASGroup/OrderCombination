import React, { Component, PropTypes } from 'react';
import { 
    StyleSheet,
    Image,
    Button,
    TextInput,
    ScrollView, 
    View,
   Text,
   Navigator ,
   TouchableOpacity,
   TouchableHighlight ,
   Alert,
  } 
from 'react-native';
 
export default class ThirdPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

      //返回按钮事件  
     _pressBackButton() {
         if(this.props.navigator){
            this.props.navigator.push({
                name: 'JDUserInfo'
            });
        }
    }
    
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    } 
    
    //保存按钮事件
    _pressButton_Save(){
        Alert.alert('保存成功','保存成功');
    }  
    render() {
    return ( 
                   <View style={styles.container}>   
                      <View style={{flex:1,flexDirection:'row',backgroundColor:"#05a5d1"}}>
                          <View style={{flex:1,justifyContent:'center',marginLeft:8}}>
                            <TouchableHighlight onPress={()=>{{this._pressBackButton()}}}>
                            <Text style={{fontSize:18,color:'red'}}>
                                返回
                             </Text> 
                               </TouchableHighlight>
                          </View>
                          
                          <View style={{flex:4,justifyContent:'center',}}> 
                                <Text style={{fontSize:18,alignSelf:'center'}}>
                                  填写个人信息
                                </Text>  
                         </View>
                         
                         <View style={{flex:1,justifyContent:'center',marginRight:8}}>
                             <TouchableHighlight  onPress={()=>this._pressButton_Save()}>
                                <Text style={{fontSize:18,color:'red'}}>
                                    保存 
                                </Text> 
                            </TouchableHighlight>
                          </View>
                     </View>
                    
                    <View style={{flex:1,flexDirection:'row',borderBottomColor: '#c1b4b457',borderBottomWidth:0.5}}>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                                        <Text>
                                            头像
                                        </Text> 
                                    </View>
                                    
                                        <View style={{flex:3,justifyContent:'center', }}>
                                            <Image source={require('../res/images/moren.png')}  />  
                                    </View>
                            </View>
                        
                            <View style={{flex:1,flexDirection:'row',borderBottomColor: '#c1b4b457',borderBottomWidth:0.5}}>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                                        <Text>
                                            昵称
                                        </Text> 
                                    </View>
                                <View style={{flex:3,justifyContent:'center', }}>
                                    <TextInput placeholder="请输入名称"/> 
                                </View>
                            </View>
                            
                            <View style={{flex:1,flexDirection:'row',borderBottomColor: '#c1b4b457',borderBottomWidth:0.5}}>
                                <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                                    <Text>
                                        邮箱
                                    </Text> 
                                    </View>
                                <View style={{flex:3,justifyContent:'center', }}>
                                    <TextInput placeholder="rickpeng@apjcorp.com"/>  
                                </View>
                            </View>
                            
                            <View style={{flex:6}}>
                            </View>
             </View>
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
    
    Viewstyle:{
        flex:1,
        flexDirection:'row',
        borderBottomColor:'#c1b4b457',
        borderBottomWidth:0.5,
    }
    
});