import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageProveedores from "../Page/Proveedores/PageProveedores";
import PageMateriasPrimas from "../Page/MateriasPrimas/PageMateriasPrimas";
import PageMaquinas from "../Page/Maquinas/PageMaquinas";
import PageClientes from "../Page/Clientes/PageClientes";
import PageTrabajadores from "../Page/Trabajadores/PageTrabajadores";
import PageProduccion from "../Page/Produccion/PageProduccion";
import { PageReprocesamiento } from "../Page/Reprocesamiento/PageReprocesamiento";
import PageServicios from "../Page/Servicios/PageServicios";
import PageCreatePedido from "../Page/Pedids/PageCreatePedido";
import PageUpdatePedido from "../Page/Pedids/PageUpdatePedido";
import PageCreateProduccion from "../Page/Produccion/PageCreateProduccion";
import PageListProducto from "../Page/Producto/PageListProducto";
import PageCreateProducto from "../Page/Producto/PageCreateProducto";
import PageUpdateProducto from "../Page/Producto/PageUpdateProducto";
import PageLogin from "../Page/Login/PageLogin";
import PageAlmacen from "../Page/Almacen/PageAlmacen";
import PageNotFound from "../Page/NotFound/PageNotFound";
import PageTabs from "../Page/Estaditics/PageTabs";
import AuthUser from "../AuthUser";
import PagePedido from "../Page/Pedids/PagePedido";
import PageRoles from "../Page/Roles/Roles";
import PagePerfil from "../Page/Perfil/PagePerfil";
import Prueba from "../Page/AccesosDispositivos/prueba";
import PageAccesoDevices from "../Page/AccesosDispositivos/PageAccesoDevices";
import ProveedorProvider from "../Page/Proveedores/context/ProveedorProvider";
import { useSelector } from "react-redux";

function Auth() {
  const { token, deleteToken } = AuthUser();
  const routes = useSelector((state) => state.auth.accesos);
  const routeComponents = routes.map((route) => {
    switch (route.path) {
      case "/getProducciones":
        return (<>
          <Route key={route.path} path={route.path} element={<PageProduccion />} />
          <Route path={"/getProducciones/createProduccion"} element={<PageCreateProduccion />} />
        </>)
      case "/getReprocesamiento":
        return <Route key={route.path} path={route.path} element={<PageReprocesamiento />} />;
      case "/getProveedores":
        return <Route key={route.path} path={route.path} element={
          <ProveedorProvider>
            <PageProveedores />
          </ProveedorProvider>
        } />;
      case "/getMateriasPrimas":
        return <Route key={route.path} path={route.path} element={<PageMateriasPrimas />} />;
      case "/getMaquinas":
        return <Route key={route.path} path={route.path} element={<PageMaquinas />} />;
      case "/getClientes":
        return <Route key={route.path} path={route.path} element={<PageClientes />} />;
      case "/getTrabajadores":
        return <Route key={route.path} path={route.path} element={<PageTrabajadores />} />;
      case "/getProductos":
        return (<>
          <Route key={route.path} path={route.path} element={<PageListProducto />} />
          <Route key={route.path} path="/getProductos/createProducto" element={<PageCreateProducto />} />;
          <Route key={route.path} path={"/getProductos/updateProducto/:idProducto"} element={<PageUpdateProducto />} />
        </>
        )
      case "/getServicios":
        return <Route key={route.path} path={route.path} element={<PageServicios />} />;
      case "/getPedidos":
        return (
          <>
            <Route key={route.path} path={route.path} element={<PagePedido />} />
            <Route path={"/getPedidos/createPedido"} element={<PageCreatePedido />} />
            <Route path="/getPedidos/updatePedido/:idPedido" element={<PageUpdatePedido />} />
          </>
        )
      case "/getAlmacen":
        return <Route key={route.path} path={route.path} element={<PageAlmacen />} />;
      case "/estadistica":
        return <Route key={route.path} path={route.path} element={<PageTabs />} />;
      case "/PageRoles":
        return <Route key={route.path} path={route.path} element={<PageRoles />} />;
      
    
    }
  });

  const RouteElementDefault = () => {
    console.log("estoy as")
    return routes?.[0]?.path ? (
      <Navigate to={routes[0].path} />
    ) : (
      <PageNotFound />
    );
  };
  
  return (
    <>
      <div className="App">

        <Routes>
          {routeComponents}
          {/* <Route path="*" element={<PageProduccion />} exact/> */}
          <Route path="*" element={<RouteElementDefault/>} />;
          <Route path={"/miPerfil"} element={<PagePerfil />} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;
