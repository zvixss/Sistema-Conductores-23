import {IonContent,
  IonPage,
  IonText,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime
} from '@ionic/react';

import './AgendarExamenF.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const AgendarExamenF: React.FC = () => {

    const [tipoExamen, setTipoExamen] = useState("");
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [municipalidadId, setMunicipalidadId] = useState<number | null>(null);

    useEffect(() => {

        const tipo = localStorage.getItem("tipoExamen");

        if (tipo) {

            setTipoExamen(tipo);

        }

        const idMunicipalidad = localStorage.getItem("municipalidadId");

        if (idMunicipalidad) {

            setMunicipalidadId(
                Number(idMunicipalidad)
            );

        }

        const usuario = JSON.parse(
            localStorage.getItem("usuario") || "{}"
        );

        const ubicacionGuardada =
            localStorage.getItem("ubicacionExamen");

        if (ubicacionGuardada) {

            setUbicacion(ubicacionGuardada);

        } else {

            setUbicacion(usuario.comuna);

        }

    }, []);

    const horas = [
        "08:30:00",
        "09:15:00",
        "10:00:00",
        "11:45:00",
        "13:15:00"
    ];

    const fecha = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
    ];

    const agendarExamen = async () => {

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

                                <IonDatetime
                                    presentation="date"
                                    value={fechaSeleccionada}
                                    onIonChange={(e) =>
                                        setFechaSeleccionada(
                                            e.detail.value as string
                                        )
                                    }
                                />

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