(function($) {

	$( document ).ready(function() {
		$.get('/gallery/views/setting-tab.html', function(result) {
			var html = $(result).html();
			var tpl = _.template(html);
			$('.app-settings').html(tpl({

			}));

			gallerySettings();
		});


	});

	function gallerySettings() {
		Wix.UI.initialize({});

		Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
			console.log('dddddddd');
		});

		// WRITE YOUR CODE HERE>>>
	};
 

})(jQuery);

