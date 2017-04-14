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
  TouchableHighlight,
  DrawerLayoutAndroid,
  Alert,
  ListView
}
  from 'react-native';
import App from '../app.core';
import ActivityIndicatorComponent from '../lib/ActivityIndicatorComponent';

var Dimensions = require('Dimensions');

export default class JDIndex extends Component {
  constructor(props) {
    super(props);
    //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // let data;  
    // App.send('api/Order/GetUnMergeList').then((response)=>{data =response.json();});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      isLoading: false
    };
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  _pressButton1() {
    const { navigator } = this.props;
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      navigator.push({
        // name: 'CoudanIndexPageComponent',
        //component: CoudanIndexPageComponent,
      })
    }
  }

  _turnToJDUserPage() {
    //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'JDUserInfo'
      });
    }
  }
  _turnToJDIndexPage() {
    //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'JDIndex'
      });
    }
  }

  _turnToJDShppingCarPage() {
    //Alert.alert('warning','点击了登录按钮'+this.props.navigator);
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'shoppingCar'
      });
    }
  }

  render() {
    var navigationView = (
      <View style={{ flex: 1, height: 300, backgroundColor: '#e0f6ff' }}>
        <TouchableOpacity onPress={() => { { this._turnToJDIndexPage() } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单首页</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { { this._turnToJDShppingCarPage() } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>少辉页面</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { { this._turnToJDIndexPage() } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>凑单记录</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { { this._turnToJDUserPage() } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>收货地址</Text>
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
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "#05a5d1" }}>
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 8 }}>
              <TouchableHighlight onPress={this._pressButton.bind(this)}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                  返回
                             </Text>
              </TouchableHighlight>
            </View>

            <View style={{ flex: 4, justifyContent: 'center', }}>
              <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                京东凑单
                                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', marginRight: 8 }}>
              <TouchableHighlight onPress={() => Alert.alert('保存成功', '保存成功')}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                  保存
                                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.content}>
            <ListView dataSource={this.state.dataSource}
              renderRow={(rowData) => this.customerRenderRow(rowData)} enableEmptySections={true}>
            </ListView>
          </View >

          <View style={styles.foot}>
            <View style={styles.footBlank}>
            </View>
            <View style={styles.footButton}>
              <TouchableHighlight onPress={() => { Alert.alert("点击了新增"); }}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                  新增
                                      </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.footButton}>
              <TouchableHighlight onPress={() => this.mergeOrder()}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                  凑单
                                      </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.footButton}>
              <TouchableHighlight onPress={() => this.refreshData()}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                  刷新
                                      </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.footBlank}>
            </View>
          </View>
          <ActivityIndicatorComponent ref='dialog' />
        </View>
      </DrawerLayoutAndroid>

      //  <View style={styles.header}>
      //        <Text style={styles.headerTitle} >京东凑单</Text>
      //     </View>
      //  <View style={styles.container}> 
      //      <View style={styles.header}>
      //         <Text style={styles.headerTitle} >京东凑单</Text>
      //        </View>

      //      <View style={styles.content}>
      //          <ListView dataSource={this.state.dataSource}
      //             renderRow={(rowData) => this.customerRenderRow(rowData)}>
      //          </ListView>
      //        </View >

      //        <View style={styles.foot}>
      //             <View style={styles.footBlank}>
      //             </View>
      //             <View style={styles.footButton}>
      //                 <Button
      //                 onPress={() => { Alert.alert("点击了新增"); } }
      //                 title="新增"
      //                 accessibilityLabel="新增"  />
      //             </View>
      //             <View style={styles.footButton}>
      //                 <Button
      //                 onPress={() => { Alert.alert("点击了凑单"); } }
      //                 title="凑单"
      //                 accessibilityLabel="凑单"
      //                 />
      //             </View>
      //             <View style={styles.footButton}>
      //                 <Button
      //                 onPress={() => { Alert.alert("点击了刷新"); } }
      //                 title="刷新"
      //                 accessibilityLabel="刷新"
      //                 />
      //             </View>
      //             <View style={styles.footBlank}>
      //             </View>
      //           </View> 
      //      </View>

    );

  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    this.refs.dialog.showWaiting();
    let data = await App.send('api/Order/GetUnMergeList');
    this.setState({ dataSource: this.ds.cloneWithRows(data) });
    this.refs.dialog.hideWaiting();
  }

  customerRenderRow(rowData) {
    return (
      <View style={styles.listViewRow} >
        <View style={styles.listViewRowGoodImage}>
          <Image source={require('../res/images/Good.png')} style={{ width: 40, height: 40 }} />
        </View>
        <View style={styles.listViewRowGoodInfo}>
          <View style={styles.ListViewItemTitle}>
            <Text style={styles.listViewRowName}>{rowData.commodityName}</Text>
          </View>
          <View style={styles.ListViewItemDtl}>
            <Text style={styles.footBlank} ></Text>
            <Text style={styles.listViewRowCount}>X
            <Text style={styles.listViewRowCountValue}>{rowData.quantity}</Text>
              件</Text>
            <Text style={styles.listViewRowPrice} >共:￥
              <Text style={styles.listViewRowAmount}>{rowData.amount}</Text>元
            </Text>
          </View>
        </View>
      </View>
    );
  }

  async mergeOrder() {
    this.refs.dialog.showWaiting();
    let currentUser = App.getUser();
    let megerGuid = await App.send("api/Order/MegerOrder", { method: "POST", data: { userId: currentUser.Id } });
    this.refs.dialog.hideWaiting();
    if (!megerGuid) {

      App.showMessage("没有可以合并的订单");

    } else {
      this.props.navigator.push({
        name: 'JDUserInfoEdit',
        params:{mergeid:megerGuid.mergeId}        
      });
    }
  }
}

const styles = StyleSheet.create({
  edit: {
    marginTop: 30,
    height: 40,
    fontSize: 20,
    backgroundColor: '#fff'
  },

  Viewstyle: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#c1b4b457',
    borderBottomWidth: 0.5,
  },
  container: {
    flex: 2,
    flexDirection: 'column',
  },

  header: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'red'
  },
  headerTitle: {
    fontFamily: "Verdana bold",
    fontSize: 20,
    color: "white",
    fontWeight: 'bold'
  },
  content: {
    flexDirection: 'column',
    marginTop: 10,
    height: Dimensions.get('window').height - 130
  },
  foot: {
    flexDirection: 'row',
    height: 40,
  },
  footButton: {
    flex: 2,
    marginLeft: 10,
    marginRight: 10
  },
  footBlank: {
    flex: 1
  },
  listViewRow: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10
  },
  listViewRowGoodImage:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listViewRowGoodInfo: {
    flex: 4,
    flexDirection: 'column'
  },
  ListViewItemTitle: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginLeft: 10
  },
  ListViewItemDtl: {
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  listViewRowName: {
    justifyContent: "center",
    fontFamily: "Verdana bold",
    fontSize: 20
  },
  listViewRowCount: {
    flex: 1
  },
  listViewRowPrice: {
    flex: 1
  },
  listViewRowAmount: {
    color: "orange",
    fontSize: 20,
    fontWeight: 'bold'
  },
  listViewRowCountValue: {
    color: "orange",
    fontSize: 20,
    fontWeight: 'bold'
  }


});