import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Outlet, Link } from "react-router-dom";
import Select from 'react-select';


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

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Naslov = styled.div`
  
  font-size: 32px;
  height: 90px;
  
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 90px;
  vertical-align: middle;
  line-height: 90px;
  
`;

const Naslov2 = styled.div`
  font-style: italic;
  font-size: 32px;
  

 
  
`;


const Slicica = styled.img`
    max-width:100%;
    height: 60px;
`;

export default function DodatneOpcije()
{


    let { GledateljId } = useParams();

    const [IzdaniFilmoviGledatelja, setIzdaniFilmoviGledatelja] = useState([]);
    useEffect(() => {
        getIzdaniFilmoviGledatelja();
    },[]);

    async function getIzdaniFilmoviGledatelja()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/get_IzdaniFilmGledatelj.php?Id=${GledateljId}`).then((response) =>
            {
                setIzdaniFilmoviGledatelja(response.data);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }


    const [GledateljInfo, setGledateljInfo] = useState([]);
    useEffect(() => {
        getGledateljInfo();
    },[]);

    async function getGledateljInfo()
    {
        try
        {
            const response = await Axios.get(`http://localhost/Videoteka_KV_MZ_IIS_IIG/read_specificGledatelj.php?Id=${GledateljId}`).then((response) =>
            {
                setGledateljInfo(response.data);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }


    async function deleteConfirm(id)
    {
        try 
        {
            if(window.confirm("Are you sure?"))
            { 
            const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/query.php";
            Axios({
                method: "post",url: readUrl,data: {"Id":id, "gledatelj_id":GledateljId, "json":"povratFilma"},headers: { "Content-Type": "multipart/form-data" },})
                .then(function (response) {console.log(response);})
                .catch(function (response) {console.log(response);});
                setIzdaniFilmoviGledatelja([]);
                getIzdaniFilmoviGledatelja();
                setDostupniFilmovi([]);
                getFilmovi();
            }
                
        } 
        catch (error) {
            
        }
    }


    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);


    /*const [options, setOptions] = useState( [
      { id: 1, film: "The Matrix" },
      { id: 8, film: "Fury" }, 
      { id: 6, film: "Uncharted" },
    ] );*/

    const [DostupniFilmovi, setDostupniFilmovi] = useState([]);
  useEffect(() => {
      getFilmovi();
  },[]);

  async function getFilmovi()
  {
      try
      {
          const response = await Axios.get("http://localhost/Videoteka_KV_MZ_IIS_IIG/get_DostupniFilmovi.php").then((response) =>
          {
            setDostupniFilmovi(response.data);
          });
          
      }
      catch(error)
      {
          //Console.log(error);
      }
  }

  const options = (
    DostupniFilmovi.map((film,index) => (
      { value: film.Film_Id, label: film.Naziv + " - " + film.Godina_Izlaska }
    )) 
  );
  console.log(options);


    
   
    /*const [selectedOptions, setSelectedOptions] = useState([]);*/

    const [userChoice, setUserChoice] = useState("");
    console.log(userChoice);

    /*const [IdFilma, setIdFilma] = useState();
    selectedOptions.map((pls) => {
      setIdFilma(pls.value);
    });*/

    //console.log(IdFilma);

    const [inputs, setInputs] = useState({});
  

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      } 

    /*selectedOptions.map((pls) => {
      console.log(pls.value)
    });*/
    
    const handleSubmit = (event) => {
      event.preventDefault();

      const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/updateIFG.php";
      Axios({
          method: "post",
          url: readUrl,
          data: 
          {
              "film_id": userChoice,
              "gledatelj_id": GledateljId,
              "vrijeme_izdavanja": new Date().toLocaleString() + "",
              
              
            
              
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
          
          setIzdaniFilmoviGledatelja([]);
          getIzdaniFilmoviGledatelja();
          setDostupniFilmovi([]);
          getFilmovi();
          
      }

    const [query, setQuery] = useState('');  

    return (
        <>
         <Header>
            <AppName>
            Zec Videoteka
            </AppName>
            <SearchBox>
            
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
        
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Naslov>
              {GledateljInfo.map((ifg) => {

                  return(
            
                      <Naslov2>{ifg.Ime + " " + ifg.Prezime + " - " + "posuđeni filmovi"}</Naslov2>                     
                  );

                  })}
                <MDBBtn onClick={toggleShow}>Izdaj Novi Film</MDBBtn>
              </Naslov>
            <MDBTable bordered borderColor="primary" >
              <MDBTableHead>
                  <tr>
                  <th scope='col'>Poster</th>
                  <th scope='col'>Id</th>
                  <th scope='col'>Naziv</th>
                  <th scope='col'>Šifra</th>
                  <th scope='col'>Godina Izlaska</th>
                  <th scope='col'>Povrat Filma</th>
                  
                  </tr>
              </MDBTableHead>
              <MDBTableBody>
              {IzdaniFilmoviGledatelja?.length ? (
                IzdaniFilmoviGledatelja.filter((ifg)=>ifg.Naziv_Film.includes(query)).map((ifg) => {

                  return(
                      <tr key = {ifg.Id_Film.toString()}>
                      <td><Slicica src={ifg.Poster_Film}></Slicica></td>    
                      <td>{ifg.Id_Film}</td>
                      <td>{ifg.Naziv_Film}</td>
                      <td>{ifg.Sifra_Film}</td>
                      <td>{ifg.Godina_Izlaska_Film}</td>
                      <td><button className="btn btn-outline-danger" onClick={() => deleteConfirm(ifg.Id_Film)}>Povrat</button></td>
                      

                      
                      </tr>
                  );

              })
              ) : (<td  colSpan={6}>Nema filma</td>)}
              </MDBTableBody>
            </MDBTable>
          </div>
          <div className="col-md-2">
              
            
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Odaberite film</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                  </MDBModalHeader>

                  <MDBModalBody>
                    
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Film:</label>
                        <Select options={options} onChange={(choice) => setUserChoice(choice.value)}
                          
                          
                        />
                        {/*<select onChange={handleChange}
                        name="filmId"
                        value={inputs.filmId || ""}>
                          {options.map((option) => (
                            <option value={option.id}>{option.film}</option>
                          ))}
                          </select>*/}
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary mt-1 end-0">Dodaj</button>
                      </div>
                    </form>    
                    
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                      Zatvori
                    </MDBBtn>
                    <MDBBtn>Potvrdi</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            
          </div>
        </div>
          
      
    </>
    );
}