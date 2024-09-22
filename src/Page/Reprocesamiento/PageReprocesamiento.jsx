import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Container from '../../Components/Container/Container';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { InputTextarea } from 'primereact/inputtextarea';
import TableProduccion from '../../Components/Produccion/TableProduccion';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './../../Components/Produccion/createProduccion.css';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser';


import { ConfirmDialog } from 'primereact/confirmdialog';
import TextTrimmer from '../../Components/General/TextTrimmer';
import ListProduccion from '../../Components/Produccion/ListProduccion';
import TableIngredientes from '../../Components/Producto/TableIngredientes';
import CreateLocal from './CreateLocal';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import auth, { db } from '../../config/firebase/firebaseinstance';


export const PageReprocesamiento = () => {

    const { http } = AuthUser();
    const toast = useRef(null);
    const showToast = (tipo, titulo, detalle) => {
        toast.current.show({
            severity: tipo,
            summary: titulo,
            detail: detalle,
            life: 3000,
        });
    };
    const [local, setLocal] = useState({
        nombre: "",
        hora_atencion: "",
        latitud: "",
        longitud: "",
        distrito: "",
        direccion: "",
        descripcion: "",
        categoria: "",
        departamento: ""
    })
    const optionsCategorias = [{
        code: "cat-eco", label: "Economico"
    },
    {
        code: "cat-24h", label: "Abierto 24h"
    },

    ]


    //constantes para mis datos
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const [materiasPrimas, setMateriasPrimas] = useState(null);
    const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);
    const [maquinas, setMaquinas] = useState(null);
    const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
    const [trabajadores, setTrabajadores] = useState([]);
    const [producciones, setProducciones] = useState(null);
    const [produccionesReproceso, setProduccionesReproceso] = useState(null);
    const [presentaciones, setPresentaciones] = useState(null);
    const [produccion, setProduccion] = useState({
        id: 0,
        codigo_produccion: "",
        costo_total: "",
        estado_produccion: "",
        fecha_produccion: "",
        observaciones: "",
        produccion_ingrediente: null,
        produccion_maquina: null,
        produccion_responsable: null,
        producto: null,
        producto_id: null,
    });

    const getAllProducciones = () => {
        http.get("/producciones/get")
            .then((response) => {
                setProducciones(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createLocal = async (local) => {
        try {
            const docRef = await addDoc(collection(db, "local"), local);
            console.log("Local creado con ID: ", docRef.id);
        } catch (e) {
            console.error("Error al agregar el local: ", e);
        }
    };

    // Función para obtener todos los locales
    const getLocales = async () => {
        const locales = [];
        const querySnapshot = await getDocs(collection(db, "locales"));
        querySnapshot.forEach((doc) => {
            locales.push({ id: doc.id, ...doc.data() });
        });
        return locales;
    };

    // Función para actualizar un local
    const updateLocal = async (id, updatedData) => {
        try {
            const localRef = doc(db, "locales", id);
            await updateDoc(localRef, updatedData);
            console.log("Local actualizado");
        } catch (e) {
            console.error("Error actualizando el local: ", e);
        }
    };

    // Función para eliminar un local
    const deleteLocal = async (auth) => {
        try {
            await deleteDoc(doc(db, "locales", id));
            console.log("Local eliminado");
        } catch (e) {
            console.error("Error al eliminar el local: ", e);
        }
    };
    //para traer presentaciones
    //funciones para observaciones
    const cleanTrabajador = () => {
        setProduccion({
            id: 0,
            tipo_documento: "",
            tipo_documento_id: "",
            numero_documento: "",
            nombres: "",
            apellidos: "",
            tipo_trabajador: null,
            tipo_trabajador_id: null,
            sueldo: "",
        });
    };
    const hideDialog = () => {
        //setSubmitted(false);
        cleanTrabajador();
        setVisibleIniciar(false);
        setVisibleObservacion(false);
    };


    //Columna Presentación
    const mostrarPresentacion = (data) => {
        return (
            <>
                {presentaciones?.map(item => {
                    if (item.id == data.producto.presentacion_id) {
                        return (
                            <p>{item.nombre}</p>
                        )
                    }
                })}
            </>
        )
    }
    // Dialog PDF
    const [visiblePDF, setVisiblePDF] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(false);
    const env = import.meta.env.VITE_APP_API_URL;
    const exportPdf = async (datos, rutaPdf) => {
        try {
            console.log(datos)
            const url = `${env}/${rutaPdf}/${datos.id}`;
            setPdfUrl(url);

        } catch (error) {
            console.log(error);
            setVisiblePDF(false);
        }

    };
    //columna Trazabilidad
    const actionTrazabilidad = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-file-pdf"
                    className="p-button-outlined p-button-rounded p-button-secondary"
                    onClick={() => exportPdf(rowData, "producciones/imprimirpdf")}
                />
            </React.Fragment>
        );
    };
    // columna aprobación de calidad pdf
    const actionPDFAprobaciónCalidad = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-file-pdf"
                    className="p-button-outlined p-button-rounded p-button-primary"
                    onClick={() => exportPdf(rowData, "produccion/pdf")}
                />
            </React.Fragment>
        );
    };
    //Columna Observaciones
    const [observacion, setObservacion] = useState([]);
    const [visibleObervacion, setVisibleObservacion] = useState(false);
    const btnObservacion = (produccion_) => {
        setProduccion(produccion_);
        setVisibleObservacion(true);
    };
    const actionBodyTemplateObservaciones = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-comment"
                    className="p-button-rounded p-button-warning "
                    onClick={() => btnObservacion(rowData)}
                />
            </React.Fragment>
        );
    };

    const handleChangeObservacion = (e) => {
        console.log(e.target.value);
        setObservacion(e.target.value);
        setProduccion({
            id: produccion.id,
            codigo_produccion: produccion.codigo_produccion,
            costo_total: produccion.costo_total,
            estado_produccion: produccion.estado_produccion,
            fecha_produccion: produccion.fecha_produccion,
            observaciones: e.target.value,
            produccion_ingrediente: produccion.produccion_ingrediente,
            produccion_maquina: produccion.produccion_maquina,
            produccion_responsable: produccion.produccion_responsable,
            producto: produccion.producto,
            producto_id: produccion.producto_id,
        });
    };
    const hideDialogEdit = () => {
        //setSubmitted(false);
        cleanTrabajador();
        setVisibleObservacion(false);
    };
    const ObservacionDialogFooterUpdate = (
        <React.Fragment>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-danger"
                onClick={() => {
                    hideDialogEdit();
                    toast.current.show({
                        severity: "info",
                        summary: "Rechazada",
                        detail: "No se realizo ninguna acción",
                        life: 3000,
                    });
                }}
            />
            <Button
                label="Guardar"
                icon="pi pi-check"
                className="p-button-success"
                onClick={() => {
                    if (observacion === null) {
                        showToast(
                            "error",
                            "Error de ingreso",
                            "Debe ingresar una observación"
                        );
                    } else {
                        console.log(observacion);
                        handleSetObservacion();
                        hideDialogEdit();
                    }
                }}
            />
        </React.Fragment>
    );

    //Columna Acciones
    const [visibleAccion, setVisibleAccion] = useState(false);
    const botonesAcciones = (data) => {
        return (
            <>
                <Button
                    icon="pi pi-play"
                    tooltip="Alistar "
                    className="p-button-rounded p-button-warning "
                    onClick={() => setVisibleAccion(true)}
                />
            </>
        )
    }
    //Columna Estado Producción
    const mostrarEstadoProduccion = () => {
        return (
            <>
                <p>Alistar Requerimientos</p>
            </>
        )
    }

    const formatValue = (value) => {
        if (value === null || value === '' || value === undefined) {
            return '---';
        }
        return value;
    };


    const [position, setPosition] = useState(null);

    // Función para capturar la ubicación clickeada en el mapa
    function LocationMarker() {
        useMapEvents({
            click(e) {
                console.log("des", e)
                setPosition(e.latlng);
                // Captura latitud y longitud
                setLocal({ ...local, "latitud": e.latlng?.lat, "longitud": e?.latlng?.lng })
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    }


    const handleChange = (e) => {
        setLocal({ ...local, [e.target.name]: e.target.value })
    }
    console.log("data", local)
    return (
        <>
            <Container url={"getReprocesamiento"}>
                <Toast ref={toast} />
                <div className="p-container-header">
                    <div className="p-container-titulo">
                        <h1 style={{ color: '#04638A' }} className="container-titulo-table">Mis Locales</h1>
                    </div>
                    <div className="container-descripcion">
                        <div className="container-descripcion-table">
                            <p>
                                A continuación, se visualiza la lista de Locales de la empresa.
                            </p>
                        </div>
                    </div>
                </div>
                <>
                    <CreateLocal visibleCreateLocal={() => { setVisibleAccion(true) }}></CreateLocal>

                </>



                {/*DIALOGS DE LAS COLUMNAS */}
                <Dialog
                    header="Lista de ingredientes"
                    visible={visiblePDF}
                    style={{ width: '50vw' }}
                    onHide={() => setVisiblePDF(false)}
                >
                    <iframe src={pdfUrl} width="100%" height="700px" title="PDF Viewer"></iframe>
                </Dialog>

                <Dialog
                    visible={visibleObervacion}
                    style={{ width: "450px" }}
                    header={<><i className="pi pi-briefcase icon-create-produccion"></i>{" "} Observaciones </>}
                    modal
                    className="p-fluid"
                    footer={ObservacionDialogFooterUpdate}
                    onHide={hideDialog}
                >
                    <div className="field">
                        <label htmlFor="observaciones">Detalles</label>
                        <InputTextarea
                            id="observaciones"
                            value={produccion.observaciones}
                            onChange={(e) => handleChangeObservacion(e)}
                            rows={3}
                            autoResize
                            required
                            autoComplete="off"
                        />
                    </div>
                </Dialog>

                <Dialog
                    style={{
                        width: "90rem",
                        height: "80%",
                        border: "2px solid #ccc",
                        borderRadius: "20px"
                    }}
                    visible={visibleAccion}
                    onHide={() => setVisibleAccion(false)}
                    header={
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <i className="pi pi-map-marker" style={{
                                    backgroundColor: "#F2F4FF",
                                    padding: "0.5rem",
                                    borderRadius: "10px",
                                    color: "#116699",
                                    fontSize: "3rem"
                                }}></i>
                                <div style={{ marginLeft: "1rem" }}>
                                    <h2 style={{ margin: 0, color: "#116699", fontWeight: "750" }}>Crear local</h2>
                                    <p style={{ margin: 0, color: "#A0A0A0", fontWeight: "600" }}>Busca tu negocio en el mapa y crea tu local.</p>
                                </div>
                            </div>
                        </div>
                    }
                    footer={
                        <div>
                            <Button
                                label="Cancelar"
                                icon="pi pi-times"
                                className="p-button-danger"
                                onClick={() => setVisibleAccion(false)}
                            />
                            <Button
                                label="Aceptar"
                                icon="pi pi-check"
                                className="p-button-success"
                                onClick={() => {
                                    console.log('Ubicación seleccionada:', local);
                                    createLocal(local)
                                }}
                            />
                        </div>
                    }
                >

                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden' }}>
                        {/* Inputs */}
                        <div style={{ flex: 1, marginRight: '20px', overflowY: 'auto' }}>
                            <div className="field flex flex-column">
                                <label htmlFor="nombre">Nombre</label>
                                <InputText name='nombre' onChange={handleChange} value={local?.nombre} />

                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="horaAtencion">Hora atención</label>
                                <InputText name='hora_atencion' onChange={handleChange} value={local?.hora_atencion} />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="latitud">Latitud</label>
                                <InputText value={local?.latitud} onChange={handleChange} name='latitud' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="longitud">Longitud</label>
                                <InputText value={local?.longitud} onChange={handleChange} name='longitud' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="latitud">Departamento</label>
                                <InputText value={local?.departamento} onChange={handleChange} name='departamento' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="latitud">Distrito</label>
                                <InputText value={local?.distrito} onChange={handleChange} name='distrito' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="direccion">Dirección</label>
                                <InputText value={local?.direccion} onChange={handleChange} name='direccion' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="descripcion">Descripción</label>
                                <InputText value={local?.descripcion} onChange={handleChange} name='descripcion' />
                            </div>
                            <div className="field flex flex-column">
                                <label htmlFor="categoria">Categoría</label>
                                <Dropdown value={local?.categoria} onChange={handleChange} name='categoria' options={optionsCategorias} optionValue='code' />
                            </div>
                        </div>
                        {/* Mapa con Leaflet */}
                        <div style={{ height: '100%', flex: 1, backgroundColor: "red" }}>
                            <MapContainer center={[-12.0464, -77.0428]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>
                    </div>
                </Dialog>

            </Container>

        </>

    )
}
