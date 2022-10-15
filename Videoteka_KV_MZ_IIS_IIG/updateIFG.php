<?php

include "connection.php";
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');


$sQuery = "INSERT INTO zapisi (akcija, film_id, gledatelj_id, vrijeme_izdavanja, vrijeme_povratka) values('Izdavanje','".$_POST['film_id']."','".$_POST['gledatelj_id']."',NOW(),NULL)";
echo $sQquery;
$Result = $oConnection->query($sQuery);

$sQuery2 = "UPDATE filmovi SET `status`=0 WHERE film_id=".$_POST['film_id'];
$Result2 = $oConnection->query($sQuery2);
?>