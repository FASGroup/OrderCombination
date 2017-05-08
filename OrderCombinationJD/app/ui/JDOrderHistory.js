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

import AppCore from '../app.core';
import ActivityIndicatorComponent from '../lib/ActivityIndicatorComponent';

var Dimensions = require('Dimensions');

export default class JDOrderHistory extends Component {
  constructor(props) {
    super(props);
   // console.log(props.mergeid);

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      isLoading: false
    };
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  //返回按钮事件
  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

 //-------------菜单操作按钮事件-------------
  _turnToJDUserPage() { 
    if (this.props.navigator) {
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
  _turnToJDIndexPage() { 
    if (this.props.navigator) {
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
          <View style={{ height:50, flexDirection: 'row', backgroundColor: "#05a5d1" }}>
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 8 }}>
              <TouchableHighlight onPress={this._pressButton.bind(this)}>
                <Text style={{ fontSize: 18, color: 'red' }}> 返回 </Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', }}>
                <Text style={{ fontSize: 18, alignSelf: 'center' }}> 凑单历史记录 </Text>
            </View> 
            <View style={{ flex: 1, justifyContent: 'center', marginRight: 8 }}> 
            </View>
          </View>

          <View style={styles.content}>
            <ListView dataSource={this.state.dataSource}
              renderRow={(rowData) => this.customerRenderRow(rowData)} enableEmptySections={true}>
            </ListView>
          </View > 
           <ActivityIndicatorComponent ref='dialog' />
        </View>
      </DrawerLayoutAndroid>
      
    );

  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    console.log(this.props.mergeid);
    let currentUser = await AppCore.getUser();

    this.refs.dialog.showWaiting();
    let data = await AppCore.send('api/Order/GetMergeOrderHostory1', { method: "GET", data: { userId: currentUser.id  }});
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
            <Text style={styles.listViewRowCountValue}>{rowData.quantity}</Text>  件</Text>
            <Text style={styles.listViewRowPrice} >共:￥
            <Text style={styles.listViewRowAmount}>{rowData.amount}</Text>元
            </Text>
          </View>
        </View>
      </View>
    );
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