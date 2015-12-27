<?php 

class WixVideo extends WixMedia {

	private $STATUS = array(
		'inqueue' 		=> 'IN-QUEUE',
		'inprogress' 	=> 'INPROGRESS',
		'ready'			=> 'READY',
		'failed' 		=> 'FAILED'
	);

	public function __construct($object_id = '', $service_host, $client) {
		$this->service_host = $service_host;

		parent::__construct($object_id, $client);
	}

	public function getUrl() {
		// return sprintf("http://%s/%s", $this->service_host, $this->id);
	}

	public function isReady() {
		$meta = $this->getMetadata();
		return isset($meta->op_status) && $meta->op_status == $this->STATUS['ready'];
	}

}
