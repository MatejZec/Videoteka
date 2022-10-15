<?php

include "connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: PUT');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods');
if(isset($_POST['json']))
{
    switch ($_POST['json'])
    {
        case 'addGledatelj':
            $query = "INSERT INTO gledatelji (oib, ime, prezime, spol, datum_rod) 
            VALUES ('".$_POST['id']."', '".$_POST['ime']."', '".$_POST['prezime']."', '".$_POST['spol']."', STR_TO_DATE('".$_POST['dat_rod']."', '%e-%c-%Y'))";
            echo $query;
            $result = $oConnection->query($query);    

            break;

        case 'povratFilma' :
            $sQuery = "UPDATE zapisi SET film_id=".$_POST['Id'].", gledatelj_id='".$_POST['gledatelj_id']."', akcija='Povrat', vrijeme_povratka=NOW() WHERE film_id=".$_POST['Id'];
            echo $sQquery;
            $Result = $oConnection->query($sQuery);
            
            $sQuery2 = "UPDATE filmovi SET `status`=1 WHERE film_id=".$_POST['Id'];
            $Result2 = $oConnection->query($sQuery2);   
            break; 
        case 'addFilm':
            $query = "INSERT INTO filmovi (film_sifra, naziv, opis, `status`, godina_izlaska, trajanje, poster) 
            VALUES ('".$_POST['sifra']."', '".$_POST['naziv']."', '".$_POST['opis']."', true, '".$_POST['god']."','".$_POST['trajanje']."','".$_POST['poster']."')";
            echo $query;
            $result = $oConnection->query($query);
            break;   
        case 'Obrisi':
            $query = "DELETE FROM filmovi WHERE film_id=".$_POST['Id'];
            echo $query;
            $result = $oConnection->query($query);
            break;
        case 'updateGledatelj':  
            $sQuery2 = "UPDATE gledatelji SET oib='".$_POST['Id']."', ime='".$_POST['ime']."',prezime='".$_POST['prezime']."' WHERE oib=".$_POST['Id'];
            $Result2 = $oConnection->query($sQuery2);
            break;  

    }
}


?>