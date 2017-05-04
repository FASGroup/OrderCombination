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
  ListView,
  PixelRatio,
  Platform,
  RefreshControl
} from 'react-native';

import AppCore from '../app.core';
import ActivityIndicatorComponent from '../lib/ActivityIndicatorComponent';

var Dimensions = require('Dimensions');

export default class JDQueryHistory extends Component {
  constructor(props) {
    super(props);
    console.log(props.ConditionID);

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      isRefreshing: false,
      ConditionID: props.ConditionID
    };
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  _turnTo(ConditionID) {
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'JDQueryHistory',
        params:{ConditionID: ConditionID}
      });
    }
  }

  render() {
    var ConditionView = (
      <View style={{ flex: 1, height: 300, backgroundColor: '#e0f6ff' }}>
        <TouchableOpacity onPress={() => { { this._turnTo("1") } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>所有记录</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { { this._turnTo("2") } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>当天记录</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { { this._turnTo("3") } }}>
          <Text style={{ margin: 20, fontSize: 20, color: '#aabcc1', textAlign: 'left' }}>本月记录</Text>
        </TouchableOpacity>
      </View>)

    return (
      <DrawerLayoutAndroid
        drawerWidth={150}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => ConditionView}>
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
              renderRow={(rowData) => this.customerRenderRow(rowData)} enableEmptySections={true}
              
              refreshControl={<RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshData.bind(this)}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#a9a9a9']}
                progressBackgroundColor="#f0f8ff"
              />}

            >
            </ListView>
          </View >

          <ActivityIndicatorComponent ref='dialog' />
        </View>
       
      </DrawerLayoutAndroid>
    );
  }

  async componentDidMount() {
    await this.refreshData();
  }

  async refreshData() {
    console.log(this.props.ConditionID);
    this.refs.dialog.showWaiting();
    this.setState({ isRefreshing: true });
    let data = await App.send('api/Order/GetHistoryOrder', { method: "GET", data: { ConditionID: this.props.ConditionID }});
    this.setState({ dataSource: this.ds.cloneWithRows(data) });
    this.setState({ isRefreshing: false });
  }

  customerRenderRow(rowData) {
    return (
      <View style={styles.listViewRow} >
        <View style={styles.listViewRowGoodImage}>
          <Image source={require('../res/images/Good.png')} style={{ width: 40, height: 50 }} />
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
    let currentUser = await AppCore.getUser();
    let megerModel = await AppCore.send("api/Order/MegerOrder", { method: "GET", data: { userId: currentUser.id } });
    this.refs.dialog.hideWaiting();
    if (!megerModel.mergeId) {

      AppCore.showMessage("没有可以合并的订单");

    } else {
      this.props.navigator.push({
        name: 'JDUserInfoEdit',
        params: { mergeid: megerModel.megerGuid }
      });
    }
  }
}

const styles = StyleSheet.create({
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
    height: 40
  },
  footButton: {
    flex: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  footBlank: {
    flex: 1
  },
  listViewRow: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 20,
    marginRight:5
  },
  listViewRowGoodImage:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listViewRowGoodInfo: {
    flex: 4,
    flexDirection: 'column',
  },
  ListViewItemTitle: {
    flex:2,
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  ListViewItemDtl: {
    flex:1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    borderBottomColor: "#e6e6fa",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  listViewRowName: {
    justifyContent: "center",
    fontFamily: "Verdana bold",
    fontSize: 15
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
  },
  footButtonColor: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3281DD',
    borderColor: '#3281DD',
    borderRadius: 15,
    borderWidth: (Platform.OS === 'ios' ? 1.0 : 1.5) / PixelRatio.get()
  },
  footButtonFontColor:{
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});