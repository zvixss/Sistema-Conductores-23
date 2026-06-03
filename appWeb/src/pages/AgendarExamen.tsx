import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './AgendarExamen.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';

const AgendarExamen: React.FC = () => {

    const seleccionarExamen = (
        tipo: string,
        ruta: string
    ) => {

        localStorage.setItem(
            "tipoExamen",
            tipo
        );

        window.location.href = ruta;

    };

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
                                background="#D9D9D9"
                                textColor="black"
                                ancho="45%"
                                onClick={() =>
                                    seleccionarExamen(
                                        "Primera Licencia Clase B",
                                        "/agendar-examen-pl"
                                    )
                                }
                            />

                            <Button
                                texto="Primera Licencia Clase C"
                                background="#D9D9D9"
                                textColor="black"
                                ancho="45%"
                                onClick={() =>
                                    seleccionarExamen(
                                        "Primera Licencia Clase C",
                                        "/agendar-examen-pl"
                                    )
                                }
                            />

                            <Button
                                texto="Renovación de Licencia"
                                background="#D9D9D9"
                                textColor="black"
                                ancho="45%"
                                onClick={() =>
                                    seleccionarExamen(
                                        "Renovación de Licencia",
                                        "/agendar-examen-al"
                                    )
                                }
                            />

                            <Button
                                texto="Extensión de Licencia"
                                background="#D9D9D9"
                                textColor="black"
                                ancho="45%"
                                onClick={() =>
                                    seleccionarExamen(
                                        "Extensión de Licencia",
                                        "/agendar-examen-al"
                                    )
                                }
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