<?php

if($_POST){
	include "../../vendor/phpqrcode/qrlib.php";
	
	extract($_POST);
	
	$path_upload = "../../web/assets/img/qrcode/";

	$dirPNG = $path_upload."qr_".$id.".png";

	QRcode::png($codeContents, $dirPNG, QR_ECLEVEL_L, 15, 2);
	if(file_exists($dirPNG)){
		$data = array(
				'success' => true,
				'qrCodeURL' =>  str_replace("../..","",$dirPNG),
		);
	}else{
		$data = array(
			'success' => false,
			'qrCodeURL' =>  str_replace("../..","",$dirPNG),
		);
	}
	echo json_encode($data);
}
