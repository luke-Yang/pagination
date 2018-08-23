# pagination
#use
#new Page({
    id: 'pagination',//必填
    pageTotal: 111,/／必填 总页数
    curPage:100,//可选 默认为1 当前页数
    pageSize:10,//可选 默认每页显示十条
    showPageTotalFlag:true, //可选 默认为false
    showSkipInputFlag:true,//可选 默认为false
    getPage: function (page) {
    //获取当前页数
      console.log('page', page)
    }
 })