// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');
// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData: {},
    baitiao: [],
    baitiaoSelectItem: {
      desc: "【白条支付】首单享立减优惠"
    },
    hideBaitiao: true,
    hideBuy:true,
    badgeCount : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const self = this
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      //url请求的是页面的所有id，所以要遍历从详情页传过来的id和页面上的所有id中的其中一个是否相等 
      url: interfaces.productionDetail,
      success(res) {
        let result = null
        res.data.forEach(data => {
          if (data.partData.id == id)
            result = data
        })
        // 更改数据层的数据
        self.setData({
          partData: result.partData,
          baitiao: result.baitiao
        })
        wx.hideLoading();
      }
    })
  },
  popBaitiaoView: function () {
    //  console.log("显示白条")
    // hideBaitiao为假时，白条显示
    this.setData({
      hideBaitiao: false
    })
  },
  // buy子组件的方法绑定的方法
  updateCount(e) {
    let partData = this.data.partData;
    partData.count = e.detail.val;
    this.setData({
      partData : partData
    })
  },
  // 拿到从子组件中传过来的数据后,将detail传给数据层的baitiaoSelectItem.detail就可完成选择的分期显示在支付的提示框上
  updateSelectItem(e) {
    // console.log(e)
    this.setData({
      baitiaoSelectItem : e.detail
    })
  },
  popBuyView: function () {
    // console.log("商品信息")
    this.setData({
      hideBuy : false
    })
  },
  addCart() {
    let self = this;
    // 获取是否有本地存储
    // 从本地存储中异步获取key中对应的内容
    wx.getStorage({
      // key为必须写
      key: 'cartInfo',
      // success成功的回调，this的指向会改变，所以在请求前，把this存起来
      success: (res)=>{
        const cartArray = res.data;
        // 因为购物车是一个数组，所以要判断数组与现在添加的商品是否存在，如果存在的话，购物车的数量加一，如果不存在，则商品加入购物车
        // 拿到现在添加的商品对象
        const partData = self.data.partData;
        // 开关
        let isExit = false

        // 匹配本地数据和添加的商品id是否一致
        cartArray.forEach(cart => {
          // 如果id存在
          if(cart.id == partData.id) {
            isExit = true;
            // 更新total的值后，再覆盖本地存储的值
            cart.total += self.data.partData.count;
        // 将数据存储到本地的缓存中的“key”中，会覆盖原来的key，是一个异步接口    
            wx.setStorage({
              key : 'cartInfo',
              data:cartArray
            })
          }
        })

        // 如果id不一致的话
        if(!isExit){
          // 拿到count的值赋值给total
          partData.total = self.data.partData.count;
          cartArray.push(partData);
          wx.setStorage({
            key:'cartInfo',
            data:cartArray
          })
        }
        // 调用setBadge方法
        self.setBadge(cartArray);
      },
      // 失败的回调
      fail: ()=>{
        // partData在前面已经获取到
        let partData = self.data.partData;
        // total传给购物车
        partData.total = self.data.partData.count;
        let cartArray = [];
        cartArray.push(partData);
        // 将数据存储到本地的缓存中的“key”中，会覆盖原来的key，是一个异步接口
        wx.setStorage({
          key: 'cartInfo',
          data: cartArray,
        });
        self.setBadge(cartArray);
      },
      // 结束时的回调，不管成功失败都会执行
      complete: ()=>{}
    });
    // 显示消息提示框
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 3000
    });
  },
  // 购物车数量图标更改的方法
  setBadge(cartArray){
    this.setData({
      badgeCount : cartArray.length
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        const cartArray = res.data;
        self.setBadge(cartArray);
      }
    })
  },
  showCartView() {
    // 跳转到tabBar页面，并关闭其他非tarBar页面
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})