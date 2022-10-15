<?php


header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT * FROM zapisi INNER JOIN filmovi ON zapisi.film_id = filmovi.film_id WHERE vrijeme_povratka IS NULL AND gledatelj_id =".$_GET['Id'];
$oRecord = $oConnection->query($sQuery);
$oIzdaniFilmoviGledatelj = array();
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{
    $id_film = $oRow['film_id'];
    $id_gledatelj = $oRow['gledatelj_id'];
    $sifra_film = $oRow['film_sifra'];
    $naziv_film = $oRow['naziv'];
    $opis_film = $oRow['opis'];
    $status_film = $oRow['status'];
    $poster_film = $oRow['poster'];
    $godina_izlaska_film = $oRow['godina_izlaska'];
    
    //echo json_encode($id_film);
    $oFilmGledatelj = new FilmGledatelj($id_film,$id_gledatelj,$sifra_film,$naziv_film,$opis_film,$status_film,$poster_film,$godina_izlaska_film);
    //echo json_encode($oFilm);
    array_push($oIzdaniFilmoviGledatelj, $oFilmGledatelj);
}
echo json_encode($oIzdaniFilmoviGledatelj);



?>