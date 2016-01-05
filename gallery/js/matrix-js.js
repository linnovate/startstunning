(function($){

    var rows_global = 4, cols_global = 8;
    var romMarginRight = 10, rowMarginBottom = 10;
    var rowWidth = 100/cols_global;
    var rowsWrapRight = romMarginRight/2;



    var matrixLayoutMain = function() {
        var output = '';
        var item = 0;

        for (var wr = 0; wr * rows_global * cols_global < matrixSlides.length; wr ++) {
            output += '<div class="rows-wrap">';

            for (var i = 0; i * cols_global + wr * rows_global * cols_global < matrixSlides.length && i < rows_global; i++) {
                output += '<div class="rows">';
                  for (var row = 0; row + (i * cols_global + wr * rows_global * cols_global) < matrixSlides.length && row < cols_global; row++) {

                      output += '<div class="row"><div class="row-in">' +
                          '<img src="' + matrixSlides[item].src_big_img + '">' +
                          '</div></div>';
                      item++;
                  }
                output += '</div>';
            }

            output += '</div>';
        }

        return output;
    };


    var matrixSlides = [
        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom1.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom2.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 0",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom1.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom2.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom1.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom2.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 1",
            "src_big_img": "img/full/hom.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 2",
            "src_big_img": "img/full/hom4.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/rev.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom1.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        },
        {
            "title": "slide 3",
            "src_big_img": "img/small/hom2.jpg",
            "sub_title": "Lorem ipsum dolor dfr"
        }
    ];



    var matrixStart = function() {
        var output = matrixLayoutMain();
        $('.matrix-gallery-inner').html(output);
    };



    $(document).ready(function() {
        matrixStart();

        $('.matrix-gallery-inner').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });


        $('.matrix-gallery .rows-wrap').css({left: rowsWrapRight});
        $('.matrix-gallery-inner .row').css({width: rowWidth + '%'});

        var rowIn = $('.matrix-gallery-inner .row-in');
        rowIn.css({marginRight: romMarginRight, marginBottom: rowMarginBottom});
        rowIn.find('img').css({opacity: 0.1});



        setTimeout (function(){
            var maxHeight = 0;
            rowIn.height('auto');
            rowIn.each(function() {
                thisHeight = $(this).height();
                if (thisHeight > maxHeight) {
                    maxHeight = thisHeight;
                }
            });
            rowIn.height(function(i,val){
                if (val < maxHeight) {
                    val=maxHeight;
                }
                return val;
            });
            rowIn.find('img').css({opacity: 1});
        }, 200);



        $(".matrix-gallery img").fancybox({
            helpers: {
                media: true
            },
            youtube: {
                autoplay: 1
            }
        });




    });
})(jQuery);