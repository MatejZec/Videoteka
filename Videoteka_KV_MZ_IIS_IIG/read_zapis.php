<?php


header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT zapisi.akcija, gledatelji.ime, gledatelji.prezime, filmovi.naziv, zapisi.vrijeme_izdavanja, zapisi.vrijeme_povratka
FROM zapisi INNER JOIN filmovi ON zapisi.film_id = filmovi.film_id 
INNER JOIN gledatelji ON zapisi.gledatelj_id = gledatelji.oib;";
$oRecord = $oConnection->query($sQuery);
$oZapisi = array();
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{
    $akcija = $oRow['akcija'];
    $ime = $oRow['ime'];
    $prezime = $oRow['prezime'];
    $naziv = $oRow['naziv'];
    $vrijeme_izdavanja = $oRow['vrijeme_izdavanja'];
    $vrijeme_povrata = $oRow['vrijeme_povratka'];
    
    //echo $opis;
    //echo $godina_izlaska;
    //echo $film_id;
    
    $oZapis = new Zapis($akcija, $ime, $prezime, $naziv, $vrijeme_izdavanja, $vrijeme_povrata);
    //echo json_encode($oFilm);
    array_push($oZapisi, $oZapis);
}
echo json_encode($oZapisi);



?>