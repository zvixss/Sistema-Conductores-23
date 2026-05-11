import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './AgendarExamen.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';

const AgendarExamen: React.FC = () => {

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
                            Seleccione la razon por la que quiere agendar examen:
                        </IonText>

                        <div className="option-container-agendar">

                            <Button
                                texto="Primera Licencia Clase B"
                                ancho="100%"
                                background="#420991"
                                textColor='black'
                                routerLink="/agendar-examen-pl"
                            />

                            <Button
                                texto="Primera Licencia Clase C"
                                ancho="100%"
                                background="#420991"
                                textColor='black'
                                routerLink="/agendar-examen-pl"
                            />

                            <Button
                                texto="Renovación de Licencia"
                                ancho="100%"
                                background="#420991"
                                textColor='black'
                                routerLink="/agendar-examen-al"
                            />

                            <Button
                                texto="Extensión de Licencia"
                                ancho="100%"
                                background="#420991"
                                textColor='black'
                                routerLink="/agendar-examen-al"
                            />

                        </div>

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamen;