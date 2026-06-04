import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './Notificaciones.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';

const Notificaciones: React.FC = () => {

    const [notificaciones, setNotificaciones] = useState<any[]>([]);

    useEffect(() => {

        cargarNotificaciones();

    }, []);

    const cargarNotificaciones = async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const respuesta =
            await fetch(
                "http://localhost:3000/api/notificaciones",
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const data = await respuesta.json();

        setNotificaciones(
            data.notificaciones
        );

    };

  return (
    <>
        <MenuLateral/>

        <IonPage id="main-content">

            <ToolbarHome/>

            <IonContent fullscreen className="fondo">

                <div className="container-notific">

                    <IonText className="titulo-notific">
                        Notificaciones
                    </IonText>

                    <div className="lista-notific">

                        {
                            notificaciones.length === 0 ? (

                                <div className="card-notific">

                                    <h3>
                                        Sin notificaciones
                                    </h3>

                                    <p>
                                        No tiene notificaciones pendientes.
                                    </p>

                                </div>

                            ) : (

                                notificaciones.map((n) => (

                                    <div
                                        key={n.id}
                                        className={`card-notific ${
                                            n.leido ? "leida" : "no-leida"
                                        }`}
                                    >

                                        <div className="header-notific">

                                            <h2>
                                                {n.titulo}
                                            </h2>

                                            <span>
                                                {new Date(
                                                    n.fecha_creacion
                                                ).toLocaleDateString()}
                                            </span>

                                        </div>

                                        <p>
                                            {n.mensaje}
                                        </p>

                                    </div>

                                ))

                            )
                        }

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default Notificaciones;