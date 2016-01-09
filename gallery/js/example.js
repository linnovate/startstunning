(function() {
  window.Example = angular.module('Example', []);

  window.Example.controller('example', function($scope) {
    var addLoader, loadCollections, showError, updateModel;
    $scope.collections = $cll;
    $scope.items = [];
    $scope.isLoading = true;
    $cll.initializeAngular($scope);
    addLoader = function(promise) {
      $scope.isLoading = true;
      return promise.always(function() {
        return $scope.isLoading = false;
      });
    };
    $cll.on(['any'], addLoader);
    $cll.Collection.on(['any'], addLoader);
    $cll.ItemsList.on(['any'], addLoader);
    $cll.Item.on(['any'], addLoader);
    showError = function(text) {
      $scope.error = text;
      return setTimeout(function() {
        if ($scope.error === text) {
          $scope.error = null;
        }
        return $scope.$apply();
      }, 2000);
    };
    $cll.Collection.on(['any'], function(promise, event) {
      return promise.fail(function() {
        return showError("Collection " + event.name + " failed");
      });
    });
    $cll.Item.on(['any'], function(promise, event) {
      return promise.fail(function() {
        return showError("Item " + event.name + " failed");
      });
    });
    $cll.ItemsList.on(['any'], function(promise, event) {
      return promise.fail(function() {
        return showError("Items " + event.name + " failed");
      });
    });
    loadCollections = function() {
      return $cll.getAll().then(function(collections) {
        if (collections.length) {
          if (!$scope.selectedCollection || collections.length === 1) {
            return $scope.selectCollection(collections[0]);
          } else {
            return _.find(collections, function(cll) {
              return cll.id === $scope.selectCollection.id;
            });
          }
        }
      });
    };
    $scope.selectCollection = function(collection) {
      $scope.selectedCollection = collection;
      return $scope.selectedItems = [];
    };
    $scope.selectedItems = [];
    $scope.selectItem = function(item) {
      var removedItems;
      removedItems = _.remove($scope.selectedItems, function(i) {
        return i === item;
      });
      if (!removedItems.length) {
        return $scope.selectedItems.push(item);
      }
    };
    $scope.isSelectedItem = function(item) {
      return !!_.find($scope.selectedItems, function(i) {
        return i === item;
      });
    };
    $scope.createCollection = function() {
      var collection;
      return collection = new $cll.Collection({
        title: 'new collection',
        items: [
          {
            title: '111'
          }, {
            title: '222'
          }
        ]
      });
    };
    $scope.createItem = function() {
      var item;
      return item = new $cll.Item($scope.selectedCollection, {
        title: 'new item'
      });
    };
    $scope.addItemToStart = function() {
      var item;
      item = new $cll.Item($scope.selectedCollection, {
        title: 'new item'
      });
      return item.moveToStart();
    };
    $scope.addItemToEnd = function() {
      var item;
      item = new $cll.Item($scope.selectedCollection, {
        title: 'new item'
      });
      return item.moveToEnd();
    };
    $scope.addItemBeforeSelected = function() {
      var item;
      item = new $cll.Item($scope.selectedCollection, {
        title: 'new item'
      });
      return item.moveBefore(_.last($scope.selectedItems));
    };
    $scope.addItemAfterSelected = function() {
      var item;
      item = new $cll.Item($scope.selectedCollection, {
        title: 'new item'
      });
      return item.moveAfter(_.last($scope.selectedItems));
    };
    $scope.deleteCollection = function(collection) {
      return collection["delete"]().then(function() {
        var _ref;
        if (((_ref = $scope.selectedCollection) != null ? _ref.id : void 0) === collection.id) {
          $scope.selectCollection(null);
          return $scope.selectedItems = [];
        }
      });
    };
    $scope.deleteItem = function(item) {
      return item["delete"]().then(function() {
        return $scope.selectedItems = [];
      });
    };
    updateModel = function(model, textData) {
      var data;
      try {
        data = JSON.parse(textData);
        _.each(data, function(value, key) {
          if (model[key] != null) {
            model[key] = value;
          }
        });
        return true;
      } catch (_error) {
        showError('JSON is invalid');
        return false;
      }
    };
    $scope.toEditableModelData = function(model) {
      return JSON.stringify({
        title: model.title,
        tags: model.tags,
        type: model.type,
        thumbnailUrl: model.thumbnailUrl,
        uniquePerUser: model.uniquePerUser,
        privateProperties: model.privateProperties,
        publicProperties: model.publicProperties
      });
    };
    $scope.saveCollectionData = function(collection, newData) {
      if (!updateModel(collection, newData)) {
        return false;
      }
      return collection.save();
    };
    $scope.updateCollection = function(collection) {
      if (!updateModel(collection, '{"title": "updatedCollection", "tags": ["test", "js"], "public_properties": {"author": "wix"}}')) {
        return false;
      }
      return collection.update({
        title: 'updatedCollection',
        tags: ['test', 'js'],
        public_properties: {
          author: 'wix'
        }
      });
    };
    $scope.saveItemData = function(item, newData) {
      if (!updateModel(item, newData)) {
        return false;
      }
      return item.save();
    };
    $scope.moveItemToStart = function(item) {
      return item.moveToStart();
    };
    $scope.moveItemToEnd = function(item) {
      return item.moveToEnd();
    };
    $scope.moveItemBeforeSelected = function(item) {
      return item.moveBefore(_.last($scope.selectedItems));
    };
    $scope.moveItemAfterSelected = function(item) {
      return item.moveAfter(_.last($scope.selectedItems));
    };
    $scope.saveSelectedItems = function() {
      return $scope.selectedCollection.items.save($scope.selectedItems);
    };
    $scope.moveToStartSelectedItems = function() {
      return $scope.selectedCollection.items.moveToStart($scope.selectedItems);
    };
    $scope.moveToEndSelectedItems = function() {
      return $scope.selectedCollection.items.moveToEnd($scope.selectedItems);
    };
    $scope.moveBeforeSelectedItems = function() {
      return $scope.selectedCollection.items.moveBefore($scope.selectedItems, _.last($scope.selectedItems));
    };
    $scope.moveAfterSelectedItems = function() {
      return $scope.selectedCollection.items.moveAfter($scope.selectedItems, _.last($scope.selectedItems));
    };
    $scope.deleteSelectedItems = function() {
      return $scope.selectedCollection.items["delete"]($scope.selectedItems).then(function() {
        return $scope.selectedItems = [];
      });
    };

    // Alexander's custom code...

    $scope._deleteAll = function () {
      $cll.getAll().then(function(collections) {
        _.each(collections, function (col) {
          col.delete().then(function (result) {
            console.log('successfully deleted: ', result);
          }, function (error) {
            console.log('error while delete: ', error);
          });
          //console.log(col);
        });
      });
    };

    $scope._getFooCollection = function () {
      return new $cll.Collection({
        title: 'Bora\'s first collection',
        items: [
          {
            title: "slide 0",
            public_properties: {
              "data_ind": "0",
              "data_filmn": "Lorem ipsum dolor",
              "title_href": "http://www.google.com",
              "sub_title": "Lorem ipsum dolor dfr",
              "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
              "first_button": "first button",
              "second_button_href": "http://www.google.com",
              "second_button": "second button",
              "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
              "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/f10c2257e9764e7291b31d0d0003bd5c/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
              "small_sub_title": "small sub title text"
            }
          },
          {
            title: "#StartStunning",
            public_properties: {
              "data_ind": "2",
              "data_filmn": "Lorem ipsum dol",
              "title_href": "http://www.google.com",
              "sub_title": "Po discovered the POWER OF WIX and now he can't stop making websites",
              "first_button_href": "http://www.youtube.com/watch?v=opj24KnzrWo",
              "first_button": "Watch how it all started",
              "second_button_href": "http://www.google.com",
              "second_button": "second buttn 1",
              "src_big_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_1920,h_816,al_c,q_75/file.jpg",
              "src_small_img": "//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/69db060286af4c5cb8c73d086a6a126a/v1/fill/w_321,h_200,al_c,q_75/file.jpg",
              "small_sub_title": "small sub title text"
            }
          }
        ]
      });

    };

    $scope.saveAndPublish = function (collection) {
      collection.save().then(function (result) {
        collection.publish();
        console.log('collection: ', collection);
      }, function (error) {
        console.log('collection.save error', error);
      });
    };

    //$scope._deleteAll();

    //var fooCol = $scope._getFooCollection();
    //$scope.saveAndPublish(fooCol);
    $cll.get('bb133804-47a9-40e8-955f-6c50149467ee').then(function (collection) {
      console.log('specific collection is loaded: ', collection);
    });


    return loadCollections();
  });

  window.Example.filter('json', function() {
    return function(val) {
      if (typeof val === "function") {
        return 'function()';
      } else if (val instanceof $cll.Collection) {
        return "Collection#" + val.id;
      } else if (val instanceof $cll.Item) {
        return "Item#" + val.id;
      } else {
        return JSON.stringify(val);
      }
    };
  });

}).call(this);
