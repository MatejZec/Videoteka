<?php
include "connection.php";
header('Access-Control-Allow-Origin: *');


$sQuery2 = "UPDATE filmovi SET naziv='".$_POST['naziv_filma']."', opis='".$_POST['opis']."', godina_izlaska='".$_POST['godina_izlaska']."', trajanje='".$_POST['trajanje']."', poster='".$_POST['poster']."' WHERE film_id=".$_POST['Id'];

$Result2 = $oConnection->query($sQuery2);



$sQuery1 = "INSERT into tagovi (film_id, zanr_id) VALUES (".$_POST['Id'].",".$_POST['zanr_id'].")";

$Result1 = $oConnection->query($sQuery1);
//$ListaZanrova = $_POST['obj_zanr'];
//echo json_encode($ListaZanrova);
/*foreach($rp as $i => $i_value) {
    $sQuery = "INSERT INTO tagovi (film_id, zanr_id) values(".$_POST['Id'].", $i_value->value)";
    echo $sQquery;
    $Result = $oConnection->query($sQuery);
}*/

?>