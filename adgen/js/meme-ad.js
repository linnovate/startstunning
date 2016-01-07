Array.range = function(n) {
    // Array.range(5) --> [0,1,2,3,4]
    return Array.apply(null,Array(n)).map((x,i) => i)
};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(n) {
        // ACTUAL CODE FOR CHUNKING ARRAY:
        return Array.range(Math.ceil(this.length/n)).map((x,i) => this.slice(i*n,i*n+n));

    }
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

(function($) {
    //var baseURL = 'http://server/wix/startstunning/adgen';
    var baseURL = location.href;

    $.wixAdData = function () {
        var component = this;

        component.itemsData = {};
        component.popData;
        component.randomMain;

        component.getCategories = function() {
            var res = {};

            _.each(component.itemsData, function (set, category) {
                res[category] = category;
            });

            return res;
        };

        component.popEl = function(count) {
            if (_.isUndefined(count)) count = 1;

            if (_.isUndefined(component.popData)) {
                component.popData = [];

                _.each(component.itemsData, function(set, category) {
                    component.popData = component.popData.concat(set);
                });
                component.popData = _.shuffle(component.popData);
                component.randomMain = _.sample(component.popData);
            }

            if (component.popData.length >= count)
                return component.popData.splice(0, count);
        };

        component.queryEl = function(category, count) {
            var res = [];

            if (!_.isUndefined(component.itemsData[category])) {
                res = _.shuffle(component.itemsData[category]);
            }

            return res.slice(0, count);
        };

        component.getObjectRandomKey = function (obj) {
            var keys = Object.keys(obj);
            return keys[keys.length * Math.random() << 0];
        };

        component.init = function (success) {
            $.getJSON('/adgen/data.json').done(function (data) {
                component.itemsData = data;
                success.call(component);
            });
        };
    };

    // wixAdPicker
    $.wixFillPictures = function(element, options, adData) {
        var defaults = {
                count: 16
            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this;

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-picture-grid').html());
            var myData = adData.popEl(plugin.settings.count);
            generatedHTML = render({ data: myData });

            $(element).html(generatedHTML);

            $element.find('div').hover(function () {
                var img = $(this).data('wix-gif');
                if (!img) return;

                $(this).css('background-image', 'url('+img+')');
            }, function () {
                var img = $(this).data('wix-url');
                $(this).css('background-image', 'url('+img+')');
            }).click(function () {
                var img = $(this).data('wix-gif') ? $(this).data('wix-gif') : $(this).data('wix-url');
                $('.image-frame img').attr('src', img);
                $('.square').removeClass('active');
                $(this).addClass('active');
            });
        };

        plugin.init();

    };

    $.fn.wixFillPictures = function(options, adData) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixFillPictures(this[0], options, adData);
        }

        return this;
    };

    // wixAdForm
    $.wixAdForm = function(element, options, adData) {
        var defaults = {

            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this,
            randomImg = '';

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-form').html());
            if (!_.isEmpty(adData.randomMain)) {
                randomImg = _.isUndefined(adData.randomMain.gif) ? adData.randomMain.url : adData.randomMain.gif;
            }
            generatedHTML = render({
                data: adData.getCategories(plugin.settings.types),
                img: randomImg
            });

            $(element).html(generatedHTML);

            var $fieldBusinessName = $element.find('#business-name'),
                $fieldCategory = $element.find('#ad-category'),
                $btnGo = $element.find('#btn-goto-ads');

            $fieldBusinessName.focus();

            $fieldBusinessName.on('keyup', function (e) {
                if ($(this).val() && $fieldCategory.val()) {
                    $btnGo.removeAttr('disabled');
                } else {
                    $btnGo.attr('disabled', 'disabled');
                }

                var code = e.keyCode || e.which;
                if(code == 13) { //Enter keycode
                    $btnGo.click();
                }
            });

            $btnGo.on('click', function wixAdShowAds() {
                var name = $('#business-name').val(),
                    category = $('#ad-category').val();

                if ($(this).hasClass('step-1')) {
                    $(this).appendTo('.form-second-step');
                    $fieldCategory.removeClass('hide');
                    $(this).removeClass('step-1').addClass('step-2');
                    $fieldCategory.focus();
                    plugin.openSelect($fieldCategory);
                } else if ($(this).hasClass('step-2')) {
                    $('.share .container').wixAdShare({
                        count: 9,
                        category: category,
                        caption: name
                    }, adData);

                    $('.meme-ad').wixAdMeme({
                        width: 334
                    });

                    $('.start').hide();
                    $('.share').show();
                }

            });

            $fieldCategory.on('change', function () {
                if ($(this).val() && $fieldBusinessName.val()) {
                    $btnGo.removeAttr('disabled');
                } else {
                    $btnGo.attr('disabled', 'disabled');
                }
                console.log('change');
            });
        };

        plugin.openSelect = function (elem) {
            if (document.createEvent) {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                elem[0].dispatchEvent(e);
            } else if (element.fireEvent) {
                elem[0].fireEvent("onmousedown");
            }
        };

        plugin.init();

    };

    $.fn.wixAdForm = function(options, adData) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixAdForm(this[0], options, adData);
        }

        return this;
    };

    // wixAdLayout
    $.wixAdShare = function(element, options, adData) {
        var defaults = {
                count: 9
            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this;

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-share-items').html());

            var data = adData.queryEl(plugin.settings.category, plugin.settings.count);

            generatedHTML += render({
                rows:       data.chunk(3),
                caption:    plugin.settings.caption
            });

            $(element).html(generatedHTML);
        };

        plugin.init();

    };

    $.fn.wixAdShare = function(options, adData) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixAdShare(this[0], options, adData);
        }

        return this;
    };

    // wixAdMeme
    $.wixAdMeme = function(element, options) {
        var defaults = {
                src: '',
                text: '',
                fontFamily: 'Impact',
                fontSize: 20,
                fillColor: '#fff',
                strokeColor: '#000',
                strokeWidth: 1,
                width: 'auto',
                height: 'auto'
            },
            plugin = this,
            $element = $(element),
            element = element,
            bgImage,
            stage,
            stageW,
            stageH,
            shapesLayer,
            heightStage;

        plugin.settings = {};
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            bgImage = new Image;
            bgImage.onload = function () {
                // set stage width
                if (plugin.settings.width == 'auto') stageW = bgImage.width;
                else stageW = plugin.settings.width;
                // set stage height
                if (plugin.settings.height == 'auto') stageH = bgImage.height;
                else stageH = plugin.settings.height;
                if (plugin.settings.width != 'auto' && plugin.settings.height == 'auto') {
                    stageW = plugin.settings.width;
                    var ar = bgImage.width / bgImage.height;
                    stageH = Math.round(stageW / ar);
                }
                // create canvas
                stage = new Kinetic.Stage({container: element, width: stageW, height: stageH});
                heightStage = new Kinetic.Stage({container: "heightStage", width: 200, height: 200});
                var a = new Kinetic.Image({x: 0, y: 0, image: bgImage, width: stageW, height: stageH});
                shapesLayer = new Kinetic.Layer;
                shapesLayer.add(a);
                stage.add(shapesLayer);
                plugin.addText(plugin.settings.text, stageW - plugin.getTextWidth(plugin.settings.text), stageH - 10 - plugin.getSimpleTextHeight() + 5);

                stage.on('click', function () {
                    stage.toDataURL({
                        callback: function (base64) {
                            //showImage(base64);
                            $.ajax({
                                type: "POST",
                                url: "/adgen/wixBase64Save.php",
                                dataType: 'json',
                                data: { base64: base64 }
                            })
                            .done(function( msg ) {
                                console.log(msg);
                            });
                        }
                    });
                });
            };
            var imgSrc = $element.data('wix-ad-src'),
                imgText = $element.data('wix-ad-text');
            if (!_.isUndefined(imgSrc)) {
                bgImage.src = imgSrc;
                plugin.settings.text = _.isUndefined(imgText) ? plugin.settings.text : imgText;
            }
        };

        plugin.getSimpleTextHeight = function() {
            heightStage.clear();
            var a = new Kinetic.Text({
                    x: 0,
                    y: 0,
                    text: "M",
                    fontSize: plugin.settings.fontSize,
                    fontFamily: plugin.settings.fontFamily,
                    textFill: plugin.settings.fillColor,
                    textStroke: plugin.settings.strokeColor,
                    textStrokeWidth: plugin.settings.strokeWidth
                }),
                b = new Kinetic.Layer;
            b.add(a);
            heightStage.add(b);
            for (var a = b.getContext("2d").getImageData(0, 0, 200, 200).data, c = b = 0, e = a.length; c < e; c += 4)a[c] && (b = c);
            return Math.ceil(b / 4 / 200)
        };

        plugin.getSimpleText = function(a, b, c) {
            a = 0 != plugin.settings.strokeWidth ? new Kinetic.Text({
                x: b,
                y: c,
                text: a,
                fontSize: plugin.settings.fontSize,
                fontFamily: plugin.settings.fontFamily,
                textFill: plugin.settings.fillColor,
                textStroke: plugin.settings.strokeColor,
                textStrokeWidth: plugin.settings.strokeWidth
            }) : new Kinetic.Text({
                x: b,
                y: c,
                text: a,
                fontSize: plugin.settings.fontSize,
                fontFamily: plugin.settings.fontFamily,
                textFill: plugin.settings.fillColor
            });
            return a
        };

        plugin.getTextWidth = function(a) {
            var b = new Kinetic.Layer,
                b = b.getContext("2d");

            b.font = plugin.settings.fontSize + "pt " + plugin.settings.fontFamily;
            return b.measureText(a).width
        };

        plugin.addText = function(a, b, c) {
            var b = new Kinetic.Layer,
                e = new Kinetic.Layer,
                j = new Kinetic.Group({draggable: false}),
                e = e.getContext("2d");

            e.font = plugin.settings.fontSize + "pt " + plugin.settings.fontFamily;
            for (var h = e.measureText(a).width, f = a.toUpperCase().split(" "), g = "", k = "", i = 0, a = [], l = plugin.getSimpleTextHeight(), d = 0; d < f.length; d++)k = g, g = g + " " + f[d], h = e.measureText(g).width, h > stageW && (a[i] = k, g = f[d], i++);
            a[i] = g;
            for (d = 0; d < a.length; d++)h = stageW / 2 - e.measureText(a[d]).width / 2, f = c + (l + 3) * d + 5 * (0 < d), j.add(plugin.getSimpleText(a[d], h, f));
            b.add(j);
            stage.add(b);
            return b
        };

        plugin.init();

    };

    $.fn.wixAdMeme = function(options) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
            return this;
        }

        return this.each(function() {
            var plugin = new $.wixAdMeme(this, options);
        });
    };

})(jQuery);