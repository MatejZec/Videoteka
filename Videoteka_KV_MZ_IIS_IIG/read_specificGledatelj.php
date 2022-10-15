<?php


header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT  * FROM gledatelji where oib=".$_GET['Id'];
$oRecord = $oConnection->query($sQuery);
$oGledatelji = array();
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{
    $oib = $oRow['oib'];
    $ime = $oRow['ime'];
    $prezime = $oRow['prezime'];
    $spol = $oRow['spol'];
    $datum_rod = $oRow['datum_rod'];
    
   
    $oGledatelj = new Gledatelj($oib, $ime, $prezime, $spol, $datum_rod);
    //echo json_encode($oFilm);
    array_push($oGledatelji, $oGledatelj);
}
echo json_encode($oGledatelji);



?>