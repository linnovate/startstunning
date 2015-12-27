<?php 

require_once(__DIR__.'/inc/wixmedia-php/wix/media/WixClient.php');

$end_point = 'media.wixapps.net';
$api_key = "wix-a091529b-0151-4768-a83e-4cb899c90de2";
$secret = "d0f8172137974a83a27bfaf00af7da20";

$client = new WixClient($api_key, $secret);
$req_base64 = $_REQUEST['base64'];
if (empty($req_base64)) die('no base64 string is provided');

$ini_val = ini_get('upload_tmp_dir');
$upload_tmp_dir = $ini_val ? $ini_val : sys_get_temp_dir();

$base64 = explode(',', $req_base64);
$file = $upload_tmp_dir . '/'. uniqid() . '.'.get_string_between($base64[0], '/', ';');
$success = file_put_contents($file, base64_decode($base64[1]));

$image = $client->uploadImage($file);

if (!empty($image)) {
	$meta = (array)$image->getMetadata();
	$url = $image->fit($meta['width'], $meta['height'])->getUrl();
	echo json_encode($meta + array('url' => $url));
}

unlink($file);

function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}