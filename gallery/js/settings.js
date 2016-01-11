(function ($) {

    var galManager = function () {
        var that = this,
            collection;

        that.setCollectionId = function (guid) {
            Wix.Settings.setExternalId(guid, function () {
            }, function() {
                console.error('Can not save guid with setExternalId');
            });
        };

        that.getCollectionId = function (callback) {
            Wix.getExternalId(callback);
        };

        /**
         * Loads saved collection or creates an empty and saves
         */
        that.init = function () {
            that.getCollectionId(function (id) {
                if (_.isEmpty(id)) {
                    // create an empty collection
                    collection = new $cll.Collection({
                        type: 'videoGallery',
                        items: [],
                        publicProperties: {

                        }
                    });
                } else {
                    $cll.get(id).then(function (loadedCollection) {
                        console.log('just loaded collection', loadedCollection);

                        collection = loadedCollection;
                    });
                }
            });
        };
    };

    $(document).ready(function () {
        var adminTpl,
            generagedHTML,
            gMan = new galManager;

        adminTpl = _.template($('.tplAdminForm').html());
        generagedHTML = adminTpl({items: []});
        $('.wrapAdmin').html(generagedHTML);

//        Wix.UI.get('tiTle');
//        Wix.UI.onChange('tiTle', function(value, key){
//            Wix.UI.toJSON();
//        });

        Wix.UI.initialize({});

        $('.left .imgs .item').click(function () {
            var ind = $(this).data('wix-item-id');
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

                console.log('going to getCollectionId: ');
                gMan.getCollectionId(function (id) {
                    console.log('we got value: ', id);
                });
            });
            /*console.log('going to setCollectionId');
            gMan.setCollectionId('bb133804-47a9-40e8-955f-6c50149467ee');*/
        });


    });


})
(jQuery);

