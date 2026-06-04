import {IonContent,
  IonPage,
  IonText,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal
} from '@ionic/react';

import './AgendarExamenF.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const AgendarExamenF: React.FC = () => {

    const [tipoExamen, setTipoExamen] = useState("Primera Licencia Clase B");
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    const [ubicacion, setUbicacion] = useState("");
    const [municipalidadId, setMunicipalidadId] = useState<number | null>(null);

    useEffect(() => {

        const cargarTodo = async () => {
            
            const tipo = localStorage.getItem("tipoExamen");
            if (tipo) {
                setTipoExamen(tipo);
            }

            const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
            const idMuni = localStorage.getItem("municipalidadId");
            const ubicacionGuardada = localStorage.getItem("ubicacionExamen");

            // SEGURO DE VIDA: Si la pagina anterior falló en mandar el ID, lo buscamos aquí mismo
            if (!idMuni || idMuni === "undefined" || idMuni === "null") {
                
                try {
                    const token = localStorage.getItem("token");
                    const respuesta = await fetch(
                        "http://localhost:3000/api/examenes/municipalidad-usuario",
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    
                    if (respuesta.ok) {
                        const data = await respuesta.json();
                        setMunicipalidadId(data.id_municipalidad);
                        setUbicacion(data.nombre_municipalidad);
                    } else {
                        setUbicacion(usuario.comuna || "Ubicación no encontrada");
                    }
                } catch (error) {
                    console.log("Error recuperando muni:", error);
                }

            } else {
                
                setMunicipalidadId(Number(idMuni));
                setUbicacion(ubicacionGuardada || usuario.comuna);
                
            }
        };

        cargarTodo();

    }, []);

    const horas = [
        "08:30:00",
        "09:15:00",
        "10:00:00",
        "11:45:00",
        "13:15:00"
    ];

    const agendarExamen = async () => {

        if (!tipoExamen) {
            alert("Falta enviar: Tipo de examen.");
            return;
        }
        if (!fechaSeleccionada) {
            alert("Falta enviar: Fecha.");
            return;
        }
        if (!horaSeleccionada) {
            alert("Falta enviar: Hora. Por favor selecciona una.");
            return;
        }
        if (!municipalidadId) {
            alert("Falta enviar: ID de Municipalidad. El servidor no logró cargar su comuna.");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const respuesta = await fetch(
                "http://localhost:3000/api/examenes/agendar",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        tipo_examen: tipoExamen,

                        fecha: fechaSeleccionada,

                        hora: horaSeleccionada,

                        id_municipalidad: municipalidadId

                    })

                }
            );

            const data = await respuesta.json();

            if (!respuesta.ok) {

                alert(data.mensaje);
                return;

            }

            alert(data.mensaje);

            window.location.href = "/agendar-examen-r";

        } catch (error) {

            console.log(error);
            alert("Error de conexión al servidor");

        }

    };

    return (
        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="container-agendar-f">

                        <div className="panel-agendar-f">

                            <IonText className="titulo-agendar-f">
                                Agendar Examen
                            </IonText>

                            <div className="row-agendar-f">

                                <div className="column-agendar-f">

                                    <IonText className="text-agendar-f">
                                        Tipo de examen:
                                    </IonText>

                                    <IonText className="text-agendar-f">
                                        {tipoExamen}
                                    </IonText>

                                </div>

                                <div className="column-agendar-f">

                                    <IonText className="text-agendar-f">
                                        Ubicación:
                                    </IonText>

                                    <IonText className="text-agendar-f">
                                        {ubicacion}
                                    </IonText>

                                </div>

                            </div>

                            <div className="row-agendar-f">

                                <IonText className="text-agendar-f">
                                    Horas disponibles:
                                </IonText>

                                <IonSelect
                                    value={horaSeleccionada}
                                    placeholder="Horas disponibles"
                                    interface="popover"
                                    onIonChange={(e) => setHoraSeleccionada(e.detail.value)}
                                    style={{ color: "black", background: "white", borderRadius: "8px", padding: "5px 15px" }}
                                >
                                
                                    {horas.map((item, index) => (
                
                                        <IonSelectOption 
                                            key={index}
                                            value={item}
                                        >
                                        {item}
                                        </IonSelectOption>
                                
                                    ))}
                                                
                                </IonSelect>

                                <IonText className="text-agendar-f">
                                    Fechas disponibles:
                                </IonText>

                                <div style={{ background: "white", borderRadius: "8px", padding: "5px 10px" }}>
                                    <IonDatetimeButton datetime="datetime-id"></IonDatetimeButton>
                                </div>

                                <IonModal keepContentsMounted={true}>
                                    <IonDatetime
                                        id="datetime-id"
                                        presentation="date"
                                        color="dark"
                                        value={fechaSeleccionada}
                                        onIonChange={(e) =>
                                            setFechaSeleccionada(
                                                (e.detail.value as string).split('T')[0]
                                            )
                                        }
                                    ></IonDatetime>
                                </IonModal>

                            </div>

                            <Button
                                texto="Agendar Examen"
                                ancho="200px"
                                background="#D9D9D9"
                                textColor="black"
                                onClick={agendarExamen}
                            />

                        </div>
                        
                    </div>

                </IonContent>

            </IonPage>
        </>
    );
};

export default AgendarExamenF;