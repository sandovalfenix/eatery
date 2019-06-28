<?php

namespace app\config;

class Request {

	private $render;
	private $array = array();

	public function getRender(){
		return $this->render;
	}
	public function setRender($render){
		$this->render = $render;
  }

  public function setVar($array){
		$this->array = $array;
  }
  public function getVar(){
		return $this->array;
	}

	public function __construct() {

		if (!empty($_GET['render'])) {
			extract($_GET);
      $this->setRender($render);

      if($_POST){
        $this->setVar($_POST);
      }
		}
	}
}
