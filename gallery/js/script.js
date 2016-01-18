(function ($) {

    $.wixVideoGallery = function (element, slides, options) {
        var defaults = {
                autoPlay: 4,
                minSlidesMsg: 'Very close to start, add {0} more...',
                noSlidesMsgAdmin: 'Double click to start populating this gallery...',
                noSlidesMsg: 'You need to add some content...',
            },
            $element = $(element),
            element = element,
            render,
            generatedHTML = '',
            plugin = this,
            $main_stage, $main_stage_carousel, $carousel_inner, $thumbnails, num_carousel_items, is_animating_carousel = !1,
            mainstage_loaded = 0,
            next_index, next_data_index, pause_auto = 0,
            timerId = 0,
            data_next, data_prev,
            thumbMarginRight = 5,

            tplBigLi = function (c, i) {
                var btn = '';
                if (_.isEmpty(c.button_caption)) c.button_caption = 'See More';

                if (!_.isEmpty(c.first_button_href)) {
                    btn = '<a href="' + c.first_button_href + '" class="btn fancybox btn-outline">' + c.button_caption + '<span>▷</span></a>';
                } else if (!_.isEmpty(c.second_button_href)) {
                    btn = '<a target="_blank" href="' + c.second_button_href + '" class="btn btn-outline">' + c.button_caption + '<span>▷</span></a>';
                }

                i == 2 ? act = ' active' : act = '';
                return '' +
                    '<li class="item' + act + '" data-wix-id="' + c.id + '" data-index="' + i + '">' +
                    '<div class="item-overlay">' +
                    '</div>' +
                    '<div style="background-image: url(' + c.src_big_img + ');" class="main-stage-feature-image-container semi-initial">' +
                    '<img src="' + c.src_big_img + '" alt="">' +
                    '</div>' +
                    '<div class="film-info">' +
                    '<h1>' + c.title + '</h1>' +
                    '<h2>' + c.sub_title + '</h2>' +
                    btn +
                    '</div>' +
                    '</li>';
            },

            tplSmallLi = function (c, i) {
                i == 2 ? act = ' active' : act = '';
                return '' +
                    '<li class="show' + act + '" data-wix-id="' + c.id + '" data-index="' + i + '">' +
                    '<div class="item-overlay">' +
                    '</div>' +
                    '<img src="' + c.src_small_img + '" alt="">' +
                    '<div class="details">' +
                    '<h4>' + c.title + '</h4>' +
                    '<span>' + c.small_sub_title + '</span>' +
                    '</div>' +
                    '</li>';
            },

            tplMain = function (slides) {
                var output = '';

                output += '<section id="main-stage">' +
                    '<div class="triangle"></div>' +
                    '<ul id="carousel_inner" class="carousel-inner show">';

                var bigLi = '';
                _.each(slides, function (item, i) {
                    bigLi += tplBigLi(item, i);
                });

                output += bigLi;

                output += '</ul>';
                output += '<a href="javascript:" data-direction="prev" class="left carousel-control show">' +
                    '<span class="chevron"></span>' +
                    '</a>' +
                    '<a href="javascript:" data-direction="next" class="right carousel-control show">' +
                    '<span class="chevron"></span>' +
                    '</a>' +
                    '</section>' +
                    '<section id="main-stage-menu" style="background-image: none;">' +
                    '<ul id="thumbnails" class="videos">';

                var smallLi = '';
                _.each(slides, function (item, i) {
                    smallLi += tplSmallLi(item, i);
                });
                slides.forEach(function (arr) {

                });
                output += smallLi;

                output += '</ul>' +
                    '<div style="clear:both"></div>' +
                    '</section>';

                output = '<div class="slider-wrap">'+output+'</div><div class="load-overlay"></div>';

                return output;
            },

            swiper_init = function () {
                $main_stage = $("#main-stage");
                $main_stage_carousel = $("#main_stage_carousel");
                $main_stage_carousel.on("slid.bs.carousel", function () {
                    is_animating_carousel = !1
                });
                $carousel_inner = $("#carousel_inner");
                $thumbnails = $("#thumbnails");
                num_carousel_items = $thumbnails.find("li").length;
                thumbnails_bind();
                $main_stage.find(".carousel-control").on("click", function () {
                    var a = $(this).data("direction");
                    if ("next" === a) {
                        next_index = $thumbnails.find("li.active").next().index();
                        next_data_index = $thumbnails.find("li.active").next().index();
//        next_data_index = $thumbnails.find("li.active").next().data("index");
                        data_next = $("#main_stage_carousel").find(".active").next().attr("data-filmname");
                    } else {
                        next_index = $thumbnails.find("li.active").prev().index();
                        next_data_index = $thumbnails.find("li.active").prev().index();
//        next_data_index = $thumbnails.find("li.active").prev().data("index");
                        data_prev = $("#main_stage_carousel").find(".active").prev().attr("data-filmname");
                    }
                    ;

                    select_carousel_item(next_index, next_data_index, a)
                });

                var a = $("#initial_main_stage_feature_image"),
                    b = a.parent().data("image");
                a.attr("src", b);
                a.parent().attr("data-image", b);
                a.on("load", function () {
                    $("#main-stage .carousel-inner, .carousel-control").addClass("show"), load_hidden_carousel_images()
                });

                var sliderInterval = plugin.settings.autoPlay * 1000;

                if (sliderInterval != 0) {
                    timerId = setInterval(function () {
                        (next_index = $thumbnails.find("li.active").next().index(), next_data_index = $thumbnails.find("li.active").next().data("index"), data_next = $("#main_stage_carousel .active").next().attr("data-filmname"), select_carousel_item(next_index, next_data_index, "next"))

                    }, sliderInterval), $("#main-stage, #main-stage-menu").click(function () {
                        pause_auto = 1, clearInterval(timerId)
                    }), $(window).blur(function () {
                        pause_auto = 1, clearInterval(timerId)
                    });
                }

            };

        function load_main_stage_image(a) {
            var b = $main_stage_carousel.find('li.item[data-index="' + a + '"]').find(".main-stage-feature-image-container"),
                c = a,
                d = b.find('img').attr('src');
            if ("undefined" == typeof $("#main_stage_feature_image_" + c).find("img").attr("src")) {
                var e = new Image;
                e.src = d, $("#main_stage_feature_image_" + c).html('<img src="' + e.src + '" alt="">')
            }
        }

        function load_hidden_carousel_images() {
            var a = $(".main-stage-feature-image-container:not(.semi-initial)").length,
                b = $("#carousel_inner").find(".main-stage-feature-image-container.semi-initial").length,
                c = a - b;
            $("#carousel_inner").find(".main-stage-feature-image-container.semi-initial").each(function (b, d) {
                var e = $(this).data("id"),
                    f = $(this).data("image"),
                    g = new Image;
                g.src = f, $("#main_stage_feature_image_" + e).html('<img src="' + g.src + '" alt="">'), a--, a === c && (pause_auto = 1)
            })
        }

        function adjust_carousel_size() {
            var a = $(window).width(),
                b = (a - thumbMarginRight * 4) / 5;
            $thumbnails.find("li").width(b).queue(function () {
                $("#main-stage-menu").css({
                    backgroundImage: "none"
                }), $("#thumbnails").find("li").addClass("show")
            });
            var c = $thumbnails.children("li.active").index(),
                d = $thumbnails.children("li:eq(" + c + ")"),
                e = d.position().left,
                f = d.width(),
                g = -e + 2 * f + (thumbMarginRight * 2),
                g = 0; // looks better

            if (a > 768) {
                $thumbnails.width(b * num_carousel_items + .05 * a * num_carousel_items), $thumbnails.css("left", 0 + "px");
                var h = a > 768 ? .42555555555556 * a : 327;
                $main_stage.find(".item img, .item").height(h), $main_stage.find(".item").width($(window).width())
            } else $main_stage.find(".item").width(768);
            mainstage_loaded = 1;

//  custom
            $main_stage.height($(window).height() - $thumbnails.height());
        }

        function select_carousel_item(a, b, c) {
            if (is_animating_carousel !== !0) {
                is_animating_carousel = !0;
                var d, e, f = $thumbnails.find("li.active").index(),
                    g = a,
                    h = $main_stage_carousel.find("li.item.active").find(".main-stage-feature-image-container"),
                    i = (h.parent().data("index"), b);
                if ("next" === c) {
                    d = i + 1;
                    d > num_carousel_items - 1 && (d = 0);
                    e = d + 1;
                    e > num_carousel_items - 1 && (e = 0);
                } else {
                    d = i - 1;
                    0 > d && (d = num_carousel_items - 1);
                    e = d - 1;
                    0 > e && (e = num_carousel_items - 1);
                }
                load_main_stage_image(d);
                load_main_stage_image(e);

                var j, k, l, m;
                if ("next" === c && a >= num_carousel_items - 2) j = $carousel_inner.find("li.item").first(), j.clone().appendTo($carousel_inner), k = $thumbnails.find("li").first(), $thumbnails.width($thumbnails.width() + 2 * k.width()), k.clone().appendTo($thumbnails), a >= num_carousel_items - 1 && (l = $carousel_inner.find("li.item:eq(1)"), l.clone().appendTo($carousel_inner), m = $thumbnails.find("li:eq(1)"), $thumbnails.width($thumbnails.width() + 2 * m.width()), m.clone().appendTo($thumbnails));
                else if ("prev" === c && 2 >= a) {
                    j = $carousel_inner.find("li.item").last(), j.clone().prependTo($carousel_inner), k = $thumbnails.find("li").last(), $thumbnails.width($thumbnails.width() + 2 * k.width()), k.clone().prependTo($thumbnails);
                    var n = a + (f - a + 1);
                    if (g++, 1 > a) {
                        l = $carousel_inner.find("li.item:eq(" + (num_carousel_items - 1) + ")"), l.clone().prependTo($carousel_inner), m = $thumbnails.find("li:eq(" + (num_carousel_items - 1) + ")"), $thumbnails.width($thumbnails.width() + 2 * m.width()), m.clone().prependTo($thumbnails), g++;
                        var o = f - a - 1;
                        n += o
                    }
                    var p = $thumbnails.find("li:eq(" + n + ")"),
                        tt = -p.position().left + 2 * p.width() + (thumbMarginRight * 2);
                    $thumbnails.css("left", tt + "px")
                }
                var q = $thumbnails.find("li:eq(" + g + ")"),
                    r = q.position().left,
                    s = q.width(),
                    t = -r + 2 * s + (thumbMarginRight * 2);
                t > 0 && t <= 2 ? t = 0 : t;
                $thumbnails.find("li.active").removeClass("active");
                q.addClass("active");
                $thumbnails.animate({
                    left: t + "px"
                }, 500, function () {

                    "undefined" != typeof k && ("next" === c && (r = $fox.is_defined(m) ? $thumbnails.find("li:eq(" + (q.index() - 2) + ")").position().left : q.prev().position().left),
                        t = -r + 2 * s + (thumbMarginRight * 2), t > 0 && t <= 2 ? t = 0 : t,
                        k.remove(),
                    $fox.is_defined(m) && m.remove(),
                        $thumbnails.css("left", t + "px"),
                    $fox.is_defined(j) && j.remove(),
                    $fox.is_defined(l) && l.remove(), thumbnails_bind())
                });
                var u;
                if ("next" === c) {
                    u = $thumbnails.find('li[data-index="' + q.data("index") + '"]').index();
                    $main_stage_carousel.carousel(u);
                } else if ("prev" === c) {
                    u = $thumbnails.find('li[data-index="' + q.data("index") + '"]').index();
                    $main_stage_carousel.carousel(u);
                }
            }
        }

        function thumbnails_bind() {
            $thumbnails.find("li").off("click").on("click", function () {
                var a = $(this).index(),
                    b = $(this).data("index"),
                    c = $thumbnails.find("li.active").index(),
                    d = a > c ? "next" : "prev",
                    e = $(this).data("filmname"),
                    f = $("#main-stage").height();
                a !== c && ($(document).scrollTop() > f / 2.2 && $("html, body").delay(300).animate({
                    scrollTop: 0
                }, 700), select_carousel_item(a, b, d));
            })
        }


        plugin.settings = {};

        plugin.format = function (source, params) {
            $.each(params, function (i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                    return n;
                });
            });
            return source;
        };

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            var minNum = 5, msg;
            if (_.isEmpty(slides)) {
                generatedHTML = '<div class="slider-warning">' + plugin.settings.noSlidesMsg + '</div>';
                $(element).html(generatedHTML);
            } else if (slides.length < minNum) {
                msg = plugin.format(plugin.settings.minSlidesMsg, [minNum - slides.length]);
                generatedHTML = '<div class="slider-warning">' + msg + '</div>';
                $(element).html(generatedHTML);
            } else {
                generatedHTML = tplMain(slides);
                $(element).html(generatedHTML).addClass('slider-loading');
                swiper_init();

                $(element).imagesLoaded( function() {
                    adjust_carousel_size();
                    $(element).removeClass('slider-loading');
                });

                $(window).resize(function() {
                    adjust_carousel_size();
                });
            }
        };

        plugin.init();

    };

    $.fn.wixVideoGallery = function (slides, options) {
        if (!this.length) {
            console.error('Can not find a container "%s"', this.selector);
        } else {
            var plugin = new $.wixVideoGallery(this[0], slides, options);
        }

        return this;
    };
})(jQuery);
