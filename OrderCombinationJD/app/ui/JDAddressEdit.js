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
     
}
    from 'react-native';

import TextBox from '../lib/TextBox' 
import config from '../../app.json'

import AppCore from '../app.core';
import ActivityIndicatorComponent from '../lib/ActivityIndicatorComponent';

export default class JDAddressEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            id:null,
            userId:null,  
            ConsigneeName:null,
            PhoneNumber:null,
            AddressArea:null,
            AddressDetailed:null,
            IsAddressDefault:true,
        };  
    }
      
    componentDidMount() {  
            this.setState({   
                id:this.props.Id
            });  
        }
  

    //返回按钮事件
    _pressBackButton() {
        if(this.props.navigator){ 
            this.props.navigator.push({ 
                //目标界面
                name: 'JDUserInfo',
                //传入的参数
                  params:{  
                    username:this.state.username,  
                    password:this.state.password  
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
    /*var navigationView = (
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
      </View>)*/
        return (
            /*<DrawerLayoutAndroid
                drawerWidth={150}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>*/

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
                                <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                                    编辑收货地址
                                </Text> 
                        </View>

                        <View style={styles.ViewSaveButtonStyle}>
                            
                        </View>
                    </View> 
                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  收货人:  </Text>
                        </View>
                        <View style={styles.ViewNameTextStyle}>
                              <TextInput 
                                maxLength={100}
                                value={this.state.ConsigneeName}
                                onChangeText={(text) => this.setState({ConsigneeName: text})}/> 
                            </View>
                    </View>
                    
                     <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  手机号码: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput   
                             keyboardType='numeric'
                             maxLength={11}
                             ref="PhoneNumber"
                            value={this.state.PhoneNumber}
                            onChangeText={(text) => this.setState({PhoneNumber: this.chkphonenumber(text)})}/>  
                        </View>
                    </View>

                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  所在地区: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput   
                            maxLength={200}
                            value={this.state.AddressArea}
                            onChangeText={(text) => this.setState({AddressArea: text})}/>  
                        </View>
                    </View>

                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  详细地址: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput   
                            maxLength={200}
                            value={this.state.AddressDetailed}
                            onChangeText={(text) => this.setState({AddressDetailed: text})}/> 
                        </View>
                    </View>
                     <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  是否设置默认地址: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <Switch 
                                onValueChange={(value)=>{this.setState({isAddressDefault:value})}}
                                value={this.state.isAddressDefault}
                             />
                        </View>
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.NewAddressButtonViewStyle}
                            onPress={()=>this.AddNewAddress()}>
                            <Text style={styles.NewAddressButtonStyle} >保存</Text>
                        </TouchableOpacity>
                    </View>
        </View>
            // </DrawerLayoutAndroid>
        );
    }

      //验证数量的输入
    chkphonenumber(obj) {   
       var reg = new RegExp("^[0-9]*$");   
       if(!reg.test(obj)){
           Alert.alert("验证提示","请输入一个正确的电话号码!");
           //清除输入的内容
           this.refs.PhoneNumber.clear();
           obj=null;
           return obj;
        }
        else { 
            return obj;  
        } 
    }

    async componentDidMount() { 
        await this.GetAddressByID();
  } 

    //根据ID获取一条地址信息记录
    async GetAddressByID()
    {
        let id=this.props.Id; 
       if(id>0)
       {
            this.setState({AddressDetailed:id+''})
            let AddressModel = await AppCore.send("api/Address/GetAddressByID", { method: "GET", data:  { Id: id}});
            // Alert.alert(AddressModel.consigneeName);
            this.setState({   
                id:id,
                userId:AddressModel.userId,  
                ConsigneeName:AddressModel.consigneeName,  
                PhoneNumber:AddressModel.phoneNumber,  
                AddressArea:AddressModel.addressArea, 
                AddressDetailed:AddressModel.addressDetailed,  
                isAddressDefault:AddressModel.isAddressDefault,
                });  
        }
    }

    //保存事件
    async AddNewAddress() {
    // this.refs.dialog.showWaiting();
        //获取当前user
        let currentUser = await AppCore.getUser();
        //获取当前输入的内容
        let ConsigneeNamestr=this.state.ConsigneeName;
        let PhoneNumberstr=this.state.PhoneNumber;
        let AddressAreastr=this.state.AddressArea;
        let AddressDetailedstr=this.state.AddressDetailed;
        let Id=this.state.id;
        let isAddressDefault=this.state.isAddressDefault;

        //输入验证
        if(ConsigneeNamestr==null||ConsigneeNamestr=='')
        {
              Alert.alert('验证提示','收货人名称必填！');
              return;
        }

         if(PhoneNumberstr==null||PhoneNumberstr=='')
        {
              Alert.alert('验证提示','联系电话必填！');
              return
        }

         if(AddressAreastr==null||AddressAreastr=='')
        {
            Alert.alert('验证提示','所属区域必填！');
              return
        }

         if(AddressDetailedstr==null||AddressDetailedstr=='')
        {
            Alert.alert('验证提示','详细地址必填！');
            return
        }

        //判断是新增还是修改
        if(Id==null)
        {
            Id=0
        }

        let AddressModel = await AppCore.send("api/Address/SaveNewAddress", { method: "GET", data: 
            {
                Id: Id,
                userId: currentUser.id ,
                ConsigneeName:ConsigneeNamestr,
                PhoneNumber:PhoneNumberstr,
                AddressArea:AddressAreastr,
                AddressDetailed:AddressDetailedstr, 
                isAddressDefault:isAddressDefault
            }});

        if (AddressModel.id>0&&Id>0) {
            AppCore.showMessage("修改成功！");
            // this.props.navigator.push({
            // name: 'JDUserInfo'});
        }
        else if(AddressModel.id>0&&Id==0) {
            AppCore.showMessage("新增成功！"); 
             this.props.navigator.push({
             name: 'JDUserInfo', });
        } 
        else{
             AppCore.showMessage("新增失败！"); 
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

     ScrollViewStyle: { margin:10, },
     NewButtonStyle:{backgroundColor :"#ff0000",marginLeft:50},

    NewAddressButtonStyle: {  color: '#fff',   fontWeight: 'bold',    },
    NewAddressButtonViewStyle: { 
        height:40,
        backgroundColor: '#3281DD',
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    
});
