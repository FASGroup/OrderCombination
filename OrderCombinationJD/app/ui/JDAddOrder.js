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


export default class JDAddOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            userId:null,   
            CommodityName:null,
            CommodityUrl:null,
            Price:null,
            Quantity:null,
            Remark:null
        };  
    }
      
    //这里获取从其他页面传递过来的参数:
    getUserID() {   
            this.setState({   
               // userId:await AppCore.getUser().userId 
                userId:'2'
            });  
        }


    //返回按钮事件
    _pressBackButton() {
        if(this.props.navigator){ 
            this.props.navigator.push({ 
                //目标界面
                name: 'JDIndex',
                //传入的参数
                  params:{  
                    userId:this.state.userId,   
                }
            });
        }
    } 

    //保存按钮事件
    _pressButton_SaveNewOrder() { 
        this.refs.dialog.showWaiting();
        
        //let currentUser = await AppCore.getUser();
        let CommodityName=this.state.CommodityName;
        let CommodityUrl= this.state.CommodityUrl;
        let Price=this.state.Price;
        let Quantity=this.state.Quantity;
        let Remark=this.Remark;
 

        // let megerModel = await AppCore.send("api/Order/AddNewOrder", { method: "GET", data: { userId: currentUser.id } });
        // this.refs.dialog.hideWaiting();
        // if (true) { 
        //      AppCore.showMessage("添加成功！");
        // } else {
        //      AppCore.showMessage("添加失敗！");
        // } 
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

     _turnToJDShppingCarPage (){ 
        if(this.props.navigator){
            this.props.navigator.push({
                name: 'shoppingCar'
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
                                <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                                    添加新单
                                </Text> 
                        </View>

                        <View style={styles.ViewSaveButtonStyle}>
                            
                        </View>
                    </View> 
                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  商品名称:  </Text>
                        </View>
                        <View style={styles.ViewNameTextStyle}>
                              <TextInput  onChangeText={(text) => this.setState({CommodityName: text})}/> 
                        </View>
                    </View>
                    
                     <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  链接地址: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput onChangeText={(text) => this.setState({CommodityUrl: text})}/> 
                        </View>
                    </View>

                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  单价: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput onChangeText={(text) => this.setState({Price: text})}/> 
                        </View>
                    </View>

                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  数量: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput onChangeText={(text) => this.setState({Quantity: text})}/> 
                        </View>
                    </View>

                    <View style={styles.ViewTouxianStyle}>
                        <View style={styles.ViewtouxianTextStyle}>
                            <Text>  备注: </Text>
                        </View>
                       <View style={styles.ViewNameTextStyle}>
                            <TextInput onChangeText={(text) => this.setState({Remark: text})}/> 
                        </View>
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.NewAddressButtonViewStyle} 
                            onPress={()=>this.AddNewOrder()}>
                            <Text style={styles.NewAddressButtonStyle} >保存</Text>
                        </TouchableOpacity>

                    </View>

        </View>
            </DrawerLayoutAndroid>
        );
    }

 async AddNewOrder() {
   // this.refs.dialog.showWaiting();
    //获取当前user
    let currentUser = await AppCore.getUser();
    //获取当前输入的内容
    let CommodityNamestr=this.state.CommodityName;
    let CommodityUrlstr=this.state.CommodityUrl;
    let Pricestr=this.state.Price;
    let Quantitystr=this.state.Quantity;
    let Remarkstr=this.state.Remark;
    

   // Alert.alert(currentUser.id+','+CommodityName+','+','+CommodityUrl+','+Price+','+Quantity+','+Remark);

    let OrderModel = await AppCore.send("api/Order/AddNewOrder", { method: "GET", data: 
        { 
         userId: currentUser.id ,
         CommodityName:CommodityNamestr,
         CommodityUrl:CommodityUrlstr,
         Price:Pricestr,
         Quantity:Quantitystr,
         Remark:Remarkstr
        }});
  
        this.props.navigator.push({
        name: 'JDIndex',});
    //this.refs.dialog.hideWaiting();
    // if (OrderModel.Id=0) {
    //   AppCore.showMessage("新增失败！");

    // } else {
    //     AppCore.showMessage("新增成功！");
    //     this.props.navigator.push({
    //     name: 'JDIndex',
    //   });
    
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
