// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    // 总数
    totalMoney : "0.00",
    // 总数量
    totalCount: 0,
    // 是否全选
    selectAll : false,
    startX:0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 自增自减
  getCount(e) {
    // 获取index的值
    const index = e.currentTarget.dataset.index;
    // 赋值
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail.val;
    // 更新data
    this.setData({
      cartArray : cartArray
    })
  },

  switchGoodDetail(e){
     // 获取index的值
     const index = e.currentTarget.dataset.index;
     const cartArray = this.data.cartArray;
    //  跳转到对应的商品id
     wx.navigateTo({
       url: '/pages/detail/index?id=' + cartArray[index].id
     });
  },
  selectGood(e) {
     // 获取index的值
     const index = e.currentTarget.dataset.index;
     const cartArray = this.data.cartArray;
    //  合计和数量
    // 因为totalMoney在之前定义的是字符串。所以将他转成数据类型
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 选择状态
    let selectAll = this.data.selectAll;

    //  设置选中或者不选中的状态
    cartArray[index].select = !cartArray[index].select;
    // 如果选中状态
    if(cartArray[index].select) {
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
      totalCount++;
    }else{
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
      selectAll = false;
    }
    // 更新数据
    this.setData({
      cartArray:cartArray,
      totalMoney : String(totalMoney.toFixed(2)),
      totalCount : totalCount,
      selectAll:selectAll
    })
  },

  // 自减
  subCount(e) {
      // 获取index的值
      const index = e.currentTarget.dataset.index;
      const cartArray = this.data.cartArray;
      let totalMoney = Number(this.data.totalMoney);

      // 计算金额
      if(cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price);
      }

      // 更新数据
      this.setData({
        totalMoney : String(totalMoney.toFixed(2))
      })

  },
// 自加
  addCount(e) {
     // 获取index的值
     const index = e.currentTarget.dataset.index;
     const cartArray = this.data.cartArray;
     let totalMoney = Number(this.data.totalMoney);

     // 计算金额
     if(cartArray[index].select) {
     totalMoney += Number(cartArray[index].price);
     }

     // 更新数据
     this.setData({
       totalMoney : String(totalMoney.toFixed(2))
     })
  },

  // 全选事件
  selectAll() {
    const cartArray = this.data.cartArray
    let totalMoney = 0 // 合计初始化为0
    let totalCount = 0 // 结算个数初始化为0
    let selectAll = this.data.selectAll
    selectAll = !selectAll // 全选按钮置反

    cartArray.forEach(cart => {
      // 设置选中或不选中状态 每个商品的选中状态和全选按钮一致
      cart.select = selectAll
      // 计算总金额和商品个数
      if (cart.select) { // 如果选中计算
        totalMoney += Number(cart.price) * cart.total
        totalCount++
      } else {// 全不选中置为0
        totalMoney = 0
        totalCount = 0
      }
    })
    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
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
    var self = this;
    // 从本地缓存中获取key对应的内容
    wx.getStorage({
      key: 'cartInfo',
      success: (res)=>{
        const cartArray = res.data;

        // 选择或者不选中商品框
        cartArray.forEach(cart =>{
          // 一开始全部不选择
          cart.select = false;
          cart.isTouchMove = false
        })

        self.setData({
          cartArray : cartArray,
          selectAll: false,
          totalMoney:"0.00",
          totalCount : 0
        })

        // 设置tabbar图标
        cartArray.length > 0 ?
        //  wx.setTabBarBadge为tabbar页面右上角添加文本
        wx.setTabBarBadge({
          index:2 ,
          // wx.removeTabBarBadge为移除tabbar右上角文本
          text: String(cartArray.length)}) : wx.removeTabBarBadge({
            index: 2,
          });
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  // 因为自增自减组件在离开页面的时候，他的数值显示又为1，所以要更新cartArray的值
  onHide: function () {
    // 页面离开时更新storage方法
    const cartArray = this.data.cartArray;
    // 将数据存储到本地key中，并覆盖之前的key数据
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray
    });
  },


// 记录当前鼠标点击的位置
  touchstart(e) {
    // 开始触摸时，重置所以的删除
    this.data.cartArray.forEach(cart => {
      if(cart.isTouchMove) {
        cart.isTouchMove = false;
      }
    })
    this.setData({
      startX : e.changedTouches[0].clientX,
      startY : e.changedTouches[0].clientY,
      cartArray : this.data.cartArray
    })
  },
// 记录当前鼠标或手指移动的位置
  touchmove(e) {
    var index = e.currentTarget.dataset.index;
// 开始的x和y坐标
    var startX = this.data.startX;
    var startY = this.data.startY;

    // 移动的x和y坐标
    var touchMoveX = e.changedTouches[0].clientX,
       touchMoveY = e.changedTouches[0].clientY;
       console.log(touchMoveX,touchMoveY)
    //  调用计算角度方法 ,获取角度

    var angel = this.angel({X : startX , Y : startY},{X:touchMoveX,Y : touchMoveY})

    // 遍历数组的所有对象
    this.data.cartArray.forEach((cart,i) => {
      cart.isTouchMove = false;
      //(Math.abs(angel)为绝对值 滑动的角度》30 直接return
      if(Math.abs(angel) > 30) return; 
      // 匹配
      if(i == index) {
        // 如果右滑，则不出现
        if(touchMoveX > startX) {
          cart.isTouchMove = false;
        }else {
          // 如果左滑，删除出现
          cart.isTouchMove = true;
        }
      }
      
    })

    this.setData({
      cartArray : this.data.cartArray
    })
  },

  angel(start,end) {
    var _X = end.X - start.X;
    var _Y = end.Y - start.Y;

    // 返回角度Math.atan（）返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  del(e) {
    var self = this
    const index = e.currentTarget.dataset.index;
    wx.getStorage({
      key: 'cartInfo',
      success: (res)=>{
        const partData = res.data;
        partData.forEach((cart,i) => {
          if(cart.title == self.data.cartArray[index].title) {
            partData.splice(i,1)
          }
        })
        // 删完以后存储
        wx.setStorage({
          key: 'cartInfo',
          data: partData,
        });

        // 更新数据
        self.update(index);
      },
    });
  },

  update(index) {
    var cartArray = this.data.cartArray;
    var totalMoney = Number(this.data.totalMoney);
    var totalCount = this.data.totalCount;

    // 计算价格和数量
    if(cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
    }

    // 删除
    cartArray.splice(index,1);

    // 更新数据
    this.setData({
      cartArray:this.data.cartArray,
      totalMoney:String(totalMoney.toFixed(2)),
      totalCount:totalCount
    })

    // 设置tabbar图标
    cartArray.length > 0 ?
    wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length)
     }) : wx.removeTabBarBadge({
       index: 2
     });
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