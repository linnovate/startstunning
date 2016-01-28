<?php 
    $fbAppId = '553739484792475';
    // $fbAppId = '554825444683879';

    $aid = $_GET['case'];
    if (empty($aid)) return;
    $aid = mb_convert_encoding($aid, 'UTF-8', 'UTF-8');
    $aid = htmlentities($aid, ENT_QUOTES, 'UTF-8');

    $meta = '';
    $wixBase = 'https://media.wixapps.net/wix-a091529b-0151-4768-a83e-4cb899c90de2/images/';

    $imgUrl = $wixBase . $aid . '/file.gif';
    $meta = array();
    $meta['og:url'] = $imgUrl;
    $meta['og:image'] = $imgUrl;
    $meta['og:image:width'] = 400;
    $meta['og:image:height'] = 400;

    $meta['twitter:image'] = $imgUrl;
    $meta['twitter:url'] =  $imgUrl;
    $meta['twitter:card'] = 'summary_large_image';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta property="fb:app_id" content="<?php echo $fbAppId ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Wix StartStunning">
    <meta property="og:title" content="Get Your Own Star & Promote Your Business!">
    <meta property="og:description" content="Just in time for the Big Game! Create your own ad using cute puppies and kittens, majestic horses, cheeky lizards & more. When they're the star, the world pays attention.">
    <?php foreach ($meta as $key => $value): ?>
    <meta property="<?php echo $key; ?>" content="<?php echo $value; ?>">
    <?php endforeach ?>
    <title>Create your own cool ad with the Wix generator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css">
    <link href="//static.parastorage.com/services/wix-public/1.163.0/css/Helvetica/fontFace.css" rel="stylesheet">
</head>
<body>

    <style type="text/css">
        @font-face {
            font-family: "HelveticaNeueW01-Thin";
            src: url("/adgen/Fonts/56be84de-9d60-4089-8df0-0ea6ec786b84.eot?#iefix");
            src: url("/adgen/Fonts/56be84de-9d60-4089-8df0-0ea6ec786b84.eot?#iefix") format("eot"),
            url("/adgen/Fonts/50d35bbc-dfd4-48f1-af16-cf058f69421d.woff") format("woff"),
            url("/adgen/Fonts/278bef59-6be1-4800-b5ac-1f769ab47430.ttf") format("truetype"),
            url("/adgen/Fonts/2e309b1b-08b8-477f-bc9e-7067cf0af0b3.svg#2e309b1b-08b8-477f-bc9e-7067cf0af0b3") format("svg");
        }

        @font-face {
            font-family: "HelveticaNeueW01-45Ligh";
            src: url("/adgen/Fonts/ae1656aa-5f8f-4905-aed0-93e667bd6e4a.eot?#iefix");
            src: url("/adgen/Fonts/ae1656aa-5f8f-4905-aed0-93e667bd6e4a.eot?#iefix") format("eot"),
            url("/adgen/Fonts/530dee22-e3c1-4e9f-bf62-c31d510d9656.woff") format("woff"),
            url("/adgen/Fonts/688ab72b-4deb-4e15-a088-89166978d469.ttf") format("truetype"),
            url("/adgen/Fonts/7816f72f-f47e-4715-8cd7-960e3723846a.svg#7816f72f-f47e-4715-8cd7-960e3723846a") format("svg");
        }

        body {
            font-family: "HelveticaNeueW01-45Ligh";
        }

        h1 {
            color: #000;
            margin: 0 auto 35px;
            font: 55px/65px "HelveticaNeueW01-Thin";
            max-width: 770px;
        }

        .center {
            text-align: center;
        }

        .start-adgen {
            padding-bottom: 60px;
        }

        .start-adgen a {
            text-decoration: none;
            color: #fff;
            background-color: #459fed;
            border-radius: 20px;
            padding: 10px 15px;
            font-size: 14px;
        }

        .view img {
            width: 100%;
        }

        @media (max-width: 767px) {
            h1 {
                font: 30px/32px "HelveticaNeueW01-Thin";
                padding: 10px;
                margin: 0 auto 15px;
            }
            .start-adgen {
                padding-bottom: 25px;
            }
        }

    </style>

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

<div class="container">
    <div class="center">
        <div class="row">
            <h1>Cute, right? Create your own cool ad with the Wix generator</h1>
            <div class="start-adgen"><a href="/adgen">Click Here</a></div>
            <div class="view"><img src="<?php echo $imgUrl; ?>" alt=""></div>
        </div>
    </div>
</div>

</body>
</html>