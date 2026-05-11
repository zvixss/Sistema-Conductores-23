import {IonContent,
  IonPage,
  IonText
} from '@ionic/react';

import './AgendarExamenPL.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useState } from 'react';
import Button from '../components/Button';

const AgendarExamenR: React.FC = () => {

  return (
    <>
        <MenuLateral/>

        <IonPage id="main-content">

            <ToolbarHome/>

            <IonContent fullscreen className="fondo">

                <div className="container-agendar">

                    <div className="panel-agendar">

                        <IonText className="titulo-agendar">
                            Agendar Examen Realizado
                        </IonText>

                        <IonText className="text-agendar">
                            Se ha agendado su examen de manera exitosa. Por favor, 
                            revise su correo electrónico para más detalles sobre la fecha, 
                            hora y lugar del examen. Tambien se le enviará un recordatorio 
                            a través de su correo electrónico registrado sobre la fecha, 
                            hora y lugar del examen.
                        </IonText>

                        <Button
                            texto="Finalizar Agendamiento"
                            ancho="200px"
                            background="#420991"
                            textColor="black"
                            routerLink="/home"
                        />
                    
                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamenR;