import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ListaGledatelja from "./components/ListaGledatelja";
import DodatneOpcije from "./components/DodatneOpcije";
import DodajNoviFilm from "./components/DodajNoviFilm";
import AzurirajFilm from './components/AzurirajFilm';
import Zapisi from './components/Zapisi';
import EditGledatelj from './components/EditGledatelj';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} ></Route>
          <Route path="/listagledatelja" element={<ListaGledatelja />} ></Route>
          <Route path="/opcije/:GledateljId" element={<DodatneOpcije />} />
          <Route path="/zapisi" element={<Zapisi />} />
          <Route path="/dodaj" element={<DodajNoviFilm />} />
          <Route path="/editG/:GledId" element={<EditGledatelj />} />
          <Route path="/edit/:EditId" element={<AzurirajFilm />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);


