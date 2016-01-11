(function ($) {

    var galManager = function () {
        var that = this,
            collection;

        that.getCollection = function () {
            return collection;
        };

        that.setCollectionId = function (guid, success) {
            Wix.Settings.setExternalId(guid, success(guid), function() {
                console.error('Can not save guid with setExternalId');
            });
        };

        that.getCollectionId = function (callback) {
            Wix.getExternalId(callback);
        };

        that.createEmptyCollection = function () {
            collection = new $cll.Collection({
                title: Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId(),
                type: 'videoGallery',
                items: [],
                publicProperties: {

                }
            });
        };

        that.saveCollection = function (success) {
            collection.save().then(function (result) {
                console.log('collection saved: ', collection);
                that.setCollectionId(collection.id, function (id) {
                    console.log('collection ID saved: ', id);
                    success(collection);
                });
            }, function (error) {
                console.error('collection.save error', error);
            });
        };

        /**
         * Loads saved collection or creates an empty and saves
         */
        that.init = function (complete) {
            that.getCollectionId(function (id) {
                if (_.isEmpty(id)) {
                    that.createEmptyCollection();
                    that.saveCollection(complete);
                } else {
                    $cll.get(id).then(function (loadedCollection) {
                        console.log('just loaded collection', loadedCollection);
                        collection = loadedCollection;
                        complete(collection);
                    }, function (error) {
                        console.error('Something went wrong', error);
                        console.log('Creating a new collection...');
                        that.createEmptyCollection();
                        that.saveCollection(complete);
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

                //console.log('going to getCollectionId: ');
                /*gMan.getCollectionId(function (id) {
                    console.log('we got value: ', id);
                });*/
            });
            /*console.log('going to setCollectionId');
            gMan.setCollectionId('bb133804-47a9-40e8-955f-6c50149467ee');*/
        });

        /*gMan.init(function (col) {
           console.log('wow, here is saved or loaded collection: ', col);
           console.log('wow, here is saved or loaded collection: ', gMan.getCollection());
        });*/


    });


})
(jQuery);

