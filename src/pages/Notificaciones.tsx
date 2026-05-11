import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './Notificaciones.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';

const Notificaciones: React.FC = () => {

    const notificaciones = [

        {
            titulo: "Examen agendado",
            cuerpo: "Usted el día 7 de enero ha agendado un examen para el 24 de febrero a las 10:00",
            fecha: "hace 5 horas",
            leido: false
        }
    ]

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

                        {notificaciones.map((notific, index) => (

                            <div
                                key={index}
                                className={`card-notific ${notific.leido ? "leido" : "no-leido"}`}
                            >

                                <div className="header-notific">

                                    <h2>{notific.titulo}</h2>

                                    <span>{notific.fecha}</span>

                                </div>

                                <p>{notific.cuerpo}</p>

                            </div>

                        ))}

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default Notificaciones;