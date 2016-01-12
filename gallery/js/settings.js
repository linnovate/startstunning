(function ($) {

    var galManager = function () {
        var that = this,
            collection,
            selectedItem,
            defaultSlide = {
                "title": "",
                "sub_title": "",
                "small_sub_title": "",
                "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
                "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
                "button_caption": "",
                "first_button_href": "",
                "second_button_href": ""
            },
            $slideContainer = $('.imgs');

        that.getCollection = function () {
            return collection;
        };

        that.setCollectionId = function (guid, success) {
            Wix.Settings.setExternalId(guid, success(guid), function () {
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
                publicProperties: {}
            });
        };

        that.saveCollection = function (success, publish) {
            if (_.isUndefined(publish)) publish = true;

            collection.save().then(function (result) {
                if (publish) collection.publish();
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
        that.editFirstSlide = function () {
            if (collection.items.length) {
                that.makeEditable(collection.items[0].id);
            }
        };
        that.init = function (complete) {
            that.getCollectionId(function (id) {
                if (_.isEmpty(id)) {
                    that.createEmptyCollection();
                    that.saveCollection(complete);
                } else {
                    $cll.get(id).then(function (loadedCollection) {
                        console.log('just loaded collection', loadedCollection);
                        collection = loadedCollection;

                        $('body').on('click', '.imgs .item', function () {
                            var
                                id = $(this).data('wix-item-id');

                            that.makeEditable(id);
                        });

                        $('.btnApply').on('click', function () {
                            that.saveSelectedItem();
                        });

                        $('.btnDelete').on('click', function () {
                            that.removeSlide();
                        });


                        that.renderSlides();
                        that.editFirstSlide();

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

        that.convertCollectionToSlides = function () {
            var slides = [], slide;

            _.each(collection.items, function (item, i) {
                slide = _.assign({id: item.id}, item.publicProperties);
                slides.push(slide);
            });

            return slides;
        };

        that.renderSlides = function () {
            var slides, slideTpl, newSlideHTML = '';

            slides = that.convertCollectionToSlides();

            slideTpl = _.template($('.tpl-admin-slides').html());
            newSlideHTML = slideTpl({items: slides});
            $slideContainer.html(newSlideHTML);
        };

        that.removeSlide = function () {
            if (_.isUndefined(selectedItem)) return;

            selectedItem.delete().then(function (result) {
                that.saveCollection(function (col) {
                    console.log('removed item');
                    that.renderSlides();
                    that.editFirstSlide();
                });
            });
        };

        that.addSlide = function (rawImg) {
            var colItem = {
                title: 'some title',
                type: 'videoGallery',
                publicProperties: defaultSlide
            };

            //console.log('$slideContainer: ', $slideContainer);
            //console.log('rawImg', rawImg);

            // save to storage
            colItem = new $cll.Item(collection, colItem);
            //colItem.moveToStart();
            colItem.save().then(function (result) {
                console.log('collection item saved: ', result);
                console.log('collection we got: ', collection);

                collection.publish();
                that.renderSlides();

            }, function (error) {
                console.error('item collection save error', error);
            });

        };

        that.getItemIndexByID = function (id) {
            return _.findIndex(collection.items, function (item) {
                return item.id == id;
            });
        };

        that.saveSelectedItem = function () {
            if (_.isUndefined(selectedItem)) return;

            selectedItem.publicProperties.title = Wix.UI.get('title');
            selectedItem.publicProperties.sub_title = Wix.UI.get('desc');
            selectedItem.publicProperties.small_sub_title = Wix.UI.get('mDesc');
            selectedItem.publicProperties.button_caption = Wix.UI.get('bName');
            selectedItem.publicProperties.first_button_href = Wix.UI.get('vUrl');
            selectedItem.publicProperties.second_button_href = Wix.UI.get('eUrl');

            selectedItem.save().then(function (result) {
                console.log('collection item saved: ', result);
                console.log('collection we got: ', collection);
                collection.publish();
                Wix.Settings.refreshApp();

            }, function (error) {
                console.error('item collection save error', error);
            });

            console.log(selectedItem);
        };

        that.makeEditable = function (id) {
            var
                ind = that.getItemIndexByID(id),
                pubProp;

            console.log('found index by ID: ', ind);

            if (_.isUndefined(collection.items[ind])) return;

            selectedItem = collection.items[ind];
            pubProp = selectedItem.publicProperties;

            $('.inputWrap.title input').val(pubProp.title);
            $('.inputWrap.description input').val(pubProp.sub_title);
            $('.inputWrap.mDescription input').val(pubProp.small_sub_title);

            $('.inputWrap.buttonName input').val(pubProp.button_caption);
            $('.inputWrap.videoUrl input').val(pubProp.first_button_href);
            $('.inputWrap.externalUrl input').val(pubProp.second_button_href);

            $('.wrapAdmin .right .image').html('').html('<img src="' + pubProp.src_small_img + '">');
        };
    };

    function initSettings() {
        var slidesTpl,
            generagedHTML,
            gMan = new galManager;

        slidesTpl = _.template($('.tpl-admin-slides').html());
        generagedHTML = slidesTpl({items: []});
        $('.imgs').html(generagedHTML);

        Wix.UI.initialize({});
        gallerySettings();


        $('.newImage').click(function () {
            gMan.addSlide();

            /*Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function (data) {

            });*/
            //console.log('going to getCollectionId: ');
            /*gMan.getCollectionId(function (id) {
             console.log('we got value: ', id);
             });*/
            /*console.log('going to setCollectionId');
             gMan.setCollectionId('bb133804-47a9-40e8-955f-6c50149467ee');*/
        });

        gMan.init(function (col) {
            //console.log('wow, here is saved or loaded collection: ', col);
            //console.log('wow, here is saved or loaded collection: ', gMan.getCollection());
        });
    }

    $(document).ready(function () {
        initSettings();
    });


})
(jQuery);

