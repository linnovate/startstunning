var wms = require('wixmedia');

var uploader = wms.uploader('APP_KEY', 'SECRET_KEY');
uploader.audio().uploadFromFile('test1.mp3').then(function(data) {
	console.log(data.fileId());
});