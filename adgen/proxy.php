<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once(__DIR__.'/inc/wixmedia-php/wix/media/WixClient.php');

$end_point = 'media.wixapps.net';
$api_key = "wix-a091529b-0151-4768-a83e-4cb899c90de2";
$secret = "d0f8172137974a83a27bfaf00af7da20";

$client = new WixClient($api_key, $secret);

$res = array();

$res['upload_url'] = $client->getUploadUrl(WixClient::WIX_MEDIA_IMAGE_UPLOAD_URL);
$res['access'] = $client->getAuth()->getAuthorizationHeader();

echo json_encode($res);