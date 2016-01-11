(function ($) {

    var galSettings = function () {

        this.setVal = function (key, value) {
            Wix.Styles.setFontParam(key, {
                    value: value
                }
            );
        };

        this.getStyleParams = function (key) {
            Wix.Styles.getStyleParams(function (styleParams) {
                console.log('getStyleParams: ', styleParams);
            });
        };
    };

    $(document).ready(function () {
        var adminTpl, generagedHTML;

        //adminTpl = _.template($('.tplAdminForm').html());
        //generagedHTML = adminTpl({items: slides});
        //$('.wrapAdmin').html(adminTemplate);

        Wix.UI.initialize({});

//        Wix.UI.get('tiTle');
//        Wix.UI.onChange('tiTle', function(value, key){
//            Wix.UI.toJSON();
//        });

        $('.left .imgs .item').click(function () {
            var ind = $(this).data('ind');
            var item = slides[ind];
            $('.inputWrap.description input').val(item.data_filmn);
            $('.inputWrap.title input').val(item.title);
            $('.inputWrap.mDescription input').val(item.small_sub_title);
            $('.inputWrap.buttonName input').val(item.first_button);
            $('.inputWrap.videoUrl input').val(item.first_button_href);
            $('.inputWrap.externalUrl input').val(item.title_href);
            $('.inputWrap.buttonName input').val(item.first_button);
            $('.wrapAdmin .right .image').html('').html('<img src="' + item.src_big_img + '">');
        });


        $('.newImage').click(function () {
            Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function (data) {
                console.log('image data: ', data);
                // save image data
            })
        });


        var insSet = new galSettings;
        insSet.setVal('bora', 'wow!');
        insSet.getStyleParams();

    });


})
(jQuery);

