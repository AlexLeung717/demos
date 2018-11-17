$(function () {
    var aud = $('#aud');
    var controls = $('.btn-controls');
    var musicList = $('#musicList');
    var lis = $('#musicList li');
    var listLen = lis.length;
    var btnRandom = $('.btnRandom');

    var index = 0;
    var randomNum;

    // var fso = new ActiveXObject("Scripting.FileSystemObject"); 
    // fldr = fso.GetFolder("E:\Webpractice\201805\musicPlayer\assets"); 
    // console.log(fldr) 


    var isCheck;
    // 播放到最后一首，切换下一首，默认是从第一首开始
    aud[0].onended = function () {
        // 通过该方法获取checkbox是否checked，返回的是布尔值
        // isCheck = btnRandom.prop('checked')

        // if(isCheck){

        // randomNum = Math.floor((Math.random() * 3 ))

        // while(randomNum == index){

        //     randomNum = Math.floor((Math.random() * 3 ))

        // }

        // index = randomNum;
        // play()
        // } else {
        //     playNext()
        // }
        var s = $('input[name="playmodel"]')

        s.each(function () {
            var _this = $(this)
            if (this.checked == true) {
                switch (this.value) {
                    case '顺序':
                        playNext();
                        break;
                    case '随机':
                        playRandom()
                        break;
                    case '单曲':
                        play();
                        break;
                }
            }

        })

    }


    // 双击歌曲名字选项，播放音乐
    musicList.on('dblclick', 'li', function () {
        alert('调试1')
        var _this = $(this)
        index = _this.index();

        play();
        alert('调试2')
    })


    // 点击事件，控制上一曲、下一曲
    controls.on('click', '.btn', function () {
        var _this = $(this);
        var type = _this.data('type');
        isCheck = btnRandom.prop('checked')

        switch (type) {
            case 'pre':
                if (isCheck) {
                    playRandom();
                } else {
                    playPre();
                }
                break;
            case 'next':
                if (isCheck) {
                    playRandom();
                } else {
                    playNext();
                }
                break;
        }
    })


    // methods-上一首
    function playPre() {
        index--;
        if (index < 0) {
            index = listLen - 1;
        }

        play()
    }

    // methods-下一首
    function playNext() {
        index++;
        if (index > listLen - 1) {
            index = 0;
        }

        play()
    }

    // methods-随机播放
    function playRandom() {
        randomNum = Math.floor((Math.random() * 3))

        while (randomNum == index) {
            randomNum = Math.floor((Math.random() * 3))
        }

        index = randomNum;
        play()
    }

    // methods-播放音乐
    function play() {
        var str = $(lis[index]).text();

        aud.attr('src', 'assets/' + str);

        musicList.children().removeClass('active')
        $(lis[index]).addClass('active')

        aud[0].play();
    }

})