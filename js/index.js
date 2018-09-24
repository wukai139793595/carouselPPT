
(function (win, $) {
    var defaultObj = {
        bgWrap: $('.img-wrap'),
        dirWrap: $('.dir-wrap'),
        btnWrap: $('.btn-wrap')
    }
    win.BannerPpt = BannerPpt
    function BannerPpt(obj) {
        this.obj = $.extend(true, {}, defaultObj, obj)
        this.init()
    }
    BannerPpt.prototype.init = function () {
        this.obj.num = this.obj.bgWrap.children().length
        this.obj.gIndex = 0
        this.obj.lastIndex = 0
        this.obj.newIndex = 1
        this.turn()
        this.bindEvent()

    }
    BannerPpt.prototype.turn = function () {
        var self = this
        self.timer = setTimeout(function () {
            self.change(self.obj.lastIndex, self.obj.newIndex)

        }, 2000)
    }
    BannerPpt.prototype.change = function (lInd, nInd) {
        var self = this
        self.flag = false
        this.obj.bgWrap.children().eq(lInd).fadeOut(300).end().eq(nInd).delay(300).fadeIn(300,function () {
            self.obj.lastIndex = self.obj.newIndex
            if(self.obj.newIndex == (self.obj.num - 1)){
                self.obj.newIndex = 0
            }else{

                self.obj.newIndex ++
            }
            self.flag = true
            self.turn(self.obj.lastIndex, self.obj.newIndex)
            
        });
        this.obj.bgWrap.children().eq(lInd).children().hide(300);
        this.obj.bgWrap.children().eq(nInd).children().delay(300).show(300);
    }
    BannerPpt.prototype.bindEvent = function () {
        var self = this
        self.obj.dirWrap.find('.left').on('click', function(e) {
            if(self.flag) {
                clearTimeout(self.timer)
                if(self.obj.lastIndex == 0){
                    self.obj.newIndex = self.obj.num -1
                }
                self.change(self.obj.lastIndex, self.obj.newIndex)
            }
        })
        self.obj.dirWrap.find('.right').on('click', function(e) {
            if(self.flag) {
                clearTimeout(self.timer)
                if(self.obj.lastIndex == (self.obj.num - 1)){
                    self.obj.newIndex = 0
                }
                self.change(self.obj.lastIndex, self.obj.newIndex)
            }
        })
        self.obj.btnWrap.children().on('click', function (e) {
            if(self.flag){
                clearTimeout(self.timer)

                self.obj.newIndex = $(this).index()
                self.change(self.obj.lastIndex, self.obj.newIndex)

            }
        })
    }
})(window, $)