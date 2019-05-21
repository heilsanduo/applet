// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig');
// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page:1,
    size:5,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //  wx.setNavigationBarTitle动态获取页面的标题
    wx.setNavigationBarTitle({
      title: options.title
    });
    const self = this
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          prolist: res.data
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
    // 在当前导航条显示加载动画
    wx.showNavigationBarLoading();
    this.setData({
      page:1,
      noData:false
    })
    const self = this;
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          prolist: res.data
        })
        // 隐藏导航条加载状态
        wx.hideNavigationBarLoading();
        // 停止当前页面下来刷新状态
        wx.stopPullDownRefresh()
      }

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 停止下拉刷新
    wx.stopPullDownRefresh();
    // 在当前导航条显示加载动画
    wx.showNavigationBarLoading();
    // 定义
    const prolist = this.data.prolist;
    let page = this.data.page;
    // 下拉时page++
    this.setData({
      page: ++page
    })

    const self = this;
    wx.request({
      url:interfaces.productionsList + '/' + self.data.page + '/' +self.data.size,
      success(res) {
       if(res.data.length ==0){
         self.setData({
           noData:true
         })
       }else{
        res.data.forEach(item=> {
          prolist.push(item);
        })
        self.setData({
          prolist:prolist
        })
       }
        // 隐藏加载状态
        wx.hideNavigationBarLoading();
      }
    })
  },
  switchProlistDetail(e) {
    // 获取绑定数据中的index
    var index = e.currentTarget.dataset.index
    // 保存当前页面，跳转应用其他页面，使用wwx.navigateTo可返回上个页面，目前页面最多只有10层
    wx.navigateTo({
      url: '/pages/detail/index?id=' + this.data.prolist[index].id,
     
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})