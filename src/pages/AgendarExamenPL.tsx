import {IonContent,
  IonPage,
  IonText,
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

                <div className="container-agendar">

                    <IonText className="titulo-agendar">
                        Agendar Examen
                    </IonText>

                    <IonText className="text-agendar">
                        Como es su primera licencia, debe realizar el examen en la municipalidad de su comuna.
                    </IonText>

                    <IonText className="text-agendar">
                        Municopalidad de ... ubicada en ... horarios de atención ...
                    </IonText>

                    <IonText className="text-agendar">
                        Para agendar debe presentar un documento de residencia válido. Por favor, suba su documento de residencia a continuación:
                    </IonText>

                    <input 

                        className="file-input-agendar"
                        type="file"

                        onChange={(e) => {

                            const documentoResidencia = e.target.files?.[0];

                            if (documentoResidencia) {

                                setArchivo(documentoResidencia);

                            }

                        }}

                    />

                    <Button
                        texto="Subir Documento"
                        ancho="200px"
                        background="#420991"
                        textColor="black"
                        routerLink="/agendar-examen-r"
                    />

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamenPL;