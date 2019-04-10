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
  $('.letter').attr('class', 'letter animated fadeInDown');
  $('.leaf1').attr('class', 'leaf1 animated fadeInRight');
  $('.leaf2').attr('class', 'leaf2 animated fadeInDown');
  $('.leaf3').attr('class', 'leaf3 animated fadeInUp');
  $('.leaf4').attr('class', 'leaf4 animated fadeInUp');
  $('.leaf5').attr('class', 'leaf5 animated fadeInLeft');
  $('.bottle2').attr('class', 'bottle2 animated fadeInDown');
  $('.rope').attr('class', 'rope animated fadeInDown');
  $('.fruit').attr('class', 'fruit animated fadeInDown');
  $('.page-3 .flash-box > div').removeClass('el-flash');
  $('.tips').attr('class', 'tips tips2');
  $('.tips .cursor').attr('class', 'cursor cursor2');
}

setEffect.fn.setPage3 = function() {
  $('.page-3').css('opacity', '1');
  $('.page-4').css('opacity', '0');
  $('.page-3 .slide3-txt').addClass('fadeInLeft');
  $('.page-2').css('opacity', '0');
  $('.page-3 .slide3-txt').attr('class', 'slide3-txt animated fadeInLeft');
  $('.page-4 .txt').removeClass('fadeInLeft');
  $('.tips').attr('class', 'tips tips2 tips3');
  $('.touris2').attr('class', 'touris2 animated fadeInUp touris-an');
  $('.ball').attr('class', 'ball ball-an');
  $('.swim').attr('class', 'swim swim-an');
  $('.wave2').attr('class', 'wave2 wave-an1');
  $('.wave3').attr('class', 'wave3 wave-an2');
  $('.wave4').attr('class', 'wave4 wave-an2');
  $('.wave5').attr('class', 'wave5 wave-an3');
  $('.wave6').attr('class', 'wave6 wave-an3');
  $('.wave7').attr('class', 'wave7 wave-an3');
  $('.wave-fish').attr('class', 'wave-fish fish-an4');
}

setEffect.fn.setPage4 = function () {
  $('.page-4').css('opacity', '1');
  $('.slide3-txt').attr('class', 'slide3-txt animated fadeOutLeft');
  $('.shareLayer').removeClass('fadeIn');
  $('.shareLayer').css({"z-index":"-99", "opacity":"0"});
  $('.tips').show();
  $('.tips').attr('class', 'tips tips2 tips3');
  $('.p4-wave').attr('class', 'p4-wave p4-wave-an');
  $('.cruise').attr('class', 'cruise cruise-an');
  $('.p4-wave1').attr('class', 'p4-wave1 cruise-an');
  $('.p4-wave2').attr('class', 'p4-wave2 cruise-an');
  $('.p4-banner').attr('class', 'p4-banner banner-an');
	$('.p4-banner1').attr('class', 'p4-banner1 banner-an1');
  $('.cloud1').attr('class', 'cloud1 cloud1-an');
  $('.cloud2').attr('class', 'cloud2 cloud2-an');
  $('.p4-fish').attr('class', 'p4-fish animated fadeInUp fish-an5');
  $('.p4-wave3').attr('class', 'p4-wave3 animated fadeIn wave-an4');
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