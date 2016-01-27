<?php
    $fbAppId = '553739484792475';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wix. Get Your Own Star & Promote Your Business!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css">
    <link href="//static.parastorage.com/services/wix-public/1.163.0/css/Helvetica/fontFace.css" rel="stylesheet">
    <link href="/adgen/css/style.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
    <script src="/adgen/js/jquery-2.1.4.min.js"></script>
    <script src="/adgen/js/meme-ad.js"></script>
    <script src="/adgen/js/underscore-min.js"></script>
</head>
<body>
    <script type="text/javascript">
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '<?php echo $fbAppId ?>',
                xfbml      : true,
                version    : 'v2.5'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>



    <div class="overflow start">
        <div class="wrap">
            <div class="col-left flex col first">
            </div>

            <div class="col-center col">
                <div class="header">
                    <div class="head-frame">
                        <img src="/adgen/i/panda.png" alt="">
                    </div>
                    <h1>Get Your Own Star & Promote Your Business!</h1>
                </div>
                <div class="content">
                    <p>
                        Just in time for the Big Game! Create your own ad using cute puppies and kittens, majestic horses,
                        cheeky lizards & more.
                        When they're the star, the world pays attention.
                    </p>

                    <div class="form"></div>
                </div>
            </div>

            <div class="col-right flex col last">
            </div>
        </div>

    </div>

    <div class="share" style="display: none">
        <h1 class="share-header">Share on Facebook & Twitter!</h1>

        <div class="container">

        </div>
    </div>

    <div id="heightStage" style="display: none;"></div>

    <script>
        (function($) {
            var wixSelTypes = [],
                wixSelBusinessName = '',
                wixSelCategory = '',
                adData = new $.wixAdData(),
                wixBase = '//media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/';

            $(document).ready(function () {
                adData.init(function () {
                    $('.col-left').wixFillPictures({
                        count: 16
                    }, this);

                    $('.col-right').wixFillPictures({
                        count: 24
                    }, this);

                    $('.form').wixAdForm({}, this);
                    
                    /*$('.share .container').wixAdShare({
                        count: 9,
                        category: 'Fashion',
                        caption: 'bora rocks'
                    }, this);

                    $('.meme-wrap').wixAdPreview({
                    });

                    $('.start').hide();
                    $('.share').show();*/
                    
                });

            });

            function getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) == variable) {
                        return decodeURIComponent(pair[1]);
                    }
                }
            }

        })(jQuery);
    </script>

    <!--templates-->
    <script type="text/template" class="tpl-picture-grid">
        <% _.each(data, function(item) { %>
        <div class="square" style="background-image: url('<%- item.jpgNoLogo %>');"
             data-wix-gif="<%- item.gifNoLogo %>" data-wix-url="<%- item.jpgNoLogo %>">
        </div>
        <% }); %>
    </script>

    <script type="text/template" class="tpl-form">
        <div class="row">
            <div class="col-xs-10 col-sm-6"><input type="text" id="business-name" placeholder="Your Business Name"></div>
            <div class="col-xs-2 col-sm-6 form-first-step form-buttom">
                <button class="btn btn-flat-orange step-1" id="btn-goto-ads" disabled>GO</button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-10 col-sm-6">
                <select id="ad-category" class="hide">
                    <% _.each(data, function(catName) { %>
                    <option value="<%- catName %>"><%- catName.capitalize() %></option>
                    <% }); %>
                </select>
            </div>
            <div class="col-xs-2 col-sm-6 form-second-step form-buttom"></div>
        </div>

        <div class="image-frame">
            <img src="<%- img %>" alt=""/>
        </div>
    </script>


    <script type="text/template" class="tpl-share-items">
        <% _.each(rows, function(items) { %>
        <div class="row">
            <% _.each(items, function(item, i) { %>
            <div class="meme-col col-md-4">
                <div class="meme-wrap">
                    <div class="loader"></div>
                    <div class="meme-ad meme-animated" data-wix-ad-src="<%- item.gifLogo %>" data-wix-ad-text="<%- caption %>" data-wix-ad-slogan="<%- item.slogan %>">
                        <img rel:animated_src="<%- item.gifLogo %>">
                    </div>
                    <!--<div class="meme-ad" data-wix-ad-src="/adgen/img/no-logo/jpg/A_02_bear.jpg" data-wix-ad-text="<%- caption %>" data-wix-ad-slogan="<%- item.slogan %>">
                        <img src="/adgen/img/no-logo/jpg/A_02_bear.jpg">
                    </div>-->
                    <span class="btn-fb"></span>
                    <span class="btn-tw"></span>
                    <span class="btn-result"></span>
                </div>
            </div>
            <% }); %>
        </div>
        <% }); %>
    </script>


    <script type="text/javascript" src="//static.parastorage.com/services/js-sdk/1.61.0/js/wix.min.js"></script>
    <script src="/adgen/js/gifshot.js"></script>
    <script src="/adgen/js/libgif.js"></script>
</body>
</html>