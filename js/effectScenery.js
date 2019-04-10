if(setEffect == undefined) {
  var setEffect = Object();
}
setEffect.fn = Object();

setEffect.fn.setPage1 = function() {
  // $('.title').attr('class', 'title animated fadeIn');
  $('.page-2').css('opacity', '0');
  $('.page-2 .map > div').removeClass('line');
  $('.tips').attr('class', 'tips');
  $('.tips .cursor').attr('class', 'cursor cursor1');
};

setEffect.fn.setPage2 = function () {
  // $('.title').attr('class', 'title animated fadeOut')
  $('.page-3 .slide3-txt').attr('class', 'slide3-txt animated fadeOutLeft')
  $('.page-2').css('opacity', '1');
  $('.slide1 .page-3').css('opacity', '0');
  $('.mapleleaf').attr('class', 'mapleleaf animated fadeInUp');
  $('.page-3 .flash-box > div').removeClass('el-flash');
  $('.tips').attr('class', 'tips tips2');
  $('.tips .cursor').attr('class', 'cursor cursor2');
  $('.page-2 .map > div').addClass('line');
}

setEffect.fn.setPage3 = function() {
  $('.page-3').css('opacity', '1');
  $('.page-4').css('opacity', '0');
  $('.page-3 .slide3-txt').addClass('fadeInLeft');
  $('.page-2').css('opacity', '0');
  $('.page-3 .slide3-txt').attr('class', 'slide3-txt animated fadeInLeft');
  $('.page-4 .txt').removeClass('fadeInLeft');
  $('.page-2 .map > div').removeClass('line');
  $('.page-3 .flash-box > div').addClass('el-flash');
  $('.tips').attr('class', 'tips tips2 tips3');
}

setEffect.fn.setPage4 = function () {
  $('.page-4').css('opacity', '1');
  $('.slide3-txt').attr('class', 'slide3-txt animated fadeOutLeft');
  $('.page-4 .txt').addClass('fadeInLeft');
  $('.shareLayer').removeClass('fadeIn');
  $('.shareLayer').css({"z-index":"-99", "opacity":"0"});
  $('.page-4 .txt').show();
  $('.flash-box > div').removeClass('el-flash');
  $('.tips').show();
  $('.tips').attr('class', 'tips tips2 tips3');
}

setEffect.fn.showLayer = function () {
  $('.shareLayer').css({"z-index":"1", "opacity": "1"});
  $('.shareLayer').addClass('fadeIn');
  $('.shareLayer .letter').addClass('fadeIn');
  $('.page-4 .txt').hide();
  $('.tips').hide();
}

// 打印
function Typing(opts) {
  this.version = '1.1';
  this.source = opts.source;
  this.output = opts.output;
  this.delay = opts.delay || 120;
  this.chain = {
      parent: null,
      dom: this.output,
      val: []
  }
}

Typing.fn = Typing.prototype = {
  toArray: function(eles) {
    //Array.prototype.slice;
    var result = [];
    for (var i = 0; i < eles.length; i++) {
        result.push(eles[i]);
    }
    return result;
  },
  init: function() {
    this.chain.val = this.convert(this.source, this.chain.val);
  },
  convert: function(dom, arr) {
    var that = this,
        children = this.toArray(dom.childNodes);

    children.forEach(function(node) {
        if (node.nodeType === 3) {
            arr = arr.concat(node.nodeValue.split(''));
        } else if (node.nodeType === 1) {
          var val = [];
          val = that.convert(node, val);
          arr.push({
            'dom': node,
            'val': val
          });
        }
    });
    return arr;
  },
  print: function(dom, val, callback) {
    setTimeout(function() {
      dom.appendChild(document.createTextNode(val));
      callback();
    }, this.delay);
  },
  play: function(ele) {
    if (!ele) return;
    if (!ele.val.length && ele.parent) this.play(ele.parent);
    if (!ele.val.length) return;

    var curr = ele.val.shift();
    var that = this;

    if (typeof curr === 'string') {
      this.print(ele.dom, curr, function() {
        if (ele.val.length) {
          that.play(ele);
        } else if (ele.parent) {
          that.play(ele.parent);
        }
      });
    } else {
      var dom = document.createElement(curr.dom.nodeName);
      var attrs = that.toArray(curr.dom.attributes);
      attrs.forEach(function(attr) {
          dom.setAttribute(attr.name, attr.value);
      });
      ele.dom.appendChild(dom);
      curr.parent = ele;
      curr.dom = dom;
      this.play(curr.val.length ? curr : curr.parent);
    }
  },
  start: function() {
    this.init();
    this.play(this.chain);
  }
}

// loading
var _LoadingHtml = '<div id="loadingDiv" style="background: rgba(0,0,0,0); position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 9; color: #fff;"><div class="loading"><div></div><div></div><div></div><div></div><div></div></div></div>'
function showLoading() {
  $('body').append(_LoadingHtml);
}
function closeLoading() {
  $('#loadingDiv').remove();
}