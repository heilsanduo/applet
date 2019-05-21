//获取应用实例, getApp()全局的实例对象，相当于new
const app = getApp()

// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    // 判断兼容的
    canIUse:wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果全局变量app的globalData存的值为真时
    if(app.globalData.userInfo) {
      // setData为一个方法，可更改数据
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfofoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo:true
        })
      }
    }

  },
  // 实现获取用户信息
  getUserInfo:function(e){
    console.log(e)
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true
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