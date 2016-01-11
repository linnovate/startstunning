(function($){

    var rows_global = 1, cols_global = 5;
    var romMarginRight = 0, rowMarginBottom = 0;
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
                            '<span>' + matrixSlides[item].title + '</span>' +
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
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 0",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 1",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "#StartStunning",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 3",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 4",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 5",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        },
        {
            "title": "slide 6",
            "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg"
        }
        ];




    var matrixStart = function() {
        var output = matrixLayoutMain();

        $('.matrix-gallery-inner').html(output);
    };



    $(document).ready(function() {
        matrixStart();

        //$('.matrix-gallery-inner').slick({
        //    infinite: true,
        //    slidesToShow: 1,
        //    slidesToScroll: 1
        //});


        $('.matrix-gallery .rows-wrap').css({left: rowsWrapRight, marginBottom: rowMarginBottom});
        $('.matrix-gallery-inner .row').css({width: rowWidth + '%'});

        var rowIn = $('.matrix-gallery-inner .row-in');
        rowIn.css({marginRight: romMarginRight, marginBottom: rowMarginBottom});
        rowIn.find('img').css({opacity: 0.1});



        setTimeout (function(){
            var maxHeight = 0;
            rowIn.height('auto');
            rowIn.each(function() {
            var thisHeight = $(this).height();
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
            rowIn.find('span').css({lineHeight: maxHeight + 'px'});
        }, 500);


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