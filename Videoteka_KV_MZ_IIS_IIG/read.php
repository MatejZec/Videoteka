<?php


header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT  * FROM filmovi";
$oRecord = $oConnection->query($sQuery);
$oFilmovi = array();
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{
    $film_id = $oRow['film_id'];
    $film_sifra = $oRow['film_sifra'];
    $naziv = $oRow['naziv'];
    $opis = $oRow['opis'];
    $status = $oRow['status'];
    $godina_izlaska = $oRow['godina_izlaska'];
    $trajanje = $oRow['trajanje'];
    $poster = $oRow['poster'];
    //echo $opis;
    //echo $godina_izlaska;
    //echo $film_id;
    
    $oFilm = new Film($film_id, $film_sifra, $naziv, $opis, $status, $godina_izlaska, $trajanje, $poster);
    //echo json_encode($oFilm);
    array_push($oFilmovi, $oFilm);
}
echo json_encode($oFilmovi);



?>