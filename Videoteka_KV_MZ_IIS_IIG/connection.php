<?php

$host = '127.0.0.1:3308';
$dbname = 'zec_videoteka';
$username = 'root';
$password = '';

try
{
    $oConnection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    //echo "Connected to $dbname at $host successfully.";
}
catch (PDOException $pe)
{
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

?>