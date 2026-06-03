import {IonContent,
  IonPage,
  IonButton
} from '@ionic/react';

import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import mapa from '../assets/images/mapa.png';

import './Map.css';

import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ToolbarHome from '../components/ToolbarHome';
import MenuLateral from '../components/MenuLateral';
import punto from '../assets/images/punto_mapa.png';
import schoolImage from '../assets/images/escuela_ejemplo.png';
import pointIcon from '../assets/images/point_icon.png';
import star from '../assets/images/star.png';
import books from '../assets/images/books.png';
import globe from '../assets/images/globe.png';

const Map: React.FC = () => {

    const [panelVisible, setPanelVisible] = useState(false);

    const location = useLocation();

    useEffect(() => {

        setPanelVisible(false);

    }, [location]);

    const [escuelaSeleccionado, setEscuelaSeleccionado] = useState({
        nombre: "",
        direccion: "",
        rating: "",
        licencias: "",
        link: ""
    });

    return (

        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="mapa-container-map" onClick={() => setPanelVisible(false)}>

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

                                            setEscuelaSeleccionado({
                                                nombre: "Escuela Conductores Valparaíso",
                                                direccion: "Melgarejo 59, 2362635 Valparaíso",
                                                rating: "3.5",
                                                licencias: "Licencias B y C",
                                                link: "http://www.escuelaconductoresvalparaiso.cl/"
                                            });

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
                        {escuelaSeleccionado.nombre}
                    </h2>

                    <img
                        src={schoolImage}
                        alt="Escuela"
                        className="imagen-escuela-map"
                    />

                    <div className="row-info-map">

                        <img
                            src={pointIcon}
                            alt="IconoPunto"
                            className="icon-info-map"
                        />

                        <p>
                            {escuelaSeleccionado.direccion}
                        </p>

                    </div>

                    <div className="row-info-map">

                        <img
                        src={star}
                        alt="Star"
                        className="icon-info-map"
                        />

                        <p>
                            {escuelaSeleccionado.rating}
                        </p>

                    </div>

                    <div className="row-info-map">

                        <img
                        src={books}
                        alt="Books"
                        className="icon-info-map"
                        />

                        <p>
                            {escuelaSeleccionado.licencias}
                        </p>

                    </div>

                    <div className="row-info-map">

                        <img
                        src={globe}
                        alt="Globe"
                        className="icon-info-map"
                        />

                        <p>
                            {escuelaSeleccionado.link}
                        </p>

                    </div>

                </div>

            )}

        </>

    );
};

export default Map;