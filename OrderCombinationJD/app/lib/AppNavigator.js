import React,{ Component } from 'react'

import {
    AppRegistry,
    Navigator,
    Alert
} from 'react-native'

import LoginView from '../ui/LoginView'
import Home from '../ui/Home'
import JDIndex from '../ui/JDIndex'
import JDUserInfo from '../ui/JDUserInfo' 
import JDAddressEdit from '../ui/JDAddressEdit'
import JDAddOrder from '../ui/JDAddOrder'
import JDMergeOrder from '../ui/JDMergeOrder' 
import JDQueryHistory from '../ui/JDQueryHistory'
import JDOrderHistory from '../ui/JDOrderHistory'


export default class AppNavigator extends Component {
    render(){
        let routes = {
            LoginView: LoginView,
            HomePage: Home,
            JDIndex:JDIndex,
            JDUserInfo:JDUserInfo, 
            JDAddressEdit:JDAddressEdit,

            JDAddOrder:JDAddOrder,
            JDMergeOrder:JDMergeOrder,

            JDQueryHistory,JDQueryHistory,
            JDOrderHistory,JDOrderHistory
        };
        //设置默认路由
        let [defaultName, defaultComponent] = ['LoginView',LoginView];
        return (
            <Navigator 
                initialRoute = {{name:defaultName,component:defaultComponent }}
                configureScene = {(route,routeStack) => { return Navigator.SceneConfigs.HorizontalSwipeJump; }}
                renderScene = {(route,navigator) => {
                    let Component = routes[route.name];
                    //let Component = route.component;
                    if(Component){
                        return <Component {...route.params} navigator={navigator} />
                    }
                }
                }
            />
        )
    }
}