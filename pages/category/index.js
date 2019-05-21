const interfaces = require('../../utils/urlconfig.js');

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex : 0
  },
// 点击时获得index值传给数据层的curIndex，当index与curIndex值相等的时候，添加样式
  switchRightTab(e) {
    // console.log(e)
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex : index
    })
   
  },
  // 
  showListView(e) {
    // console.log(e)
    let txt = e.currentTarget.dataset.txt
    wx.navigateTo({
      // 将title的值传到list页面
      url: '/pages/list/index?title=' + txt
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url:interfaces.productions,
      header:{
        'content-type' : 'application/json'
      },
      success(res){
        console.log(res.data);
        self.setData({
          navLeftItems:res.data.navLeftItems,
          navRightItems:res.data.navRightItems
        })
        wx.hideLoading()
      }
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