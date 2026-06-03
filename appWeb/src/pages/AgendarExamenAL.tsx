import {IonContent,
  IonPage,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import './AgendarExamenAL.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';

const AgendarExamenAL: React.FC = () => {

  const municipalidades = [
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Región Metropolitana",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
  ];

  return (
    <>
        <MenuLateral/>

        <IonPage id="main-content">

            <ToolbarHome/>

            <IonContent fullscreen className="fondo">

                <div className="container-agendar">

                    <div className="panel-agendar">

                        <IonText className="titulo-agendar">
                            Agendar Examen
                        </IonText>

                        <IonText className="text-agendar">
                            Seleccione la municipalidad donde desea realizar el examen:
                        </IonText>

                        <IonSelect className="select-agendar"
                            interface="popover"
                            placeholder="Seleccione una municipalidad"
                        >
                            {municipalidades.map((municipalidad) => (
                                <IonSelectOption key={municipalidad} value={municipalidad}>
                                    {municipalidad}
                                </IonSelectOption>
                            ))}
                        </IonSelect>

                        <Button
                            texto="Ir al mapa"
                            ancho="100%"
                            background="#D9D9D9"
                            textColor="black"
                            routerLink="/map-municipal"
                        />

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamenAL;