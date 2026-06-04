import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './Trayectoria.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';

const Trayectoria: React.FC = () => {

    const [examenes, setExamenes] = useState<any[]>([]);
    const [licencias, setLicencias] = useState<any[]>([]);

    useEffect(() => {

        cargarTrayectoria();

    }, []);

    const cargarTrayectoria = async () => {

        const token = localStorage.getItem("token");

        const respuesta = await fetch(
            "http://localhost:3000/api/trayectoria",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data = await respuesta.json();

        setExamenes(data.examenes);
        setLicencias(data.licencias);

    };

    return (
        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="container-trayectoria">
                    
                        <div className="panel-trayectoria">

                            <IonText className="titulo-trayectoria">
                                Trayectoria
                            </IonText>

                            <IonText className="texto-trayectoria">
                                Licensias Obtenidas
                            </IonText>

                            {licencias.length === 0 ? (

                                <p className="mensaje-vacio">
                                    El usuario no posee licencias.
                                </p>

                            ) : (

                                licencias.map((l, index) => (

                                    <div
                                        key={index}
                                        className="card-trayectoria"
                                    >

                                        <p>
                                            <strong>Clase:</strong> {l.clase}
                                        </p>

                                        <p>
                                            <strong>Emisión:</strong> {l.fecha_emision}
                                        </p>

                                        <p>
                                            <strong>Vencimiento:</strong> {l.fecha_vencimiento}
                                        </p>

                                        <p>
                                            <strong>Estado:</strong> {l.estado}
                                        </p>

                                    </div>

                                ))

                            )}

                            <hr className="separador-trayectoria"/>

                            <IonText className="texto-trayectoria">
                                Exámenes Realizados
                            </IonText>

                            {examenes.length === 0 ? (

                                <p className="mensaje-vacio">
                                    El usuario no ha realizado exámenes.
                                </p>

                            ) : (

                                examenes.map((e, index) => (

                                    <div
                                        key={index}
                                        className="card-trayectoria"
                                    >

                                        <p>
                                            <strong>Tipo:</strong> {e.tipo_examen}
                                        </p>

                                        <p>
                                            <strong>Fecha:</strong> {e.fecha}
                                        </p>

                                        <p>
                                            <strong>Resultado:</strong> {e.resultado}
                                        </p>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                </IonContent>

            </IonPage>
        </>
  );
};

export default Trayectoria;