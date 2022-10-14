import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import FilmComponent from "./components/FilmComponent";
import FilmDodatniPodaci from "./components/FilmDodatniPodaci";


const readURL = "http://localhost/Videoteka_KV_MZ_IIS_IIG/read.php";


export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

const Header2 = styled.div`
  background-color: black;
  color: white;
  display: flex;

  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  
`;


function App() {
  
  const [filmovi, setFilmovi] = useState([]);
  useEffect(() => {
      getFilmovi();
  },[]);

  async function getFilmovi()
  {
      try
      {
          const response = await axios.get(readURL).then((response) =>
          {
              setFilmovi(response.data);
          });
          
      }
      catch(error)
      {
          //Console.log(error);
      }
  }

  const [odabraniFilm, onFilmSelect] = useState();
  const [odabraniFilmSifra, onFilmSifraSelect] = useState();
 
 console.log(odabraniFilm);
 

 const [query, setQuery] = useState('');
 console.log(query);
  return (
    <Container>
      <Header>
        <AppName>
          Zec Videoteka
        </AppName>
        <SearchBox>
          <SearchIcon src="search-icon.svg" />
          <SearchInput onChange = {(e) => setQuery(e.target.value) }
            placeholder="Pretraži"
            
          />
        </SearchBox>
      </Header>
      <Header2>
        <Link className='btn' to="/">Početna</Link>
        <Link className='btn' to="/listagledatelja">Lista Gledatelja</Link>
        <Link className='btn' to="/zapisi">Zapisi</Link>
        <Link className='btn' to="/dodaj">Dodaj Film</Link>
        
      </Header2>
      
     {odabraniFilm && <FilmDodatniPodaci odabraniFilm={odabraniFilm} odabraniFilmSifra={odabraniFilmSifra} onFilmSelect={onFilmSelect} onFilmSifraSelect={onFilmSifraSelect}/>}
      <MovieListContainer>
        {filmovi?.length ? (
          filmovi.filter((film)=>film.Naziv.includes(query)).map((film, index) => (
            <FilmComponent
              key={index}
              film={film}
              onFilmSelect={onFilmSelect}
              onFilmSifraSelect={onFilmSifraSelect}
             

            />
          ))
        ) : (
          console.log("nema filma!")
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;