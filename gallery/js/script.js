(function($){

    var tplBigLi = function(c) {
      c.data_ind  == 2 ? act = ' active' : act = '';
      return '' +
      '<li class="item'+ act +'" data-index="' + c.data_ind + '" data-filmname="' + c.data_filmn + '">' +
      '<div class="gradient"></div>' +
      '<div class="main-stage-feature-image-container semi-initial">' +
      '<img src="' + c.src_big_img + '" alt="">' +
      '</div>' +
      '<div class="container">' +
      '<div class="film-info">' +
      '<a href="' + c.title_href + '">' +
      '<h1>' + c.title + '<span></span></h1>' +
      '<h2>' + c.sub_title + '</h2>' +
      '</a>' +
      '</div>' +
      '<ul class="buttons">' +
      '<li>' +
      '<a href="' + c.first_button_href + '" class="btn"><span class="left">' + c.first_button + '</span><span class="right"><span></span></span></a>' +
      '</li>' +
      '<li>' +
      '<a href="' + c.second_button_href + '" class="btn"><span class="left">' + c.second_button + '</span><span class="right"><span class="arrow"></span></span></a>' +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</li>' ;
    };

    var tplSmallLi = function(c) {
      c.data_ind  == 2 ? act = ' active' : act = '';
      return '' +
      '<li class="show'+ act +'" data-index="' + c.data_ind + '" data-filmname="' + c.data_filmn + '">' +
      '<img src="' + c.src_small_img + '" alt="">' +
      '<div class="details">' +
      '<span>' + c.small_sub_title + '</span>' +
      '<h4>' + c.title + '</h4>' +
      '</div>' +
      '</li>' ;
    };

var tplMain = function(slides) {
  var output = '';

  output += '<section id="main-stage">' +
            '<ul id="carousel_inner" class="carousel-inner show">';

  var bigLi = '';
  slides.forEach(function(arr) {bigLi += tplBigLi(arr); });
  output += bigLi;

  output += '</ul>';
  output +='<div class="pointer">' +
  '<div class="left-triangle"></div>' +
  '<div class="right-triangle"></div>' +
  '</div>' +
  '<a href="javascript:" data-direction="prev" class="left carousel-control show">' +
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
    "src_big_img": "img/full/rev.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "Lorem ipsum dolor dfr",
    "first_button_href": "http://www.google.com",
    "first_button": "first button",
    "second_button_href": "http://www.google.com",
    "second_button": "second button",
    "src_small_img": "img/small/rev.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "1",
    "data_filmn": "Lorem ipsum do",
    "title": "slide 1",
    "src_big_img": "img/full/hom.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere n",
    "first_button_href": "http://www.google.com",
    "first_button": "first button123",
    "second_button_href": "http://www.google.com",
    "second_button": "second b1",
    "src_small_img": "img/small/hom1.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "2",
    "data_filmn": "Lorem ipsum dol",
    "title": "slide 2",
    "src_big_img": "img/full/hom4.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere ndd",
    "first_button_href": "http://www.google.com",
    "first_button": "first button15",
    "second_button_href": "http://www.google.com",
    "second_button": "second buttn 1",
    "src_small_img": "img/small/hom2.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "3",
    "data_filmn": "Lorem ipsum d",
    "title": "slide 3",
    "src_big_img": "img/full/rev.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere ndvdws",
    "first_button_href": "http://www.google.com",
    "first_button": "first button11",
    "second_button_href": "http://www.google.com",
    "second_button": "second button n",
    "src_small_img": "img/small/rev.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "4",
    "data_filmn": "Lorem ipsum",
    "title": "slide 4",
    "src_big_img": "img/full/hom.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere ndww",
    "first_button_href": "http://www.google.com",
    "first_button": "first button12",
    "second_button_href": "http://www.google.com",
    "second_button": "second button3",
    "src_small_img": "img/small/hom1.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "5",
    "data_filmn": "Lorem ipsum dolor i",
    "title": "slide 5",
    "src_big_img": "img/full/rev.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere nedded",
    "first_button_href": "http://www.google.com",
    "first_button": "first buttonx",
    "second_button_href": "http://www.google.com",
    "second_button": "second button5",
    "src_small_img": "img/small/rev.jpg",
    "small_sub_title": "small sub title text"
  },    {
    "data_ind": "6",
    "data_filmn": "Lorem ips",
    "title": "slide 6",
    "src_big_img": "img/full/rev.jpg",
    "title_href": "http://www.google.com",
    "sub_title": "sum id, posuere n",
    "first_button_href": "http://www.google.com",
    "first_button": "first button1",
    "second_button_href": "http://www.google.com",
    "second_button": "second button9",
    "src_small_img": "img/small/rev.jpg",
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
  });
})(jQuery);
