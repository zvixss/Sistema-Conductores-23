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
                            notificaciones.map((n) => (

                                <div key={n.id}>

                                    <h3>
                                        {n.titulo}
                                    </h3>

                                    <p>
                                        {n.mensaje}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default Notificaciones;