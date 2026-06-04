import {IonContent,
  IonPage,
  IonButton
} from '@ionic/react';

import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import mapa from '../assets/images/mapa.png';

import './MapMunicipal.css';

import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ToolbarHome from '../components/ToolbarHome';
import MenuLateral from '../components/MenuLateral';
import punto from '../assets/images/punto_mapa.png';
import muniImage from '../assets/images/muniValparaíso.jpg';
import pointIcon from '../assets/images/point_icon.png';
import globe from '../assets/images/globe.png';

const MapMunicpal: React.FC = () => {

    const [panelVisible, setPanelVisible] = useState(false);
    const [municipalidades, setMunicipalidades] = useState<any[]>([]);

    useEffect(() => {

        cargarMunicipalidades();

    }, []);

    const cargarMunicipalidades = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const respuesta = await fetch(
                "http://localhost:3000/api/examenes/municipalidades",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data =
                await respuesta.json();

            console.log(data);

            setMunicipalidades(data);

            const idGuardado =
                Number(
                    localStorage.getItem(
                        "municipalidadSeleccionada"
                    )
                );

            const muni = data.find(
                (m: any) =>
                m.id_municipalidad === idGuardado
            );

            if (muni) {

                setMunicipalidadSeleccionado({

                id: muni.id_municipalidad,

                nombre:
                    muni.nombre_municipalidad,

                comuna:
                    muni.comuna,

                direccion:
                    muni.direccion

            });

                setPanelVisible(true);

                
            }

        } catch (error) {

            console.log(error);

        }

    };

    const location = useLocation();

    useEffect(() => {

        setPanelVisible(false);

    }, [location]);

    const [municipalidadSeleccionado, setMunicipalidadSeleccionado] = useState({
        id: 0,
        nombre: "",
        comuna: "",
        direccion: ""
    });

    return (

        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="mapa-container-map" onClick={() => setPanelVisible(false)}>

                        <div className="tabla-municipalidades-map" onClick={(e) => e.stopPropagation()}>
                            <h3>Información Municipalidades</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="tabla-icono">📍</td>
                                        <td className="tabla-etiqueta">Más cercana:</td>
                                        <td className="tabla-valor">Viña del Mar (1.5 km)</td>
                                    </tr>
                                    <tr>
                                        <td className="tabla-icono">⚡</td>
                                        <td className="tabla-etiqueta">Más óptima:</td>
                                        <td className="tabla-valor">Valparaíso (Menor espera)</td>
                                    </tr>
                                    <tr>
                                        <td className="tabla-icono">⏳</td>
                                        <td className="tabla-etiqueta">Mayor demora:</td>
                                        <td className="tabla-valor">Quilpué (Alta demanda)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <TransformWrapper
                            initialScale={1}
                            minScale={1}
                            maxScale={2}
                            wheel={{ step: 0.2 }}
                        >

                            <TransformComponent>

                                <div className="mapa-wrapper-map">

                                    <img
                                        src={mapa}
                                        alt="Mapa"
                                        className="mapa-imagen-map"
                                    />

                                    <IonButton
                                        fill="clear"
                                        className="punto-boton-map"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setPanelVisible(true);

                                        }}
                                    >
                                        <img
                                            src={punto}
                                            alt="PuntoMapa"
                                            className="punto-map"
                                        />
                                    </IonButton>

                                </div>

                            </TransformComponent>

                        </TransformWrapper>

                    </div>

                </IonContent>

            </IonPage>

            {panelVisible && (

                <div className="panel-info-map">

                    <h2>
                        {municipalidadSeleccionado.nombre}
                    </h2>

                    <img
                        src={muniImage}
                        alt="Municipalidad"
                        className="imagen-municipalidad-map"
                    />

                    <div className="row-info-map">
                        <img src={pointIcon} alt="IconoPunto" className="icon-info-map"/>
                        <p>{municipalidadSeleccionado.direccion}</p>
                    </div>

                    <div className="row-info-map">
                        <img src={globe} alt="Globe" className="icon-info-map"/>
                        <p>{municipalidadSeleccionado.comuna}</p>
                    </div>

                    <IonButton 
                        expand="block" 

                        className="boton-seleccionar-sede"

                        onClick={() => {

                            localStorage.setItem(
                                "municipalidadId",
                                municipalidadSeleccionado.id.toString()
                            );

                            localStorage.setItem(
                                "ubicacionExamen",
                                municipalidadSeleccionado.direccion.toString()
                            );
                            
                            localStorage.setItem("tipoExamen", "Ampliación de Licencia");
                            
                            window.location.href = "/agendar-examen-f";

                        }}
                    >
                        Seleccionar esta ubicación
                    </IonButton>

                </div>

            )}

        </>

    );
};

export default MapMunicpal;