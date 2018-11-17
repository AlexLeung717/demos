


$(function() {

    var win = $(window);
    var doc = $(document);

    var pages = $('#pages')
    var pageItem = $('.page-item')
    var pageItemHeight = pageItem.height()
    var curIndex = 0
    var len = pages.children().length

    // 加锁，滚动一次滑轮，翻滚一页
    var isfinished = true

    var nav = $('.nav')
    var navLi = $('ul.nav li')

    win.resize(function() {
        var getItemHeight = win.height()

        pageItem.height(getItemHeight)
        pageItemHeight = getItemHeight

        // 窗口大小变化时，自动调整
        move()
    })

    // 这个是重点
    // 鼠标滑轮的滚动事件--兼容浏览器
    doc.on('mousewheel DOMMouseScroll', function(e) {

        e = e || window.event

        if (!isfinished) return;
        isfinished = false

        // 以下方法兼容 chrome、 firefox、 ie ---获取滑轮滚动的方向
        var direction = e.originalEvent.wheelDelta || -e.originalEvent.detail;

        if (direction > 0) {
            // 滑轮向上滑动
            moveUp()
            nav.find('li').removeClass('active')
            // // 找到对应导航点
            nav.find('li').eq(curIndex).addClass('active')

        } else {
            // 滑轮向下滑动    
            moveDown()
            nav.find('li').removeClass('active')
            nav.find('li').eq(curIndex).addClass('active')
        }

    });


    // 导航栏--点击click事件
    nav.on('click', 'li', function() {
        var _this = $(this)
        // 兄弟元素都移除掉active
        _this.siblings().removeClass('active')
        _this.addClass('active')

        // 通过li的index()方法可以找到li的序号
        curIndex = _this.index()
        move()
    })

    // 向上滚动事件
    function moveUp() {
        curIndex--

        if (curIndex < 0) {
            curIndex = 0
        }

        move()
    }


    // 向下滚动事件
    function moveDown() {
        curIndex++

        if (curIndex > len - 1) {
            curIndex = len - 1
        }

        move()
    }


    // 基本的滚动事件--move()
    function move() {
        var top = -curIndex * pageItemHeight;

        pages.animate({
            top: top
        }, 350, function() {
            // 完成一次动画后，才将锁打开，设置isfinished为true
            isfinished = true
        })
    }


})

function clog(txt) {
    console.log(txt)
}