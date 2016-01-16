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

        that.getParameter = function (key, def) {
            if (!_.isUndefined(Wix.Styles.getStyleParams().fonts[key]))
                return Wix.Styles.getStyleParams().fonts[key];
            else return def;
        };

        that.setParameter = function (key, value) {
            Wix.Styles.setFontParam(key, {
                    value: value
                }
            );
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
        that.collectionProcessing = function (promise) {
            $('.tab-content').addClass('processing');

            return promise.always(function() {
                $('.tab-content').removeClass('processing');
            });
        };

        that.editFirstSlide = function () {
            // invoking without parameter means edit first slide
            that.makeEditable();
        };

        that.bindInterfaceEvents = function () {
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

            $('.btnApplySettings').on('click', function() {
                Wix.Settings.refreshApp();
            });

            $('.newImage').click(function () {
                that.addSlide();
            });

            Wix.UI.onChange('autoPlay', function(value, key) {
                that.setParameter(key, value);
            });

            $cll.on(['any'], that.collectionProcessing);
            $cll.Collection.on(['any'], that.collectionProcessing);
            $cll.ItemsList.on(['any'], that.collectionProcessing);
            $cll.Item.on(['any'], that.collectionProcessing);
        };

        that.init = function (complete) {
            that.getCollectionId(function (id) {
                if (_.isEmpty(id)) {
                    that.createEmptyCollection();
                    that.saveCollection(function () {
                        that.bindInterfaceEvents();
                        complete(collection);
                    });
                } else {
                    $cll.get(id).then(function (loadedCollection) {
                        collection = loadedCollection;

                        that.bindInterfaceEvents();
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

        that.enumerateCollectionSort = function () {
            $slideContainer.find('.item').each(function (i) {
                var
                    id = $(this).data('wix-item-id'),
                    //order = Math.round(i * 100) / 1000,
                    order = i * 10,
                    foundIndex;

                if (!_.isUndefined(id)) {

                    foundIndex = that.getItemIndexByID(id);
                    if (!_.isUndefined(collection.items[foundIndex])) {
                        collection.items[foundIndex].sortOrder = order;
                    }
                }
            });
            that.saveCollection(function (success) {
                console.log('saved after sort', collection);
            }, function (error) {
                console.error('error after sort and trying to save', error);
            });
        };

        that.renderSlides = function () {
            var slides, slideTpl, newSlideHTML = '';

            slides = that.convertCollectionToSlides();

            slideTpl = _.template($('.tpl-admin-slides').html());
            newSlideHTML = slideTpl({items: slides});
            $slideContainer.html(newSlideHTML).sortable({
                update: function( event, ui ) {
                    var
                        movedIndex,
                        $movedItem,
                        rightIndex,
                        leftIndex,
                        movedId,
                        rightId,
                        leftId,
                        movedItem,
                        rightItem,
                        leftItem,
                        itemsCount;

                    itemsCount = collection.items.length;
                    $movedItem = $(ui.item);
                    if (!$movedItem.length) return;

                    movedId = $movedItem.find('.item').data('wix-item-id');
                    movedIndex = that.getItemIndexByID(movedId);
                    movedItem = collection.items[movedIndex];
                    //console.log('movedId: %d, movedIndex: %d, movedTitle', movedId, movedIndex, movedItem.publicProperties.title);

                    if ($movedItem.index() != itemsCount - 1) {
                        rightId = $movedItem.next().find('.item').data('wix-item-id');
                        rightIndex = that.getItemIndexByID(rightId);
                        rightItem = collection.items[rightIndex];
                        //console.log('rightId: %d, rightIndex: %d, rightTitle', rightId, rightIndex, rightItem.publicProperties.title);
                        movedItem.moveBefore(rightItem);
                    } else {
                        leftId = $movedItem.prev().find('.item').data('wix-item-id');
                        leftIndex = that.getItemIndexByID(leftId);
                        leftItem = collection.items[leftIndex];
                        //console.log('leftId: %d, leftIndex: %d, leftTitle', leftId, leftIndex, leftItem.publicProperties.title);
                        movedItem.moveAfter(leftItem);
                    }

                }
            });
        };

        that.removeSlide = function () {
            if (_.isUndefined(selectedItem)) return;

            selectedItem.delete().then(function (result) {
                that.saveCollection(function (col) {
                    console.log('removed item');
                    that.renderSlides();
                    that.editFirstSlide();
                    console.log('going to refresh the app');
                    Wix.Settings.refreshApp();
                });
            });
        };

        that.addSlide = function () {
            var colItem = {
                title: 'some title',
                type: 'videoGallery',
                publicProperties: defaultSlide
            };

            // save to storage
            colItem = new $cll.Item(collection, colItem);
            //colItem.moveToStart();
            colItem.save().then(function (result) {
                console.log('collection item saved: ', result);
                console.log('collection we got: ', collection);

                collection.publish();
                that.renderSlides();
                that.makeEditable(colItem.id);

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
                that.renderSlides();
                that.makeEditable(selectedItem.id);
                console.log('going to refresh APP');
                Wix.Settings.refreshApp();

            }, function (error) {
                console.error('item collection save error', error);
            });

            console.log(selectedItem);
        };

        that.makeEditable = function (id) {

            if (collection.items.length) {
                $('.edit-form').show();
            } else {
                console.log('hide form');
                $('.edit-form').hide();
                return;
            }

            var ind,
                pubProp;

            if (_.isUndefined(id)) id = collection.items[0].id;

            ind = that.getItemIndexByID(id);

            if (_.isUndefined(collection.items[ind])) return;

            selectedItem = collection.items[ind];
            pubProp = selectedItem.publicProperties;


            Wix.UI.set('title', pubProp.title);
            Wix.UI.set('desc', pubProp.sub_title);
            Wix.UI.set('mDesc', pubProp.small_sub_title);
            Wix.UI.set('bName', pubProp.button_caption);
            Wix.UI.set('vUrl', pubProp.first_button_href);
            Wix.UI.set('eUrl', pubProp.second_button_href);
            $('.inputWrap.title input').focus();
            $('.wrapAdmin .right .image').html('').html('<div class="wrap-slide-prev"><span>Click to Replace Image</span><img id="slide-preview" src="' + pubProp.src_small_img + '"></div');
            $slideContainer.find('.item').removeClass('adm-active-item');
            $slideContainer.find('[data-wix-item-id="'+id+'"]').addClass('adm-active-item');

            $('#slide-preview, .wrap-slide-prev span').on('click', function () {
                Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function (data) {
                    if (!_.isEmpty(data)) {
                        var BASE_URL, image, proc1, proc2;

                        BASE_URL = Wix.Utils.Media.getImageUrl(data.relativeUri);
                        image = wixmedia.WixImage(BASE_URL, "", "file." + data.relativeUri.split('.')[1]);
                        proc1 = image.fill().w(1920).h(816);
                        proc2 = image.fill().w(321).h(200);
                        selectedItem.publicProperties.src_big_img = proc1.toUrl();
                        selectedItem.publicProperties.src_small_img = proc2.toUrl();
                        that.saveSelectedItem();
                        that.makeEditable(id);
                    }
                });
            });
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
        Wix.UI.set('autoPlay', gMan.getParameter('autoPlay', 4));

        gMan.init(function (col) {
        });
    }

    $(document).ready(function () {
        initSettings();
    });


})
(jQuery);

