// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: { // 商品数量
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChangeHandle(e) {
      // console.log(1)
      // console.log(e)
      // 通过evet事件拿到value的值
      var value = e.detail.value;
      var myEventDetail = {
        val : value
      }
      //注册组件，数据改变时，向父组件传递数据
      this.triggerEvent("myevent",myEventDetail)
    },
    // 点击-号时触发
    subtract(e) {
      // console.log(2)
      let count = this.data.count;
      // 如果count大于1的时候，点击按钮时，1--，否则1小于1时，1 = 1
      count >1 ? count-- : 1;
      var myEventDetail = {
        val : count
      }
      this.setData({
        count : count
      })
      this.triggerEvent("myevent",myEventDetail)

      // 点击-号时触发
      this.triggerEvent("subevent");
    },
    // 点击+号时触发
    add(e) {
      // console.log(2)
      let count = this.data.count;
      // 如果count大于1的时候，点击按钮时，1--，否则1小于1时，1 = 1
      this.setData({
        count : ++count
      })
      var myEventDetail = {
        val : count
      }
      this.triggerEvent("myevent",myEventDetail)
      // 点击-号时触发
      this.triggerEvent("addevent");
    }
  }
})
