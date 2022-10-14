import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Outlet, Link } from "react-router-dom";

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

export default function Zapisi()
{

    const [zapisi, setZapisi] = useState([]);
    useEffect(() => {
        getZapisi();
    },[]);

    async function getZapisi()
    {
        try
        {
            const response = await Axios.get("http://localhost/Videoteka_KV_MZ_IIS_IIG/read_zapis.php").then((response) =>
            {
                setZapisi(response.data);
            });
            
        }
        catch(error)
        {
            //Console.log(error);
        }
    }


    const [query, setQuery] = useState('');

    return(
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
             <ImeTablice>Zapisi</ImeTablice>
          </Naslov>
          
          <MDBTable bordered borderColor="primary" >
          <MDBTableHead>
            <tr>
              <th scope='col'>Akcija</th>
              <th scope='col'>Ime</th>
              <th scope='col'>Prezime</th>
              <th scope='col'>Film</th>
              <th scope='col'>Izdavanje</th>
              <th scope='col'>Povrat</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {zapisi.filter((zapis)=>zapis.Prezime.includes(query)).map((zapis) => {

              return(
                  <tr>
                  <td>{zapis.Akcija}</td>
                  <td>{zapis.Ime}</td>
                  <td>{zapis.Prezime}</td>
                  <td>{zapis.Naziv}</td>
                  <td>{zapis.Vrijeme_Izdavanja}</td>
                  <td>{zapis.Vrijeme_Povrata}</td>
                
        
                  
                  </tr>
              );

            })}
            
          </MDBTableBody>
        </MDBTable>
      </Wrapper>
      
    </div>
    );

}