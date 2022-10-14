import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  
  width: 680px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  box-shadow: 0 3px 10px 0 #aaa;
  
`;

export default function DodajNoviFilm()
{

    const [inputs, setInputs] = useState({}); 
    console.log(inputs.naziv);
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/query.php";
        Axios({
            method: "post",
            url: readUrl,
            data: 
            {
                
              "sifra": inputs.sifra,
              "naziv": inputs.naziv,
              "opis": inputs.opis,
              "god": inputs.godina,
              "trajanje": inputs.trajanje,
              "poster": inputs.poster,
              "json":"addFilm"
            },
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });  
           
            navigate('/');
        }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        } 
    
        return (

            <Container>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <MDBInput required label='Šifra' id='txtsifra' type='text' onChange={handleChange}
                        name="sifra"
                        value={inputs.sifra || ""}  />        
                    
                    </div>
                <div className="form-group"> 
                  <label></label>
                  <MDBInput required label='Naziv filma' id='txtnaziv' type='text' onChange={handleChange}
                    name="naziv"
                    value={inputs.naziv || ""}  />        
                   
                </div>
                <div className="form-group"> 
                 <label></label>       
                  <MDBTextArea required label='Sinopsis' id='txtopis' rows={3} onChange={handleChange}
                    name="opis"
                    value={inputs.opis || ""}  />
                </div>
                <div className="form-group">
                 <label></label>        
                  <MDBInput required label='Trajanje' id='txttrajanje' type='text' onChange={handleChange}
                    name="trajanje"
                    value={inputs.trajanje || ""} />
                </div>
                <div className="form-group">  
                 <label></label>      
                  <MDBInput required label='Godina' id='txtgod' type='text' onChange={handleChange}
                    name="godina"
                    value={inputs.godina || ""}  />
                </div>
                <div className="form-group">
                 <label></label>        
                  <MDBInput required label='URL - poster' id='txtposter' type='text' onChange={handleChange}
                    name="poster"
                    value={inputs.poster || ""}  />
                </div>
                <div className="form-group">
                 <label></label>
                  <button type="submit" className="btn btn-primary mt-1 end-0">Dodaj</button>
                </div>
              </form>     
            </Container>

        );
}   