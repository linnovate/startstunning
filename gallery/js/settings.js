$( document ).ready(function(){
    Wix.UI.initialize({});

    $('.images').click(function(){
        Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function(data) {   // save image data});
        })
    })

});