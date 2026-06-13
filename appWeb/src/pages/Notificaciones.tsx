import { IonContent, IonPage, IonText, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
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
        const token = localStorage.getItem("token");
        const respuesta = await fetch("http://localhost:3000/api/notificaciones", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await respuesta.json();
        setNotificaciones(data.notificaciones);
    };

    const borrarNoti = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/notificaciones/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        cargarNotificaciones();
    };

    return (
        <>
            <MenuLateral />

            <IonPage id="main-content">
                <ToolbarHome />

                <IonContent fullscreen className="fondo">
                    <div className="container-notific">
                        <IonText className="titulo-notific">Notificaciones</IonText>

                        <div className="lista-notific">
                            {notificaciones.length === 0 ? (
                                <div className="card-notific">
                                    <h3>Sin notificaciones</h3>
                                    <p>No tiene notificaciones pendientes.</p>
                                </div>
                            ) : (
                                notificaciones.map((n) => (
                                    <div key={n.id} className={`card-notific ${n.leido ? "leida" : "no-leida"}`}>
                                        <div className="header-notific" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h2>{n.titulo}</h2>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '10px' }}>{new Date(n.fecha_creacion).toLocaleDateString()}</span>
                                                <IonButton fill="clear" color="danger" onClick={() => borrarNoti(n.id)} style={{ margin: 0, height: 'auto' }}>
                                                    <IonIcon icon={trashOutline} slot="icon-only" />
                                                </IonButton>
                                            </div>
                                        </div>
                                        <p>{n.mensaje}</p>
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

export default Notificaciones;