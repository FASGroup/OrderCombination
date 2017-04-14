import config from '../app.json';  
import React from 'react-native';
import {
    Alert
} from 'react-native'

var {
  AsyncStorage
} = React;


var AppCore = {
	/* 配置信息 */
  config: config,
	const:{
	  token_key: 'token',
	  user_key: 'user',
	},
	/* 将对象序列化成GET请求所用的连接字符串 */
    serialize: function (obj) {
      var str = [];
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    },
	/* 生成随机数 */
    random: function () {
      return ((new Date()).getTime() + Math.floor(Math.random() * 9999));
    },
	/* 生成唯一ID */
    getGUID: function () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
	/* 检查是否已经登录 */
    async isLogin() {
      var key = this.const.token_key;

      var token = await AsyncStorage.getItem(key);
      if (token === false) {
        return false;
      }
      return typeof (token) === 'string' ? token : '';
    },
	/* 获取token */
    async getAccessToken() {
      return await this.isLogin();
    },
    /* 清除用户的缓存数据 */            
    clearUserCache() {
      return this.setCache(this.const.token_key, '');
    },
	/* 检查是否登录并回调 */
    async checkLogin(func) {
      var key = this.const.token_key;
      var value = await AsyncStorage.getItem(key);
      if (value !== null) {
        func && func(value);
      } else {
        func && func(false);
      }
	  return value;
    },
	/* 获取用户信息 */
    async getUser(func) {
	  var key = this.const.user_key;
      var user = await AsyncStorage.getItem(key);
      if (user != null) {
        user = JSON.parse(user);
        func && func(user);
      }
	  return user;
    },
	/* 根据key获取缓存中的信息 */
    async getCache(key) {
      var value = await AsyncStorage.getItem(key);
      if (value === null) {
        return false;
      }
      return value;
    },
	/* 设置缓存信息 */
    setCache(key, value) {
      if (typeof value == 'object') {
        value = JSON.stringify(value);
      }
      AsyncStorage.setItem(key, value)
    },
    /* 公共请求api方法,所有请求应调用此方法,否则无法传输token或需要自行传输token */
    async send(url, options) {
      var self = this;
      var token = await this.getAccessToken();
      var defaultOptions = {
        method: 'GET',
        error: function () {
          options.success({
            'errcode': 501,
            'errstr': '系统繁忙,请稍候尝试'
          });
        },
        headers: {
          'Token': token,
          'Accept': 'application/json',
          //'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
		      'Content-Type': 'application/json'
        },
        data: {
          '_regq': self.random()
        },
        dataType: 'json',
        success: function (result) { return result; }
      };

      var options = Object.assign({}, defaultOptions, options);
      var httpMethod = options['method'].toLocaleUpperCase();
      var full_url = '';
      if (httpMethod === 'GET') {
        full_url = this.config.api + url + '?' + this.serialize(options.data);
      } else {
        full_url = this.config.api + url;
      }

      options.url = full_url;
      var cb = options.success;

      /* 构建post请求的数据 */
      if (options['method'] != 'GET') {
		/*
        let formData = new FormData();
        for (let k in options.data) {
          formData.append(k, options.data[k]);
        }
        options.body = formData;
		*/
		options.body = JSON.stringify(options.data);
      }

      return fetch(options.url, options)
        .then((response) => 
        {
          if(self.handleErrcode(response) === false)
          {
            return null;
          }
          return response.json();
        })
        .then((res) => {
          self.handleResult(res);
          return cb(res);
        })
        .catch((error) => {
          console.warn(error);
		  //this.showMessage(JSON.stringify(error));
        });
    },
	  /* 处理结果信息 */
    handleResult: function (result) {
      if(!result){return false;}
      if (result.isSuccess == true) {
        return true;
      }
      this.showMessage(result.message);
      return false;
    },
    /* 处理错误信息 */
    handleErrcode: function (result) {
      if(!result) { return null; }
      switch(result.status)
      {
        case 401:
          this.showMessage(result._bodyText);
          return false;
      }
    },
    /* 公共提示消息 */
    showMessage(msg, title) {
      if (msg) {
        var title = title || '提示';
		    Alert.alert(title, msg);
      }
    },

};

module.exports = AppCore;


