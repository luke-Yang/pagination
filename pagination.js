Page.prototype.nextPage = function () {
  var _this = this
  var li = document.createElement('li')
  li.innerHTML = '下一页'
  if (parseInt(_this.curPage) < parseInt(_this.pageTotal)) {
    li.onclick = function () {
      _this.curPage = parseInt(_this.curPage) + 1
      _this.init()
      _this.getPage(_this.curPage)
    }
  } else {
    li.className = 'disabled'
  }

  this.ul.append(li)
  if(_this.showSkipInputFlag)
  _this.showSkipInput()
}
Page.prototype.lastPage = function () {
  var _this = this
  if (_this.showPageTotalFlag)
    _this.showPageTotal()
  var li = document.createElement('li')
  li.innerHTML = '上一页'
  if (parseInt(_this.curPage) > 1) {
    li.onclick = function () {
      _this.curPage = parseInt(_this.curPage) - 1
      _this.init()
      _this.getPage(_this.curPage)
    }
  } else {
    li.className = 'disabled'
  }
  this.ul.append(li)
}

function Page ({pageSize, pageTotal, curPage, id, getPage, showPageTotalFlag,showSkipInputFlag}) {
  this.pageSize = pageSize || 10//每次显示行数
  this.pageTotal = pageTotal //总共多少页
  this.curPage = curPage || 1
  this.ul = document.createElement('ul')
  this.id = id
  this.getPage = getPage
  this.showPageTotalFlag = false || showPageTotalFlag
  this.showSkipInputFlag = false || showSkipInputFlag
  this.init()
}

Page.prototype.init = function () {
  var pagination = document.getElementById(this.id)
  pagination.innerHTML = ''
  this.ul.innerHTML = ''
  pagination.appendChild(this.ul)
  var _this = this
  _this.lastPage()
  _this.getPages().forEach(item => {
    var li = document.createElement('li')
    if (item == this.curPage) {
      li.className = 'active'
    } else {
      li.onclick = function () {
        _this.curPage = parseInt(this.innerHTML)
        _this.init()
        _this.getPage(_this.curPage)
      }
    }
    li.innerHTML = item
    this.ul.appendChild(li)
  })
  _this.nextPage()
}
Page.prototype.getPages = function () {
  var pag = []
  if (this.curPage <= this.pageTotal) {
    if (this.curPage < this.pageSize) { //当前页数小于显示条数
      var i = Math.min(this.pageSize, this.pageTotal)
      while (i) {
        pag.unshift(i--)
      }
    } else { //当前页数大于显示条数
      var middle = this.curPage - Math.floor(this.pageSize / 2), //从哪里开始
        i = this.pageSize;
      if (middle > (this.pageTotal - this.pageSize)) {
        middle = (this.pageTotal - this.pageSize) + 1
      }
      while (i--) {
        pag.push(middle++);
      }
    }
  } else {
    console.error('当前页数不能大于总页数')
  }
  if (!this.pageSize) {
    console.error('显示页数不能为空或者0')
  }

  return pag
}
Page.prototype.showPageTotal = function () {
  var _this = this
  var li = document.createElement('li')
  li.innerHTML = '共' + _this.pageTotal + '页'
  li.className = 'totalPage'
  this.ul.append(li)
}

Page.prototype.showSkipInput = function () {
  var _this = this
  var li = document.createElement('li')
  li.className = 'totalPage'
  var span1 = document.createElement('span')
  span1.innerHTML = '跳转到'
  li.appendChild(span1)
  var input = document.createElement('input')
  input.onkeydown = function (e) {
    var oEvent = e || event
    if (oEvent.keyCode == '13') {
      var val = parseInt(oEvent.target.value)
      if (typeof val === 'number' && val <= _this.pageTotal) {
        _this.curPage = val
        _this.getPage(_this.curPage)
      }
      _this.init()
    }
  }
  li.appendChild(input)
  var span2 = document.createElement('span')
  span2.innerHTML = '页'
  li.appendChild(span2)
  this.ul.append(li)
}
