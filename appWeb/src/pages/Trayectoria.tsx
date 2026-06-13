import {
    IonContent,
    IonPage,
    IonText,
    IonButton,
    IonActionSheet,
    IonAlert,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput
} from '@ionic/react';

import './Trayectoria.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';

const Trayectoria: React.FC = () => {
    const [examenes, setExamenes] = useState<any[]>([]);
    const [licencias, setLicencias] = useState<any[]>([]);

    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    const [showReprogramarModal, setShowReprogramarModal] = useState(false);
    const [examenSeleccionado, setExamenSeleccionado] = useState<number | null>(null);

    const [nuevaFecha, setNuevaFecha] = useState("");
    const [nuevaHora, setNuevaHora] = useState("");

    const hoy = new Date().toISOString().split('T')[0];

    useEffect(() => {
        cargarTrayectoria();
    }, []);

    const cargarTrayectoria = async () => {
        const token = localStorage.getItem("token");
        const respuesta = await fetch("http://localhost:3000/api/trayectoria", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await respuesta.json();
        setExamenes(data.examenes);
        setLicencias(data.licencias);
    };

    const abrirGestion = (examen: any) => {
        setExamenSeleccionado(examen.id);
        const fechaCorta = examen.fecha.substring(0, 10);
        setNuevaFecha(fechaCorta);
        setNuevaHora(examen.hora);
        setShowActionSheet(true);
    };

    const confirmarCancelacion = async () => {
        if (examenSeleccionado === null) return;

        const token = localStorage.getItem("token");
        
        try {
            const respuesta = await fetch(`http://localhost:3000/api/examenes/cancelar/${examenSeleccionado}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (respuesta.ok) {
                setShowCancelAlert(false);
                setShowActionSheet(false);
                setExamenSeleccionado(null);
                cargarTrayectoria();
            } else {
                const errorData = await respuesta.json();
                alert(`Error al cancelar: ${errorData.mensaje}`);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor para cancelar.");
        }
    };

    const guardarReprogramacion = async () => {
        if (!nuevaFecha || !nuevaHora) {
            alert("Debes seleccionar una nueva fecha y hora.");
            return;
        }

        const token = localStorage.getItem("token");
        const respuesta = await fetch(`http://localhost:3000/api/examenes/reprogramar/${examenSeleccionado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fecha: nuevaFecha, hora: nuevaHora })
        });

        if (respuesta.ok) {
            setShowReprogramarModal(false);
            setNuevaFecha("");
            setNuevaHora("");
            setExamenSeleccionado(null);
            cargarTrayectoria();
        } else {
            const errorData = await respuesta.json();
            alert(errorData.mensaje || "Error al reprogramar.");
        }
    };

    return (
        <>
            <MenuLateral />

            <IonPage id="main-content">
                <ToolbarHome />

                <IonContent fullscreen className="fondo">
                    <div className="container-trayectoria">
                        <div className="panel-trayectoria">
                            
                            <IonText className="titulo-trayectoria">Trayectoria</IonText>
                            <IonText className="texto-trayectoria">Licencias Obtenidas</IonText>

                            {licencias.length === 0 ? (
                                <p className="mensaje-vacio">El usuario no posee licencias.</p>
                            ) : (
                                licencias.map((l, index) => (
                                    <div key={index} className="card-trayectoria">
                                        <p><strong>Clase:</strong> {l.clase}</p>
                                        <p><strong>Emisión:</strong> {l.fecha_emision}</p>
                                        <p><strong>Vencimiento:</strong> {l.fecha_vencimiento}</p>
                                        <p><strong>Estado:</strong> {l.estado}</p>
                                    </div>
                                ))
                            )}

                            <hr className="separador-trayectoria" />

                            <IonText className="texto-trayectoria">Exámenes Agendados</IonText>

                            {examenes.length === 0 ? (
                                <p className="mensaje-vacio">El usuario no ha agendado exámenes.</p>
                            ) : (
                                examenes.map((e, index) => (
                                    <div key={index} className="card-trayectoria">
                                        <p><strong>Tipo:</strong> {e.tipo_examen}</p>
                                        <p><strong>Fecha:</strong> {e.fecha.substring(0, 10)}</p>
                                        <p><strong>Hora:</strong> {e.hora}</p>
                                        <p><strong>Resultado:</strong> {e.resultado || 'Pendiente'}</p>
                                        
                                        <IonButton 
                                            expand="block" 
                                            fill="outline" 
                                            color="primary"
                                            className="ion-margin-top"
                                            onClick={() => abrirGestion(e)}
                                        >
                                            Gestionar
                                        </IonButton>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <IonActionSheet
                        isOpen={showActionSheet}
                        onDidDismiss={() => setShowActionSheet(false)}
                        header="¿Qué deseas hacer con esta reserva?"
                        buttons={[
                            {
                                text: 'Reprogramar Examen',
                                handler: () => setShowReprogramarModal(true)
                            },
                            {
                                text: 'Cancelar Reserva',
                                role: 'destructive',
                                handler: () => setShowCancelAlert(true)
                            },
                            {
                                text: 'Cerrar',
                                role: 'cancel'
                            }
                        ]}
                    />

                    <IonAlert
                        isOpen={showCancelAlert}
                        onDidDismiss={() => setShowCancelAlert(false)}
                        header="Cancelar Reserva"
                        message="¿Estás completamente seguro de que deseas cancelar este examen? Esta acción no se puede deshacer."
                        buttons={[
                            { text: 'No, mantener', role: 'cancel' },
                            { text: 'Sí, cancelar', handler: confirmarCancelacion }
                        ]}
                    />

                    <IonModal isOpen={showReprogramarModal} onDidDismiss={() => setShowReprogramarModal(false)}>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>Reprogramar Examen</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton onClick={() => setShowReprogramarModal(false)}>Cerrar</IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <IonItem>
                                <IonLabel position="stacked">Nueva Fecha</IonLabel>
                                <IonInput 
                                    type="date" 
                                    value={nuevaFecha}
                                    min={hoy}
                                    onIonChange={e => setNuevaFecha(e.detail.value!)} 
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Nueva Hora</IonLabel>
                                <IonInput 
                                    type="time" 
                                    value={nuevaHora} 
                                    onIonChange={e => setNuevaHora(e.detail.value!)} 
                                />
                            </IonItem>
                            <IonButton expand="block" className="ion-margin-top" onClick={guardarReprogramacion}>
                                Guardar Nuevo Horario
                            </IonButton>
                        </IonContent>
                    </IonModal>

                </IonContent>
            </IonPage>
        </>
    );
};

export default Trayectoria;