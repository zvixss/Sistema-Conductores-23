import {IonContent,
  IonPage,
} from '@ionic/react';

import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import mapa from '../assets/images/mapa.png';

import './Map.css';
import ToolbarHome from '../components/ToolbarHome';
import MenuLateral from '../components/MenuLateral';

const Map: React.FC = () => {

    return (

        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="mapa-container-map">

                        <TransformWrapper

                            initialScale={1}

                            minScale={0.5}

                            maxScale={4}

                            wheel={{ step: 0.2 }}
                        >

                            <TransformComponent>

                                <div className="mapa-wrapper-map">

                                    <img
                                        src={mapa}
                                        alt="Mapa"
                                        className="mapa-imagen-map"
                                    />

                                    <button className="punto-map punto1-map">
                                        o
                                    </button>

                                </div>

                            </TransformComponent>

                        </TransformWrapper>

                    </div>

                </IonContent>

            </IonPage>

        </>

    );
};

export default Map;