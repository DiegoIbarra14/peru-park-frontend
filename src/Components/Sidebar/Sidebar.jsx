// src/components/sidebar/Sidebar.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Importación elementos visuales
import logo from "../../Imagenes/sipro-logo.svg";
import logoresponsive from "../../Imagenes/LogRes.png";
import { useLogout } from "../../hooks/useLogout"; // Importa el hook personalizado
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

// Íconos de cada módulo
import {
  Produccion,         // INICIO
  Proveedores,        // LOCALES
  Reprocesamiento,    // NOTIFICACIONES
  Maquinas,           // MIS ALQUILERES
} from "./index-iconos"; // Asegúrate de que estos iconos están correctamente definidos

import "primeicons/primeicons.css";
import "./sidebar.css";

const Sidebar = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { acceptLogout, rejectLogout, visibleDelete, setVisibleDelete } = useLogout(); // Usa el hook personalizado

  const handleMenuClick = (path) => {
    // Evitar la navegación si los botones están deshabilitados
    if (!buttonsDisabled && location.pathname !== path) {
      setButtonsDisabled(true); // Deshabilitar botones temporalmente
      navigate(path); // Navegar a la ruta seleccionada
      setTimeout(() => {
        setButtonsDisabled(false); // Habilitar botones después de 1 segundo
      }, 1000);
    }
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleIconClick = () => {
    onSidebarToggle();
    toggleSidebar();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setSidebarExpanded(true);
      } else {
        setSidebarExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Fond = () => (
    <svg
      width="312"
      height="202"
      viewBox="0 0 312 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 490, position: "absolute" }}
    >
      <path
        d="M0 130.944H312V158C312 182.3 292.301 202 268 202H0V130.944Z"
        fill="white"
        fillOpacity="0.3"
      />
      <path
        d="M0 126.885H312V147.85C312 172.15 292.301 191.85 268 191.85H0V126.885Z"
        fill="white"
        fillOpacity="0.7"
      />
      <path
        d="M0 130.944H312C312 152.808 294.276 170.532 272.412 170.532H0V130.944Z"
        fill="white"
      />
      <path
        d="M0 0H312V135.668C312 159.969 292.301 179.668 268 179.668H0V0Z"
        fill="white"
      />
    </svg>
  );

  // Definir los íconos correspondientes
  const listIcons = {
    "INICIO": <Produccion />,            // Asegúrate de que <Produccion /> es tu icono para INICIO
    "LOCALES": <Proveedores />,          // Asegúrate de que <Proveedores /> es tu icono para LOCALES
    "NOTIFICACIONES": <Reprocesamiento />, // Asegúrate de que <Reprocesamiento /> es tu icono para NOTIFICACIONES
    "MIS ALQUILERES": <Maquinas />,       // Asegúrate de que <Maquinas /> es tu icono para MIS ALQUILERES
  };

  return (
    <>
      {/* Botón para expandir/comprimir la Sidebar */}
      <div className="toggle-button" onClick={handleIconClick}>
        <i
          className={sidebarExpanded ? "pi pi-arrow-left" : "pi pi-arrow-right"}
          style={{
            fontSize: "20px",
            color: "#fff",
            cursor: "pointer",
          }}
        ></i>
      </div>

      {/* Logo de la Sidebar */}
      <div
        className={
          sidebarExpanded
            ? "sidebar-logo sidebar-logo-expanded"
            : "sidebar-logo sidebar-logo-compressed"
        }
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sidebarExpanded && <Fond />}
        <img
          className={
            sidebarExpanded
              ? "logo-img logo-img-expanded"
              : "logo-img logo-img-compressed"
          }
          style={{ zIndex: 900, position: "absolute", width: "180px" }}
          src={logo}
          alt="logo"
          onClick={() => navigate("/inicio")}
        />
        <img
          className={
            sidebarExpanded
              ? "logo-responsive logo-responsive-expanded"
              : "logo-responsive logo-responsive-compressed"
          }
          style={{ zIndex: 200, position: "absolute", width: "50px" }}
          src={logoresponsive}
          alt="logo"
          onClick={() => navigate("/inicio")}
        />
      </div>

      {/* Lista de Menú */}
      <div
        className={
          sidebarExpanded
            ? "sidebar-lista sidebar-lista-expanded"
            : "sidebar-lista sidebar-lista-compressed"
        }
        style={{ position: "absolute", top: 0, paddingTop: 220, bottom: 0 }}
      >
        <ul
          className={
            sidebarExpanded
              ? "sidebar-lista-ul sidebar-lista-ul-expanded"
              : "sidebar-lista-ul sidebar-lista-ul-compressed"
          }
        >
          {/* Elemento 1: INICIO */}
          <li
            style={{
              backgroundColor: location.pathname.startsWith("/inicio")
                ? "#04638A"
                : "transparent",
              color: location.pathname.startsWith("/inicio")
                ? "#fff"
                : "inherit",
              display: "flex",
              alignItems: "center",
              cursor: buttonsDisabled ? "not-allowed" : "pointer",
              pointerEvents: buttonsDisabled ? "none" : "auto",
              padding: "10px 20px",
              borderRadius: "4px",
              marginBottom: "10px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className={
              sidebarExpanded
                ? "sidebar-lista-opcion sidebar-lista-opcion-expanded"
                : "sidebar-lista-opcion2 sidebar-lista-opcion-compressed"
            }
            onClick={() => handleMenuClick("/inicio")}
          >
            {/* Icono */}
            <div style={{ marginRight: sidebarExpanded ? "10px" : "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {listIcons["INICIO"]}
            </div>
            {/* Texto */}
            {sidebarExpanded && (
              <span
                className={
                  sidebarExpanded
                    ? "sliderbar-text sliderbar-text-expanded"
                    : "sliderbar-text sliderbar-text-compressed"
                }
              >
                INICIO
              </span>
            )}
          </li>

          {/* Elemento 2: LOCALES */}
          <li
            style={{
              backgroundColor: location.pathname.startsWith("/locales")
                ? "#04638A"
                : "transparent",
              color: location.pathname.startsWith("/locales")
                ? "#fff"
                : "inherit",
              display: "flex",
              alignItems: "center",
              cursor: buttonsDisabled ? "not-allowed" : "pointer",
              pointerEvents: buttonsDisabled ? "none" : "auto",
              padding: "10px 20px",
              borderRadius: "4px",
              marginBottom: "10px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className={
              sidebarExpanded
                ? "sidebar-lista-opcion sidebar-lista-opcion-expanded"
                : "sidebar-lista-opcion2 sidebar-lista-opcion-compressed"
            }
            onClick={() => handleMenuClick("/locales")}
          >
            {/* Icono */}
            <div style={{ marginRight: sidebarExpanded ? "10px" : "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {listIcons["LOCALES"]}
            </div>
            {/* Texto */}
            {sidebarExpanded && (
              <span
                className={
                  sidebarExpanded
                    ? "sliderbar-text sliderbar-text-expanded"
                    : "sliderbar-text sliderbar-text-compressed"
                }
              >
                LOCALES
              </span>
            )}
          </li>

          {/* Elemento 3: NOTIFICACIONES */}
          <li
            style={{
              backgroundColor: location.pathname.startsWith("/notificaciones")
                ? "#04638A"
                : "transparent",
              color: location.pathname.startsWith("/notificaciones")
                ? "#fff"
                : "inherit",
              display: "flex",
              alignItems: "center",
              cursor: buttonsDisabled ? "not-allowed" : "pointer",
              pointerEvents: buttonsDisabled ? "none" : "auto",
              padding: "10px 20px",
              borderRadius: "4px",
              marginBottom: "10px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className={
              sidebarExpanded
                ? "sidebar-lista-opcion sidebar-lista-opcion-expanded"
                : "sidebar-lista-opcion2 sidebar-lista-opcion-compressed"
            }
            onClick={() => handleMenuClick("/notificaciones")}
          >
            {/* Icono */}
            <div style={{ marginRight: sidebarExpanded ? "10px" : "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {listIcons["NOTIFICACIONES"]}
            </div>
            {/* Texto */}
            {sidebarExpanded && (
              <span
                className={
                  sidebarExpanded
                    ? "sliderbar-text sliderbar-text-expanded"
                    : "sliderbar-text sliderbar-text-compressed"
                }
              >
                NOTIFICACIONES
              </span>
            )}
          </li>

          {/* Elemento 4: MIS ALQUILERES */}
          <li
            style={{
              backgroundColor: location.pathname.startsWith("/mis-alquileres")
                ? "#04638A"
                : "transparent",
              color: location.pathname.startsWith("/mis-alquileres")
                ? "#fff"
                : "inherit",
              display: "flex",
              alignItems: "center",
              cursor: buttonsDisabled ? "not-allowed" : "pointer",
              pointerEvents: buttonsDisabled ? "none" : "auto",
              padding: "10px 20px",
              borderRadius: "4px",
              marginBottom: "10px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className={
              sidebarExpanded
                ? "sidebar-lista-opcion sidebar-lista-opcion-expanded"
                : "sidebar-lista-opcion2 sidebar-lista-opcion-compressed"
            }
            onClick={() => handleMenuClick("/mis-alquileres")}
          >
            {/* Icono */}
            <div style={{ marginRight: sidebarExpanded ? "10px" : "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {listIcons["MIS ALQUILERES"]}
            </div>
            {/* Texto */}
            {sidebarExpanded && (
              <span
                className={
                  sidebarExpanded
                    ? "sliderbar-text sliderbar-text-expanded"
                    : "sliderbar-text sliderbar-text-compressed"
                }
              >
                MIS ALQUILERES
              </span>
            )}
          </li>

          {/* Botón de Cerrar Sesión */}
          <div
            className={
              sidebarExpanded
                ? "cerrar-sesion-expanded"
                : "cerrar-sesion-compressed"
            }
            style={{ marginTop: "auto", padding: "20px" }}
          >
            <Button
              icon="pi pi-sign-out"
              style={{
                backgroundColor: "transparent",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                pointerEvents: buttonsDisabled ? "none" : "auto",
                border: "none",
              }}
              className={
                sidebarExpanded
                  ? "sidebar-lista-opcion sidebar-lista-opcion-expanded items-center justify-content-center"
                  : "sidebar-lista-opcion2 sidebar-lista-opcion-compressed"
              }
              onClick={() => setVisibleDelete(true)}
            >
              {sidebarExpanded && <span className="pl-3">Cerrar sesión</span>}
            </Button>
          </div>
        </ul>
      </div>

      {/* Dialogo de Confirmación para Cerrar Sesión */}
      <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="¿Está seguro de que desea cerrar sesión?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptLogout}
        reject={rejectLogout}
      />
    </>
  );
};

export default Sidebar;
