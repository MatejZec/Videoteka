import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { MDBBtn } from 'mdb-react-ui-kit';
import { Outlet, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    color: blue;
    opacity: 0.8;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;


const FilmDodatniPodaci = (props) => {
  const [FilmInfo, setFilmInfo] = useState();
  const { odabraniFilm } = props;
  const { odabraniFilmSifra } = props;
  console.log(FilmInfo);
  console.log(odabraniFilmSifra);
  const [iznajmljen, setIznajmljen ] = useState('');
  console.log(iznajmljen);
 
  const [fposter, setFposter] = useState();


  /*FilmInfo.map((fi) => {

    setFposter(fi.Poster)
    
})*/

    const [Zanrovi, setZanrovi] = useState([]);
    /*useEffect(() => {
        getZanrovi();
    },[]);

    async function getZanrovi()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/get_Zanrovi.php?Id=${odabraniFilm}`).then((response) =>
            {
              setZanrovi(response.data);
            });
            
        }
        catch(error)
        {
            
        }
    }*/

function getStatus(index) {

 /* setIznajmljen(index);*/

  if (index==0)
    return 'Nedostupan';
  else
    return 'Dostupan'  
}

/*FilmInfo?.length ? (
  FilmInfo.map((film, index) => (
    setFposter(film.Poster)
  ))
) : (
  console.log("plss!")
)*/

/*useEffect(() => {
  Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/get_Zanrovi.php?Id=${odabraniFilmSifra}` ).then((response) => setFilmInfo(response.data));
  
}, [odabraniFilmSifra]);*/


  useEffect(() => {
    Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/read_specific_film.php?Id=${odabraniFilm}` ).then((response) => setFilmInfo(response.data));
    Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/get_Zanrovi.php?Id=${odabraniFilm}` ).then((response) => setZanrovi(response.data));
    
  }, [odabraniFilm]);


  async function deleteConfirm(id)
  {

      
        try 
        {    
            
            if(window.confirm("Are you sure?"))
            { 
              
              
                
                  const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/query.php"
                  Axios({
                      method: "post",url: readUrl,data: {"Id":id,"json":"Obrisi"},headers: { "Content-Type": "multipart/form-data" },})
                      .then(function (response) {console.log(response);})
                      .catch(function (response) {console.log(response);});
                      /*setArtikli([]);
                      getArtikli();*/
                
                window.location.reload();
            }
                
        } 
        catch (error) {
            
        }
    }

  return (

      FilmInfo?.length ? (
          FilmInfo.map((film) => (
              
            <Container>

              <CoverImage src={film.Poster} />
              <InfoColumn>
              
                <MovieName>
                {film.Naziv}
                </MovieName>
                <MovieInfo>
                  Šifra: {film.Film_Sifra}
                </MovieInfo>
                <MovieInfo>
                  Opis: {film.Opis}
                </MovieInfo>
                <MovieInfo>
                  Godina Izlaska: {film.Godina_Izlaska}.
                </MovieInfo>
                <MovieInfo>
                  Trajanje: {film.Trajanje}
                </MovieInfo>
                <MovieInfo>
                  Status: {getStatus(film.Status)}
                </MovieInfo>
                <MovieInfo>
                  Žanr: {Zanrovi.map((z, index) => {

                          return(
                              <span>{z.Zanr_Naziv + " "}</span>
                          );

                  })}
                </MovieInfo>
                <MovieInfo>
                  <Link to={`/Edit/${odabraniFilm}`} className="btn btn-outline-primary">Ažuriraj</Link>
                 {film.Status==1?
                 <MDBBtn className='mx-2' color='dark'onClick={() => deleteConfirm(odabraniFilm)}>Obriši</MDBBtn>
               :<MDBBtn className='mx-2' disabled color='dark'onClick={() => deleteConfirm(odabraniFilm)}>Obriši</MDBBtn>}
                </MovieInfo>
              </InfoColumn>
              <Close onClick={() => props.onFilmSelect()}>X</Close>
            </Container>
          ))
        ) : (
          console.log("nema filma!")
        )

     
      
    
  );
};
export default FilmDodatniPodaci;