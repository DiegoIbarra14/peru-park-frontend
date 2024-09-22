import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageProveedores from "../Page/Proveedores/PageProveedores";
import PageMateriasPrimas from "../Page/MateriasPrimas/PageMateriasPrimas";
import PageMaquinas from "../Page/Maquinas/PageMaquinas";
import PageClientes from "../Page/Clientes/PageClientes";
import PageTrabajadores from "../Page/Trabajadores/PageTrabajadores";
import PageProduccion from "../Page/Produccion/PageProduccion";
import { PageReprocesamiento } from "../Page/Reprocesamiento/PageReprocesamiento";
import PageListProducto from "../Page/Producto/PageListProducto";
import ProveedorProvider from '../Page/Proveedores/context/ProveedorProvider';
import PageRoles from "../Page/Roles/Roles";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import "../Components/Sidebar/Sidebar.css";



function Auth() {
  return (
    <div className="auth-layout">
     
      <div className="auth-main">
        
        <div className="auth-content pl-5">
          <Routes>
            <Route path={"/"} element={<Navigate to="/locales" />} />
            <Route path={"/locales"} element={<PageReprocesamiento />} />
            <Route path={"/espacios"} element={<PageClientes />} />
            <Route path={"/ganancias"} element={<PageRoles />} />
            <Route path={"/alquileres"} element={<PageTrabajadores />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Auth;