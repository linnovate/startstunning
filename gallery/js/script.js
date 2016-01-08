(function($){

    var tplBigLi = function(c) {
      var btn = '';
      if (!_.isEmpty(c.first_button_href) && !_.isEmpty(c.first_button)) {
        btn = '<a href="' + c.first_button_href + '" class="btn fancybox btn-outline">'+c.first_button+'<span>▷</span></a>';
      } else if (!_.isEmpty(c.second_button_href) && !_.isEmpty(c.second_button)) {
        btn = '<a target="_blank" href="' + c.second_button_href + '" class="btn btn-outline">'+c.second_button+'<span>▷</span></a>';
      }

      c.data_ind  == 2 ? act = ' active' : act = '';
      return '' +
      '<li class="item'+ act +'" data-index="' + c.data_ind + '" data-filmname="' + c.data_filmn + '">' +
      '<div class="main-stage-feature-image-container semi-initial">' +
      '<img src="' + c.src_big_img + '" alt="">' +
      '</div>' +
      '<div class="film-info">' +
      '<h1>' + c.title + '</h1>' +
      '<h2>' + c.sub_title + '</h2>' +
      btn +
      '</div>' +
      '</li>' ;
    };

    var tplSmallLi = function(c) {
      c.data_ind  == 2 ? act = ' active' : act = '';
      return '' +
      '<li class="show'+ act +'" data-index="' + c.data_ind + '" data-filmname="' + c.data_filmn + '">' +
      '<img src="' + c.src_small_img + '" alt="">' +
      '<div class="details">' +
      '<h4>' + c.title + '</h4>' +
      '<span>' + c.small_sub_title + '</span>' +
      '</div>' +
      '</li>' ;
    };

var tplMain = function(slides) {
  var output = '';

  output += '<section id="main-stage">' +
            '<div class="triangle"></div>' +
            '<ul id="carousel_inner" class="carousel-inner show">';

  var bigLi = '';
  slides.forEach(function(arr) {bigLi += tplBigLi(arr); });
  output += bigLi;

  output += '</ul>';
  output += '<a href="javascript:" data-direction="prev" class="left carousel-control show">' +
  '<span class="chevron"></span>' +
  '</a>' +
  '<a href="javascript:" data-direction="next" class="right carousel-control show">' +
  '<span class="chevron"></span>' +
  '</a>' +
  '</section>' +
  '<section id="main-stage-menu" style="padding-bottom: 30px; background-image: none;">' +
  '<ul id="thumbnails" class="videos">';

  var smallLi = '';
  slides.forEach(function(arr) {smallLi += tplSmallLi(arr);});
  output += smallLi;

  output += '</ul>' +
  '<div style="clear:both"></div>' +
  '</section>' ;

  return output;
};

var slides = [
  {
    "data_ind": "0",
    "data_filmn": "Lorem ipsum dolor",
    "title": "slide 0",
    "title_href": "http://www.google.com",
    "sub_title": "Lorem ipsum dolor dfr",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first button",
    "second_button_href": "http://www.google.com",
    "second_button": "second button",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "1",
    "data_filmn": "Lorem ipsum do",
    "title": "slide 1",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere n",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first button123",
    "second_button_href": "http://www.google.com",
    "second_button": "second b1",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/7ca24e8b0e7242c0b9b2f5498ac041af/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "2",
    "data_filmn": "Lorem ipsum dol",
    "title": "#StartStunning",
    "title_href": "http://www.google.com",
    "sub_title": "Po discovered the POWER OF WIX and now he can't stop making websites",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "Watch how it all started",
    "second_button_href": "http://www.google.com",
    "second_button": "second buttn 1",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "3",
    "data_filmn": "Lorem ipsum d",
    "title": "slide 3",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere ndvdws",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first button11",
    "second_button_href": "http://www.google.com",
    "second_button": "second button n",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/b9a5e5030e9f4055a51503f737134878/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "4",
    "data_filmn": "Lorem ipsum",
    "title": "slide 4",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere ndww",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first button12",
    "second_button_href": "http://www.google.com",
    "second_button": "second button3",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/cf247b50ae7b4fd8ad744f28f9e38524/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "5",
    "data_filmn": "Lorem ipsum dolor i",
    "title": "slide 5",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere nedded",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first buttonx",
    "second_button_href": "http://www.google.com",
    "second_button": "second button5",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/1a06e0869a7849b89cc6b573b7b1f3fd/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "6",
    "data_filmn": "Lorem ips",
    "title": "slide 6",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere n",
    "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
    "first_button": "first button1",
    "second_button_href": "http://www.google.com",
    "second_button": "second button9",
    "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
    "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/a05dc018564e4b9ab5057f6e1c4693ab/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
    "small_sub_title": "small sub title text"
  }
];

    var start = function(slides) {
      var output = tplMain(slides);
      $('#main_stage_carousel').html(output);
      swiper_init();
    };


  $(document).ready(function() {
    start(slides);

    // next/prev by keyboard arrows
    $( "body" ).keydown(function( event ) {
      if ( event.which == 37 || event.which == 40) {
        $('.left.carousel-control').click();
      }
      if ( event.which == 39 || event.which == 38) {
        $('.right.carousel-control').click();
      }
    });

    $(".fancybox").fancybox({
        helpers: {
            media: true
        },
        youtube: {
            autoplay: 1
        }
    });

  });
})(jQuery);
