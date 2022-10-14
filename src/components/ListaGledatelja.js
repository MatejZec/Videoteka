/*import 'mdb-react-ui-kit/dist/css/mdb.min.css';*/
import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Outlet, Link } from "react-router-dom";
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, MDBRadio} from 'mdb-react-ui-kit';

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import hr from "date-fns/locale/hr";// the locale you want
registerLocale("hr", hr);


const readURL = "http://localhost/Videoteka_KV_MZ_IIS_IIG/read_gledatelj.php";

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
  font-weight: bold;
  
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 90px;
  vertical-align: middle;
  line-height: 90px;
  
`;

const ImeTablice = styled.h4`
  
  font-style: italic;
  font-size: 32px;
  
  
  
`;


<div class="row">
  <div class="col-sm-3">col-sm-3
  </div>
  <div class="col-sm-6">col-sm-6
  </div>
  <div class="col-sm-3">col-sm-3
  </div>
</div>

export default function ListaGledatelja()
{

  const [gledatelji, setGledatelji] = useState([]);
    useEffect(() => {
        getGledatelji();
    },[]);

    async function getGledatelji()
    {
        try
        {
            const response = await Axios.get(readURL).then((response) =>
            {
              setGledatelji(response.data);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }

    const [inputs, setInputs] = useState({});
    console.log(inputs.prezime);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      } 








       
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [startDate, setStartDate] = useState(new Date());
    const formattedDate = startDate !== null ?
    `${startDate.getDate()}-${startDate.getMonth()+1}-${startDate.getFullYear()}`:null
    console.log(formattedDate);
    
    const handleSubmit = (event) => {
      event.preventDefault();

      const readUrl = "http://localhost/Videoteka_KV_MZ_IIS_IIG/query.php";
      Axios({
          method: "post",
          url: readUrl,
          data: 
          {
              "id": inputs.id,
              "ime": inputs.ime,
              "prezime": inputs.prezime,
              "spol": inputs.inlineRadio,
              "dat_rod": formattedDate,
              "json":"addGledatelj"
              
            
              
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
          setBasicModal(false);
          setGledatelji([]);
          getGledatelji();  
          
          
          
      }  

    const [query, setQuery] = useState('');
      

    return (
      <div>
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
        
        <Wrapper>
          <Naslov>
             <ImeTablice>Lista gledatelja</ImeTablice>
            <MDBBtn className='mx-2' color='dark' onClick={toggleShow}>Dodaj</MDBBtn>
          </Naslov>
          
          <MDBTable bordered borderColor="primary" >
          <MDBTableHead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Ime</th>
              <th scope='col'>Prezime</th>
              <th scope='col'>Spol</th>
              <th scope='col'>Datum Rođenja</th>
              <th scope='col'>Dodatne opcije</th>
              <th scope='col'>Edit</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {gledatelji.filter((gledatelj)=>gledatelj.OIB.includes(query)).map((gledatelj) => {

              return(
                  <tr key = {gledatelj.OIB.toString()}>
                  <td>{gledatelj.OIB}</td>
                  <td>{gledatelj.Ime}</td>
                  <td>{gledatelj.Prezime}</td>
                  <td>{gledatelj.Spol}</td>
                  <td>{gledatelj.Datum_Rod}</td>
                  <td><Link to={`/opcije/${gledatelj.OIB}`} className="btn btn-outline-secondary">Opcije</Link></td>
                  <td><Link to={`/editG/${gledatelj.OIB}`} className="btn btn-outline-primary">Edit</Link></td>
                  
                  
                  </tr>
              );

            })}
            
          </MDBTableBody>
        </MDBTable>
      </Wrapper>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Novi Gledatelj</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              
              <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label>ID:</label>
                  <input type="text" pattern="[0-9]*" required className="form-control" 
                    onChange={handleChange}
                    name="id"
                    value={inputs.id || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>Ime:</label>
                  <input type="text" required className="form-control" 
                    onChange={handleChange}
                    name="ime"
                    value={inputs.ime || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>Prezime:</label>
                  <input type="text" required className="form-control" 
                    onChange={handleChange}
                    name="prezime"
                    value={inputs.prezime || ""} 
                  />
                  
                </div>
                <div className="form-group">
                  <label>Datum Rođenja:</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale="hr"
                  />
                  
                </div>
                <div className="form-group">
                  <label>Spol: </label>
                  <MDBRadio name='inlineRadio' id='inlineRadio1' value='Ž' label='Žensko' onChange={handleChange}/>
                  <MDBRadio name='inlineRadio' id='inlineRadio2' value='M' label='Muško' onChange={handleChange}/>
                  
                  
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
  
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
    );
}
