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
    Alert, 
    Switch,
    ListView,
    RefreshControl,
}
    from 'react-native';

import TextBox from '../lib/TextBox' 
import config from '../../app.json'

import AppCore from '../app.core';
import ActivityIndicatorComponent from '../lib/ActivityIndicatorComponent';

export default class JDUserInfo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {  
            dataSource: this.ds.cloneWithRows([]),
            username: null,
            userId:null ,
            password:null,
            email:null,
            isRefreshing:false,
            falseSwitchIsOn:true
        };   
    }
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
       
    //返回按钮事件
    _pressBackButton() {
        if(this.props.navigator){ 
            this.props.navigator.push({ 
                name: 'JDIndex',
                  params:{  
                    userId:this.state.userId,  
                  }
            });
        }
    } 

    //新增地址按钮事件
    _pressNewAddressButton() {  
        if(this.props.navigator){ 
            this.props.navigator.push({ 
                //目标界面
                name: 'JDAddressEdit',
                //传入的参数
                  params:{  
                    Id:0,   
                }
            });
        }
    }

     //修改地址按钮事件
    _pressUpdateAddress(id) { 
        if(this.props.navigator){ 
            this.props.navigator.push({ 
                //目标界面
                name: 'JDAddressEdit',
                //传入的参数
                  params:{  
                    Id:id,   
                }
            });
        }
    } 
     
     //-------------菜单操作按钮事件-------------
        _turnToJDUserPage (){ 
            if(this.props.navigator){
                this.props.navigator.push({
                    name: 'JDUserInfo'
                });
            }
        }

        _turnToJDOrderHostoryPage() { 
            if (this.props.navigator) {
            this.props.navigator.push({
                // name: 'JDQueryHistory'
                name:'JDOrderHistory'
            });
            }
        }

        _turnToJDIndexPage (){ 
            if(this.props.navigator){
                this.props.navigator.push({
                    name: 'JDIndex'
                });
            }
        } 
        //--------------end------------

        render() {
        var navigationView = (
        <View style={{ flex: 1, height: 300, backgroundColor: '#e0f6ff' }}>
            <TouchableOpacity onPress={() => { { this._turnToJDIndexPage() } }}>
            <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单首页</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => { { this._turnToJDOrderHostoryPage() } }}>
            <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单记录</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => { { this._turnToJDUserPage() } }}>
            <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>个人信息</Text>
            </TouchableOpacity>
        </View>)

            return (
                <DrawerLayoutAndroid
                    drawerWidth={150}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}> 

                    <View style={styles.container}>
                        <View style={styles.Texttitle}>
                        
                            <View style={styles.BackButtonViewStyle}>
                            <TouchableOpacity onPress={()=>{{this._pressBackButton()}}}>
                                <Text style={{ fontSize: 18, color: 'red' }}>
                                    返回
                                </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.ViewUserInfoTitleStyle}>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                                        个人信息
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.ViewSaveButtonStyle}>
                                <TouchableOpacity 
                                    onPress={() => this.SaveUserInfo()}>
                                    <Text style={{ fontSize: 18, color: 'red' }}>
                                        保存
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.ViewTouxianStyle}>
                            <View style={styles.ViewtouxianTextStyle}>
                                <Text>  头像 </Text>
                            </View>
                        <View style={styles.ViewNameTextStyle}>
                                <Image source={require('../res/images/q.png')} />
                            </View>
                        </View>

                        <View style={styles.ViewTouxianStyle}>
                            <View style={styles.ViewtouxianTextStyle}>
                                <Text>  昵称：  </Text>
                            </View>
                            <View style={styles.ViewNameTextStyle}>
                            <TextInput  value={this.state.username}
                                        onChangeText={(text) => this.setState({username: text})}/>  
                            </View>
                        </View>

                        <View style={styles.ViewTouxianStyle}>
                            <View style={styles.ViewtouxianTextStyle}>
                                <Text>  密码:  </Text>
                            </View>
                            <View style={styles.ViewNameTextStyle}>
                            <TextInput  value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}  
                                /> 
                            </View>
                        </View>
                        
                        <View style={styles.ViewTouxianStyle}>
                            <View style={styles.ViewtouxianTextStyle}>
                                <Text>  邮箱: </Text>
                            </View>
                        <View style={styles.ViewNameTextStyle}>
                                <TextInput value={this.state.email+''}  /> 
                            </View>
                        </View>
                        <View style={{height:320}}>
                            <View >
                                <Text>  收货地址: </Text>
                            </View>
                        <View style={{height:320}}>
                                <ScrollView style={styles.ScrollViewStyle}>
                                        <ListView dataSource={this.state.dataSource}
                                            renderRow={(rowData) => this.customerRenderRow(rowData)} enableEmptySections={true}
                                            refreshControl={<RefreshControl
                                                refreshing={this.state.isRefreshing}
                                                onRefresh={this.refreshData.bind(this)}  />}>
                                            </ListView> 
                                </ScrollView>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.NewAddressButtonViewStyle}
                                onPress={()=>{{this._pressNewAddressButton()}}}>
                                <Text style={styles.NewAddressButtonStyle} > + 新建地址 </Text>
                            </TouchableOpacity>
                        </View>
            </View>
                </DrawerLayoutAndroid>
            );
        }

        //删除地址按钮事件
        async _pressDeleteAddress(Id)
        {
            this.setState({ isRefreshing: true }); 
            let AddressModel = await AppCore.send('api/Address/DeleteAddressByID',{method:"GET",data:{Id:Id}});  

            if (AddressModel.id>0) {
                AppCore.showMessage("删除成功！");  
            }
            else{
                AppCore.showMessage("删除失败！"); 
            }

            this.setState({ isRefreshing: true });
            this.setState({ isRefreshing: false });
        }
    
    //获取当前用户的信息
    async GetUserByUserID()
    { 
        let currentUser = await AppCore.getUser();   
        let data = await AppCore.send('api/user/GetUserInfoByID',{method:"GET",data:{Id:currentUser.id}}); 
        //Alert.alert(data.password+'');
        this.setState({    
                userId:currentUser.id,
                username:currentUser.userName,   
                password:data.password,  
                email:data.address,
         });  
            
        //Alert.alert(currentUser.password+'');
    }

    async componentDidMount() {
        await this.refreshData();
        await this.GetUserByUserID();
    }

   //获得当前用户的收货地址
    async refreshData() { 
        this.setState({ isRefreshing: true });
        let currentUser = await AppCore.getUser();
        let data = await AppCore.send('api/Address/GetAllAddressByUserID',{method:"GET",data:{UserId:currentUser.id}}); 
        this.setState({ dataSource: this.ds.cloneWithRows(data) });  
        this.setState({ isRefreshing: false });
    }

    customerRenderRow(rowData) { 
        return(
        <View style={{height:100}} >
             <View style={{height:30,flexDirection:'row',borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5  }}>
                        <Text>{rowData.consigneeName}</Text>
                        <Text style={{marginLeft:40}}>{rowData.phoneNumber}</Text>
                </View>
                <View style={{ height:30,borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 }}>
                        <Text>{rowData.addressArea}</Text>  
                </View>
                <View style={{height:30,flexDirection:'row',borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 }}> 
                     <View style={{flex:1,flexDirection:'row'}}>
                            <Switch 
                                disabled={false}  
                                onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                                value={rowData.isAddressDefault}
                             />
                            <Text>默认地址</Text> 
                            </View>
                    <View style={{ flex:4,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Image source={require('../res/images/edit.png')}/>
                            <TouchableOpacity  onPress={()=>{{this._pressUpdateAddress(rowData.id)}}}>
                                <Text> 修改 </Text>
                            </TouchableOpacity>
                            <Image source={require('../res/images/delete.png')} />
                            <TouchableOpacity onPress={()=>{{this._pressDeleteAddress(rowData.id)}}}>
                                 <Text> 刪除 </Text>
                            </TouchableOpacity>
                    </View> 
            </View> 
        </View> 
        );  
    } 
  
    //保存事件
    async SaveUserInfo() {
    // this.refs.dialog.showWaiting();
        //获取当前user
        let currentUser = await AppCore.getUser(); 
        //获取当前输入的内容
        let usernamestr=this.state.username;
        let userIdstr=currentUser.id ;
        let passwordstr=this.state.password; 
        
        //Alert.alert(usernamestr+','+passwordstr); 
        let UserModel = await AppCore.send("api/User/SavaUserInfo", { method: "GET", data: 
            { 
                userId: currentUser.id,
                UserName:usernamestr,
                Password:passwordstr, 
            }});
            //Alert.alert(UserModel.userId+'')
         //todo: 保存提示   
        if (UserModel.id>0) {
            AppCore.showMessage("修改成功！");

        } else {
            AppCore.showMessage("修改失败！"); 
        }
    }  
}

const styles = StyleSheet.create({
    container: { flex: 1,},
    edit: { marginTop: 30,  height: 40,   fontSize: 20,  backgroundColor: '#fff'},

    Texttitle:{  height:50,  flexDirection: 'row',  backgroundColor: "#05a5d1"  }, 
    BackButtonViewStyle:{ flex: 1, justifyContent: 'center', marginLeft: 8 },
    ViewUserInfoTitleStyle:{ flex: 4, justifyContent: 'center'},
    ViewSaveButtonStyle:{ flex: 1, justifyContent: 'center', marginRight: 8 },

    ViewTouxianStyle:{ height:50, flexDirection: 'row', borderBottomColor: '#c1b4b457', borderBottomWidth: 0.5 },
    ViewtouxianTextStyle:{ height:50, justifyContent: 'center', marginLeft: 10 },
    ViewNameTextStyle:{ flex: 2, justifyContent: 'center', },

     ScrollViewStyle: { margin:20, },
     NewButtonStyle:{backgroundColor :"#ff0000",marginLeft:50},

    NewAddressButtonStyle: {  color: '#ffffff',   fontWeight: 'bold',    },
    NewAddressButtonViewStyle: { 
        height:40,
        backgroundColor: '#3281DD',
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    
});
