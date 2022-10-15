<?php

include 'connection.php';

class Film
{
    public $Film_Id;
    public $Film_Sifra;
    public $Naziv;
    public $Opis;
    public $Status;
    public $Godina_Izlaska;
    public $Trajanje;
    public $Poster;
   
    public function __construct($film_id, $film_sifra, $naziv, $opis, $status, $godina_izlaska, $trajanje, $poster)
    {
        $this->Film_Id = $film_id;
        $this->Film_Sifra = $film_sifra;
        $this->Naziv = $naziv;
        $this->Opis =  $opis;
        $this->Status = $status;
        $this->Godina_Izlaska = $godina_izlaska;
        $this->Trajanje = $trajanje;
        $this->Poster = $poster;

    }
}

class Zanr
{
    public $Zanr_Id;
    public $Zanr_Naziv;

    public function __construct($zanr_id, $zanr_naziv)
    {
        $this->Zanr_Id = $zanr_id;
        $this->Zanr_Naziv = $zanr_naziv;

    }

}

abstract class Osoba
{
    public $OIB;
    public $Ime;
    public $Prezime;
    public $Spol;
    public $Datum_Rod;

    public function __construct($oib, $ime, $prezime, $spol, $datum_rod)
    {
        $this->OIB = $oib;
        $this->Ime = $ime;
        $this->Prezime = $prezime;
        $this->Spol = $spol;
        $this->Datum_Rod = $datum_rod;
        
    }
}

class Gledatelj extends Osoba
{
    
}

class FilmGledatelj
{
    public $Id_Film;
    public $Id_Gledatelj;
    public $Sifra_Film;
    public $Naziv_Film;
    public $Opis_Film;
    public $Status_Film;
    public $Poster_Film;
    public $Godina_Izlaska_Film;

    public function __construct($id_film, $id_gledatelj, $sifra_film, $naziv_film, $opis_film, $status_film, $poster_film, $godina_izlaska_film)
    {
        $this->Id_Film = $id_film;
        $this->Id_Gledatelj = $id_gledatelj;
        $this->Sifra_Film = $sifra_film;
        $this->Naziv_Film =  $naziv_film;
        $this->Opis_Film = $opis_film;
        $this->Status_Film = $status_film;
        $this->Poster_Film = $poster_film;
        $this->Godina_Izlaska_Film = $godina_izlaska_film;

    }
}

class Zapis
{
    public $Akcija;
    public $Ime;
    public $Prezime;
    public $Naziv;
    public $Vrijeme_Izdavanja;
    public $Vrijeme_Povrata;

    public function __construct($akcija, $ime, $prezime, $naziv, $vrijeme_izdavanja, $vrijeme_povrata)
    {
        $this->Akcija = $akcija;
        $this->Ime = $ime;
        $this->Prezime = $prezime;
        $this->Naziv = $naziv;
        $this->Vrijeme_Izdavanja = $vrijeme_izdavanja;
        $this->Vrijeme_Povrata = $vrijeme_povrata;

    }

}

?>