import React from "react";
import {Route, useLocation, useNavigate} from "react-router-dom";
import AuthUser from "./AuthUser";
import Guest from "./Roles/guest";
import Auth from "./Roles/auth";

import 'leaflet/dist/leaflet.css';

//import logo from './logo.svg';
import "./App.css";
import { history } from "./history";
function App() {
  const {getToken} = AuthUser();
  history.location=useLocation()
  history.navigate=useNavigate()
  if(!getToken()){
    return <Guest />
  }
  return (<Auth />)
}

export default App;