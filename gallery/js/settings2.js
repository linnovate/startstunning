(function($) {

	$( document ).ready(function(){

		Wix.UI.initialize({});

        Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
        	console.log('dddddddd');
		});



	});
 

})(jQuery);

