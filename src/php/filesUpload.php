<?php
  $photoURL = $_FILES['photoURL'];
  
  $path = '../../app/config/Resources/assets/img/uploads/';
  $count_img = count(glob($path.'{*.jpg,*.gif,*.png}',GLOB_BRACE));
  $i = ($count_img) ? $count_img : 1;

  $img = pathinfo($photoURL['name']);
  $nameFile = basename("img_".++$i.".".$img['extension']);
  
  $path_upload = $path . $nameFile;
  $data = array('success' => false);
  
  if(move_uploaded_file($photoURL['tmp_name'], $path_upload)){
      $data = array(
        'success' => true,
        'photoURL' =>  str_replace("../..","",$path_upload),
    );
  }
  
  echo json_encode($data);
?>