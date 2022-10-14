import React from "react";
import styled from "styled-components";

const FilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const FilmName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FilmComponent = (props) => {
    const {Film_Id, Film_Sifra, Naziv, Opis, Status, Godina_Izlaska, Trajanje, Poster} = props.film;
  
    return (
      <FilmContainer onClick={()=> {props.onFilmSelect(Film_Id); props.onFilmSifraSelect(Film_Sifra); window.scrollTo({ top: 0, behavior: "smooth" });}} >
        <CoverImage src={Poster} alt={Naziv} />
        <FilmName>{Naziv}</FilmName>
      </FilmContainer>
    );
  };
  export default FilmComponent;