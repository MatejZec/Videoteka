import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBTextArea, MDBCheckbox } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import Select from 'react-select';


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

export default function AzurirajFilm()
{
    const [inputs, setInputs] = useState({});
    console.log(inputs.godina);

    let params = useParams();
    let FilmId = params.EditId;
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [poster, setPoster] = useState('');
    const [godina_izlaska, setGodinaIzlaska] = useState('');
    const [trajanje, setTrajanje] = useState('');
    const [zanrovi, setZanrovi] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    console.log(selectedOptions);
    const navigate = useNavigate();
    
    const options = (
        zanrovi.map((z,index) => (
          { value: z.Zanr_Id, label: z.Zanr_Naziv }
        )) 
      );

      console.log(options);  
    
    const [userChoice, setUserChoice] = useState("");
    console.log(userChoice);

    useEffect(() => {
        getFilmovi(FilmId);
        getZanrovi(FilmId);
    },[]);
  
    async function getFilmovi(Id)
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/read_specific_film.php?Id=${Id}`).then((response) =>
            {
                setNaziv(response.data[0].Naziv);
                setOpis(response.data[0].Opis);
                setGodinaIzlaska(response.data[0].Godina_Izlaska);
                setTrajanje(response.data[0].Trajanje);
                setPoster(response.data[0].Poster);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }

    async function getZanrovi(Id)
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/get_allZanrovi.php`).then((response) =>
            {
                setZanrovi(response.data);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/updateFilm.php";
        Axios({
            method: "post",
            url: readUrl,
            data: 
            {
                "Id":FilmId,
                "naziv_filma":inputs.naziv || naziv,
                "opis": inputs.opis || opis,
                "trajanje":inputs.trajanje || trajanje,
                "godina_izlaska":inputs.godina || godina_izlaska,
                "poster":inputs.poster || poster,
                "zanr_id": userChoice,
                
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

    const handleChange2 = (options) => {
         setSelectedOptions(options);
      }

    return (
        <Container>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group"> 
                           
                    
                    </div>
                <div className="form-group"> 
                  <label></label>
                  <MDBInput required label='Naziv filma' id='txtnaziv' type='text' onChange={handleChange}
                    name="naziv"
                    value={inputs.naziv || naziv}  />        
                   
                </div>
                <div className="form-group"> 
                 <label></label>       
                  <MDBTextArea required label='Sinopsis' id='txtopis' rows={3} onChange={handleChange}
                    name="opis"
                    value={inputs.opis || opis}  />
                </div>
                <div className="form-group">
                 <label></label>        
                  <MDBInput required label='Trajanje' id='txttrajanje' type='text' onChange={handleChange}
                    name="trajanje"
                    value={inputs.trajanje || trajanje} />
                </div>
                <div className="form-group">  
                 <label></label>      
                  <MDBInput required label='Godina' id='txtgod' type='text' onChange={handleChange}
                    name="godina"
                    value={inputs.godina || godina_izlaska}  />
                </div>
                <div className="form-group">
                 <label></label>        
                  <MDBInput required label='URL - poster' id='txtposter' type='text' onChange={handleChange}
                    name="poster"
                    value={inputs.poster || poster}  />
                </div>
                <div className="form-group">
                 <label></label>        
                  {/*zanrovi.map((zanr, index)=>{
                    return (
                        <MDBCheckbox name='flexCheck' value={zanr.Zanr_Id} id='flexCheckDefault' label={zanr.Zanr_Naziv}
                        />
                    );
                  })*/}
                    <Select options={options} onChange={(choice) => setUserChoice(choice.value)}
                                  
                    />
                  
                </div>
                <div className="form-group">
                 <label></label>
                  <button type="submit" className="btn btn-primary mt-1 end-0">Azuriraj</button>
                </div>
              </form>     
            </Container>
    );

}