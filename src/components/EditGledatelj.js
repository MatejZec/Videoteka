import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBTextArea, MDBCheckbox } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";

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

export default function EditGledatelj()
{
    const [inputs, setInputs] = useState({});
    console.log(inputs.ime);
    let params = useParams();
    let GledId = params.GledId;
    const [id, setId] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [spol, setSpol] = useState('');
    const [dat_rod, setDat_Rod] = useState('');
    //console.log(selectedOptions);
    const navigate = useNavigate();

    useEffect(() => {
        getGledatelji(GledId);
    },[]);
  
    async function getGledatelji(GledId)
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/read_specificGledatelj.php?Id=${GledId}`).then((response) =>
            {
                setId(response.data[0].OIB);
                setIme(response.data[0].Ime);
                setPrezime(response.data[0].Prezime);
                setSpol(response.data[0].Spol);
                setDat_Rod(response.data[0].Datum_Rod);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/query.php";
        Axios({
            method: "post",
            url: readUrl,
            data: 
            {   
                "Id": inputs.id || GledId,
                "ime": inputs.ime || ime,
                "prezime": inputs.prezime || prezime,
                "json": "updateGledatelj"

                
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
           
            navigate('/listagledatelja');
        }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    
    return(
        <Container>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group"> 
                <MDBInput required label='Id' id='txtnaziv' type='text' onChange={handleChange}
                    name="id"
                    value={inputs.id || id}  />       
                    
                 </div>
                <div className="form-group"> 
                  <label></label>
                  <MDBInput required label='Ime' id='txtnaziv' type='text' onChange={handleChange}
                    name="ime"
                    value={inputs.ime || ime}  />        
                   
                </div>
                <div className="form-group"> 
                 <label></label>       
                 <MDBInput required label='Prezime' id='txtnaziv' type='text' onChange={handleChange}
                    name="prezime"
                    value={inputs.prezime || prezime}  /> 
                </div>
                <div className="form-group">
                 <label></label>        
                 <MDBInput disabled label='Spol' id='txtnaziv' type='text' onChange={handleChange}
                    name="spol"
                    value={inputs.spol || spol}  />
                </div>
                <div className="form-group">  
                 <label></label>      
                 <MDBInput disabled label='Datum rođenja' id='txtnaziv' type='text' onChange={handleChange}
                    name="dat_rod"
                    value={inputs.dat_rod || dat_rod}  />
                </div>
                
                <div className="form-group">
                 <label></label>
                  <button type="submit" className="btn btn-primary mt-1 end-0">Azuriraj</button>
                </div>
              </form>
        </Container>
    );
}