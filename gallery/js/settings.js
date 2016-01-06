(function($) {


    var slides = [
        {
            "data_ind": "0",
            "data_filmn": "Lorem ipsum dolor",
            "title": "slide 0",
            "src_big_img": "img/full/rev.jpg",
            "title_href": "http://www.google.com",
            "sub_title": "Lorem ipsum dolor dfr",
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
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
            "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
            "first_button": "first button1",
            "second_button_href": "http://www.google.com",
            "second_button": "second button9",
            "src_small_img": "img/small/rev.jpg",
            "small_sub_title": "small sub title text"
        }
    ];



    $( document ).ready(function(){


        var adminTpl = _.template($('.tplAdminForm').html());
        var adminTemplate = adminTpl({tpl: slides});

        $('.wrapAdmin').html(adminTemplate);


        Wix.UI.initialize({});

        $('.newImage').click(function(){
            Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function(data) {
                // save image data
            })
        });

    });





})(jQuery);

