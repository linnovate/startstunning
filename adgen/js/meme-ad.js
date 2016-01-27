Array.range = function (n) {
    // Array.range(5) --> [0,1,2,3,4]
    return Array.apply(null, Array(n)).map(function (x, i) {
        return i;
    });
};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function value(n) {
        var _this = this;
        // ACTUAL CODE FOR CHUNKING ARRAY:
        return Array.range(Math.ceil(this.length / n)).map(function (x, i) {
            return _this.slice(i * n, i * n + n);
        });
    }
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

(function($) {
    /*
    Array.range = function(n) {
        // Array.range(5) --> [0,1,2,3,4]
        return Array.apply(            null,Array(n)).map(function(x, i) { return i})
    };
    Object.defineProperty(Array.prototype, 'chunk', {
        value: function(n) {
            // ACTUAL CODE FOR CHUNKING ARRAY:
            return Array.range(
                Math.ceil(this.length/n)).map(
                    function(x, i){
                        console.log(this);
                        return this.slice(i*n,i*n+n)
                    }
                );
            }
    });
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    */

    //var baseURL = 'http://server/wix/startstunning/adgen';
    var baseURL = location.href;

    $.wixAdData = function () {
        var component = this;

        component.categories = [];
        component.itemsData = {};
        component.popData;
        component.randomMain;

        component.getCategories = function() {
            return component.categories;
        };

        component.popEl = function(count) {
            if (_.isUndefined(count)) count = 1;

            if (_.isUndefined(component.popData)) {
                component.popData = [];

                _.each(component.itemsData, function(items) {
                    component.popData = component.popData.concat(items);
                });
                component.popData = _.shuffle(component.popData);
                component.randomMain = _.sample(component.popData);
            }

            return component.popData.splice(0, count);
        };

        component.queryEl = function(category, count) {
            var res = [];

            console.log(category);

            _.each(component.itemsData, function (item) {
                _.each(item.meta, function (meta) {
                    if (meta.category == category) {
                        res.push({
                            slogan: meta.slogan,
                            gifNologo: item.gifNoLogo,
                            gifLogo: item.gifLogo,
                            jpgNoLogo: item.jpgNoLogo,
                            jpgLogo: item.jpgLogo
                        });
                    }
                })
            });

            return res.slice(0, count);
        };

        component.getObjectRandomKey = function (obj) {
            var keys = Object.keys(obj);
            return keys[keys.length * Math.random() << 0];
        };

        component.init = function (success) {
            $.getJSON('/adgen/data.json').done(function (data) {
                component.categories = data.categories;
                component.itemsData = data.items;
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

                $(this).css('background-image', 'url("'+img+'")');
            }, function () {
                var img = $(this).data('wix-url');
                $(this).css('background-image', 'url("'+img+'")');
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

                    $('.meme-wrap').wixAdPreview({
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

    // wixAdPreview
    $.wixAdPreview = function(element, options) {
        var defaults = {
                text: '',
                fontSize: '35px',
                fontFamily: 'impact',
                numWorkers: 8
            },
            plugin = this,
            $element = $(element),
            element = element,
            canvas,
            frames = [],
            $memeAd,
            superGif,
            imgGif,
            wixImg;

        plugin.settings = {};

        plugin.getFrames = function() {
            if (_.isEmpty(frames)) {
                for (var i = 0; i < superGif.get_length(); i++) {
                    superGif.move_to(i);
                    frames.push(canvas.toDataURL());
                }
            }

            return frames;
        };

        plugin.getCaptionStamp = function() {
            var lines = plugin.settings.text.split('\n'),
                $cont = $('<div class="meme-text strokeme"></div>');
            _.each(lines, function (line, i) {
                var cls = i == 0 ? 'text-headline' : 'text-slogan';
                $cont.append($('<div></div>').addClass(cls).text(line));
            });
            return $cont;
        };

        plugin.assembleGif = function(complete) {
            var params = _.extend(
                {
                    images: plugin.getFrames(),
                    gifWidth: canvas.width,
                    gifHeight: canvas.height
                },
                plugin.settings
            );
            if (_.isEmpty(imgGif)) {
                gifshot.createGIF(params, function (obj) {
                    if (!obj.error) {
                        imgGif = obj.image;
                        complete(obj.image);
                    } else console.error('error while gif assembling: ', obj.error);
                });
            } else {
                complete(imgGif);
            }
        };

        plugin.showProcessing = function() {
            $element.find('.loader').addClass('processing');
        };

        plugin.hideProcessing = function() {
            $element.find('.loader').removeClass('processing');
        };

        plugin.base64toBlob = function (base64Data, contentType) {
            contentType=contentType || '';
            var sliceSize=1024;
            var byteCharacters=window.atob(base64Data);
            var bytesLength=byteCharacters.length;
            var slicesCount=Math.ceil(bytesLength / sliceSize);
            var byteArrays=new Array(slicesCount);

            for(var sliceIndex=0; sliceIndex<slicesCount; ++sliceIndex) {
                var begin=sliceIndex * sliceSize;
                var end=Math.min(begin + sliceSize, bytesLength);

                var bytes=new Array(end - begin);
                for(var offset=begin, i=0; offset<end; ++i, ++offset) {
                    bytes[i]=byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex]=new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        };

        plugin.share = function (file_id) {
            FB.ui({
              method: 'share',
              href: location.origin+'/adgen?case='+file_id,
            }, function(response) {
                console.log('FB response: ', response);
            });
        };

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            $memeAd = $element.find('.meme-ad');

            if (!plugin.settings.text.length) {
                plugin.settings.text = $memeAd.data('wix-ad-text') + '\n' + $memeAd.data('wix-ad-slogan');
                plugin.settings.text = plugin.settings.text.toUpperCase();
            }

            if ($memeAd.hasClass('meme-animated')) {
                console.log('found animated');
                plugin.showProcessing();
                superGif = new SuperGif({
                    gif: $memeAd.find('img')[0],
                    progressbar_height : 10,
                    progressbar_background_color: 'transparent',
                    progressbar_foreground_color: '#3e5c99',
                    auto_play: 0,
                    rubbable: 0
                });

                superGif.load(function () {
                    console.log('oh hey, now the gif is loaded');
                    plugin.hideProcessing();

                    canvas = superGif.get_canvas();

                    $(canvas).after(plugin.getCaptionStamp());

                    $('canvas, .meme-text', $element)
                        .mouseover(function() {
                            superGif.play();
                        })
                        .mouseout(function() {
                            superGif.pause();
                        });
                });

                $element.find('.btn-fb').on('click', function () {
                    console.log('assembling started...');
                    plugin.showProcessing();
                    plugin.assembleGif(function (gif) {
                        plugin.saveToServer(gif, function (result) {
                            console.log(result);
                            plugin.fbPreCache(plugin.getShareUrl(result.file_name), function(){
                                setTimeout(function() {
                                    plugin.share(result.file_name);
                                    plugin.hideProcessing();
                                }, 2000);
                            });
                        });
                    });

                });

                $element.find('.btn-tw').on('click', function () {
                    console.log('assembling started...');
                    plugin.showProcessing();
                    plugin.assembleGif(function (gif) {
                        plugin.saveToServer(gif, function (result) {
                            console.log(result);
                            plugin.popupWindow('https://twitter.com/intent/tweet?url='+plugin.getShareUrl(result.file_name), '', 800, 800);
                            plugin.hideProcessing();
                        });
                    });
                });
            } else {
                $memeAd.css('background-image', 'url("'+$memeAd.data('wix-ad-src')+'")')
                    .append(plugin.getCaptionStamp());


                $element.find('.btn-fb, .btn-tw').on('click', function () {
                    console.log('static processing started...');

                    var $btnClick = $(this);

                    plugin.createStaticMeme(function (src, width, height) {
                        plugin.saveToServer(src, function (result) {
                            console.log(result);
                            plugin.share(result.file_name);
                            //plugin.popupWindow(plugin.getShareUrl(result.file_name), '', 800, 800);
                            plugin.hideProcessing();
                        });
                    })
                });

            }

        };

        plugin.getShareUrl = function (file_id) {
            return location.origin+'/adgen?case='+file_id;
        };

        plugin.fbPreCache = function (url, complete) {
            $.ajax({
                type: "POST",
                url: "https://graph.facebook.com",
                data: {
                    id: url,
                    scrape: true
                }
            })
            .done(function(result) {
                complete();
            });
        };

        plugin.saveToServer = function (fileString, complete) {
            if (_.isEmpty(wixImg)) {
                $.ajax({
                    type: "POST",
                    url: "/adgen/proxy.php",
                    dataType: 'json'
                })
                .done(function(result) {
                    // prepare form data
                    var base64 = fileString.split(',')[1],
                        formData = new FormData();
                    // JavaScript file-like object
                    formData.append('media_type', 'picture');
                    formData.append('file', plugin.base64toBlob(base64, 'image/gif'), 'filename.gif');

                    $.ajax({
                        type: "POST",
                        url: result.upload_url,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: formData,
                        headers: result.access
                    })
                    .done(function(result) {
                        if (result.length) {
                            wixImg = result[0];
                            complete(wixImg);
                        }
                    });
                });
            } else {
                complete(wixImg);
            }
        };

        plugin.createStaticMeme = function (complete) {
            var $img = $memeAd.find('img'),
                imgWidth = $img.width(),
                imgHeight = $img.height(),
                params = _.extend({
                    images: [$img.attr('src')],
                    gifWidth: imgWidth,
                    gifHeight: imgHeight
                }, plugin.settings);

            plugin.showProcessing();
            if (_.isEmpty(imgGif)) {
                gifshot.createGIF(params, function (obj) {
                    if (!obj.error) {
                        console.log('static processing finished');
                        imgGif = obj.image;
                        complete(imgGif, imgWidth, imgHeight);
                    } else console.error('error while gif assembling: ', obj.error);
                });
            } else {
                complete(imgGif, imgWidth, imgHeight);
                plugin.hideProcessing();
            }
        };

        plugin.popupWindow = function (url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

            width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }
        };

        plugin.init();

    };

    $.fn.wixAdPreview = function(options) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
            return this;
        }

        return this.each(function() {
            var plugin = new $.wixAdPreview(this, options);
        });
    };

}(jQuery));
