import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet, Image, Switch, TouchableOpacity,DrawerLayoutAndroid } from 'react-native'

export default class ShoppingCar extends Component {
    constructor(props) {
        super(props)

        var datas = [];

        for (var i = 0; i < 3; i++) {
            datas.push({
                recordID: i,
                price: '12.3',
                productName: '牛油果',
                img: require('../res/images/ss.jpg'),
                count: 2,
                desc: '我是牛油果啊，我是牛油果啊，我是牛油果啊，我是牛油果啊，我是牛油果啊，我是牛油果啊，我是牛油果啊，'
            });
        }


        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2 } });
        this.state = {
            dataSource: ds.cloneWithRows(datas)
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
        let imgs = {
            mms: require('../res/images/mms.png'),
            home: require('../res/images/home.gif'),
            question: require('../res/images/question.gif'),
            shoppingCar: require('../res/images/shoppingcart.gif')
        }

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
            <View>
                <View style={[sheets.header, sheets.rowDirection]}>
                    <View style={{ flex: 1 }}></View>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Text style={{ fontSize: 20 }}>购物车
                            <Text style={{ fontSize: 12 }}>(11)</Text>
                        </Text>
                    </View>
                    <View style={[{ flex: 1 }, sheets.rowDirection]}>
                        <View style={{ flex: 1 }}></View>
                        <View style={[{ flex: 1 }, sheets.childCenter]}>
                            <Text>编辑</Text>
                        </View>
                        <View style={[{ flex: 1 }]}>
                            <Image style={{ flex: 1, alignSelf: 'flex-end', height: 35, width: 35, }} source={imgs.mms} />
                        </View>
                    </View>
                </View>
                <View>
                    <ListView dataSource={this.state.dataSource} style={{ backgroundColor: 'gray' }}
                        renderRow={(rowData) => {
                            return (
                                <TouchableOpacity style={[sheets.listViewItem]}>
                                    <View style={[sheets.rowDirection, { padding: 5 }]}>
                                        <View style={{ flex: 5 }}>
                                            <Text>{rowData.productName} > </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>|    编辑</Text>
                                        </View>
                                    </View>
                                    <View style={[sheets.rowDirection, { backgroundColor: 'lightgray' }]}>
                                        <View>
                                            <Image source={rowData.img} style={{ height: 90, width: 90, margin: 5 }} />
                                        </View>
                                        <View style={{flex:1}}>
                                            <View><Text style={{ fontSize: 15 }}>{rowData.desc}</Text></View>
                                            <View><Text style={{ color: 'orangered' }}>限购10件</Text></View>
                                            <View style={sheets.rowDirection}>
                                                <View style={[{ flex: 4 },sheets.rowDirection]}>
                                                    <Text style={{ color: 'orangered' }}>￥{rowData.price * rowData.count}</Text>
                                                    <Text style={{ textDecoration: 'line-through' }}>￥126</Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems:'flex-end'}}>
                                                    <Text>X{rowData.count}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        } }
                        />
                </View>
                <View style={[sheets.rowDirection, sheets.counter]}>
                    <View style={[{ flex: 1 }, sheets.rowDirection]}>
                        <Switch style={{ paddingLeft: 5 }} />
                        <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                            <Text style={{ color: 'gray' }}>全选</Text>
                        </View>
                    </View>
                    <View style={[{ flex: 1 }, sheets.rowDirection]}>
                        <View style={[{ flex: 1 }]}>
                            <View style={[{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }]}>
                                <Text style={{ color: 'black', fontSize: 16, paddingRight: 10 }}>
                                    合计:  <Text style={{ color: 'orangered', fontSize: 12 }}>￥0</Text>
                                </Text>
                            </View>
                            <View style={[{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }]}>
                                <Text style={{ color: 'gray', fontSize: 10, paddingRight: 10 }}>不含运费</Text>
                            </View>
                        </View>
                        <View style={[{ flex: 1 }, sheets.childCenter, { backgroundColor: 'orangered' }]}>
                            <Text style={[{ fontSize: 18, color: 'white', fontWeight: 'bold' }]}>结算(0)</Text>
                        </View>
                    </View>
                </View>
                <View style={[sheets.rowDirection, sheets.buttom]}>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Image source={imgs.home} style={sheets.bottomImg} />
                        <Text>首页</Text>
                    </View>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Image source={imgs.home} style={sheets.bottomImg} />
                        <Text>微淘</Text>
                    </View>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Image source={imgs.question} style={sheets.bottomImg} />
                        <Text>问大家</Text>
                    </View>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Image source={imgs.shoppingCar} style={sheets.bottomImg} />
                        <Text>购物车</Text>
                    </View>
                    <View style={[{ flex: 1 }, sheets.childCenter]}>
                        <Image source={imgs.home} style={sheets.bottomImg} />
                        <Text>我的淘宝</Text>
                    </View>
                </View>
            </View>
              </DrawerLayoutAndroid>
        )
    }
}


const sheets = StyleSheet.create({
    rowDirection: {
        flexDirection: 'row'
    },

    childCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    header: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },

    listViewItem: {
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        backgroundColor: 'white'
    },

    counter: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },

    buttom: {
        height: 55,
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },

    bottomImg: {
        width: 15,
        height: 15
    }
})