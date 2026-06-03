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
import Button from '../components/Button';

const MapMunicipal: React.FC = () => {

    const [panelVisible, setPanelVisible] = useState(true);

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

                    <div className="mapa-container-map">

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

                                </div>

                            </TransformComponent>

                        </TransformWrapper>

                    </div>

                </IonContent>

            </IonPage>

            {panelVisible && (

                <div className="panel-info-map-muni">

                    <h2>
                        Munipalidades Optimas
                    </h2>

                    <p>
                        Más Rapida: municipalidad_rapida | tiempo
                    </p>

                    <p>
                        Más Cercana: municipalidad_cercana | tiempo
                    </p>

                    <p>
                        Más Congestionada: municipalidad_congestionada | tiempo
                    </p>

                    <Button
                            texto="Agendar Examen"
                            ancho="95%"
                            background="#420991"
                            textColor="black"
                            routerLink="/agendar-examen-r"
                            onClick={() => setPanelVisible(false)}
                        />

                </div>

            )}

        </>

    );
};

export default MapMunicipal;