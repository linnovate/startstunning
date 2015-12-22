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

        component.sortByColumns = function(raw) {
            var res = {};
            _.each(raw, function (grEl, key) {
                res[key] = {};
                _.each(grEl, function(el) {
                    if (_.isUndefined(res[key][el.column])) res[key][el.column] = [];
                    res[key][el.column].push(el);
                });
            });

            return res;
        };

        component.getEntityTypes = function() {
            var res = [],
                obj = {};

            _.each(component.itemsData, function(el, enName) {
                obj = {};
                obj.name = enName;
                obj.url = el.image;
                res.push(obj);
                // TODO: remove the rest for production!
                res.push(obj);
                res.push(obj);
                res.push(obj);
                res.push(obj);
                res.push(obj);
            });

            return res;
        };

        component.getCategories = function(types) {
            var res = {};

            _.each(types, function (el) {
                _.each(component.itemsData[el].categories, function (category, catName) {
                    if (_.isUndefined(res[catName])) res[catName] = catName;
                })
            });

            return res;
        };

        component.queryEl = function(type, category, setsCount) {
            var result = {},
                holder = [], holderLength,
                randomKey,
                data = component.itemsData;

            if (_.isUndefined(setsCount)) setsCount = 1;

            if (_.has(data, type) &&
                !_.isEmpty(data[type]) &&
                _.has(data[type], 'categories') &&
                !_.isEmpty(data[type]['categories'][category])
            ) {
                holder = jQuery.extend(true, {}, data[type]['categories'][category]);
                holderLength = Object.keys(holder).length;
                if (setsCount > holderLength) setsCount = holderLength;

                for(var i = setsCount; i > 0; i--) {
                    randomKey = component.getObjectRandomKey(holder);
                    result[randomKey] = holder[randomKey];
                    delete holder[randomKey];
                }
            }

            return result;
        };

        component.getObjectRandomKey = function (obj) {
            var keys = Object.keys(obj);
            return keys[keys.length * Math.random() << 0];
        };

        component.init = function (success) {
            $.getJSON(baseURL+'/data.json').done(function (data) {
                component.itemsData = data;
                success.call(component);
            });
        };
    };

    // wixAdPicker
    $.wixAdPicker = function(element, options, adData) {
        var defaults = {
                elementsInRow: 4,
                maxSelection: 2
            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this;

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-entity-pick').html());
            generatedHTML = render({data: adData.getEntityTypes().chunk(plugin.settings.elementsInRow)});

            $(element).html(generatedHTML);

            $element.find('img').on('click', function () {
                var curSelected = $element.find('img.selected').length;
                if (curSelected >= plugin.settings.maxSelection && !$(this).hasClass('selected')) {
                    alert('You can select only '+plugin.settings.maxSelection +' items, unselect previous');
                } else {
                    $(this).toggleClass('selected');
                }

                curSelected = $element.find('img.selected').length;
                if (curSelected > 0) {
                    $('#btn-goto-form').removeAttr('disabled');
                } else {
                    $('#btn-goto-form').attr('disabled', 'disabled');
                }
            });


        };

        plugin.init();

    };

    $.fn.wixAdPicker = function(options, adData) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixAdPicker(this[0], options, adData);
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
            plugin = this;

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-form').html());
            generatedHTML = render({data: adData.getCategories(plugin.settings.types)});

            $(element).html(generatedHTML);

            var $fieldBusinessName = $element.find('#business-name');
            var $fieldCategory = $element.find('#ad-category');

            $fieldBusinessName.on('keyup', function () {
                if ($(this).val() && $fieldCategory.val()) {
                    $('#btn-goto-ads').removeAttr('disabled');
                } else {
                    $('#btn-goto-ads').attr('disabled', 'disabled');
                }
            });

            $fieldCategory.on('change', function () {
                if ($(this).val() && $fieldBusinessName.val()) {
                    $('#btn-goto-ads').removeAttr('disabled');
                } else {
                    $('#btn-goto-ads').attr('disabled', 'disabled');
                }
            });
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
    $.wixAdLayout = function(element, options, adData) {
        var defaults = {
                layout: 'col2'
            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this;

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            render = _.template($('script.tpl-'+plugin.settings.layout).html());

            _.each(plugin.settings.sets, function (el) {
                if (plugin.settings.sets.length == 1) {
                    var data = adData.sortByColumns(adData.queryEl(el.type, el.category, plugin.settings.subSetsIfOneSet));
                } else if (plugin.settings.sets.length > 1) {
                    var data = adData.sortByColumns(adData.queryEl(el.type, el.category));
                }
                generatedHTML += render({
                    groupItems: data,
                    caption:    plugin.settings.caption
                });

            });

            $(element).html(generatedHTML);
        };

        plugin.init();

    };

    $.fn.wixAdLayout = function(options, adData) {
        if (!this.length){
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixAdLayout(this[0], options, adData);
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
                // create canvas
                stage = new Kinetic.Stage({container: element, width: stageW, height: stageH});
                heightStage = new Kinetic.Stage({container: "heightStage", width: 200, height: 200});
                var a = new Kinetic.Image({x: 0, y: 0, image: bgImage});
                shapesLayer = new Kinetic.Layer;
                shapesLayer.add(a);
                stage.add(shapesLayer);
                plugin.addText(plugin.settings.text, stageW - plugin.getTextWidth(plugin.settings.text), stageH - 10 - plugin.getSimpleTextHeight() + 5);

                stage.on('click', function () {
                    stage.toDataURL({
                        callback: function (base64) {
                            console.log(base64);
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