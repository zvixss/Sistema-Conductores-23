import {IonContent,
  IonPage,
  IonText,
  IonLabel
} from '@ionic/react';

import './AgendarExamenPL.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useState } from 'react';
import Button from '../components/Button';

const AgendarExamenPL: React.FC = () => {

  const [documentoResidencia, setArchivo] = useState<File | null>(null);

  return (
    <>
        <MenuLateral/>

        <IonPage id="main-content">

            <ToolbarHome/>

            <IonContent fullscreen className="fondo">

                <div className="container-agendar-pl">

                    <div className="panel-agendar-pl">

                        <IonText className="titulo-agendar-pl">
                            Agendar Examen
                        </IonText>

                        <IonText className="text-agendar-pl">
                            Como es su primera licencia, debe realizar el examen en la municipalidad de su comuna.
                        </IonText>

                        <IonText className="text-agendar-pl">
                            Municopalidad de ... ubicada en ... horarios de atención ...
                        </IonText>

                        <IonText className="text-agendar-pl">
                            Para agendar debe presentar un documento de residencia válido. Por favor, suba su documento de residencia a continuación:
                        </IonText>

                        <label className="file-input-agendar-pl">

                            <input
                                type="file"

                                onChange={(e) => {

                                    const documentoResidencia = e.target.files?.[0];

                                    if (documentoResidencia) {

                                        setArchivo(documentoResidencia);

                                    }

                                }}

                            />

                        </label>

                        <Button
                            texto="Subir Documento"
                            ancho="200px"
                            background="#420991"
                            textColor="black"
                            routerLink="/agendar-examen-r"
                        />

                    </div>
                    
                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamenPL;