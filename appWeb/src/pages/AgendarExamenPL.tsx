import {IonContent,
  IonPage,
  IonText,
  IonLabel
} from '@ionic/react';

import './AgendarExamenPL.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const AgendarExamenPL: React.FC = () => {

    const [documentoResidencia, setArchivo] = useState<File | null>(null);
    const [municipalidad, setMunicipalidad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [municipalidadId, setMunicipalidadId] = useState<number | null>(null);

    useEffect(() => {

        const cargarMunicipalidad = async () => {

            try {

                const token = localStorage.getItem("token");

                const respuesta = await fetch(
                    "http://localhost:3000/api/examenes/municipalidad-usuario",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await respuesta.json();

                if (respuesta.ok) {

                    setMunicipalidad(data.nombre_municipalidad);
                    setDireccion(data.direccion);
                    setMunicipalidadId(data.id_municipalidad);

                    localStorage.setItem(
                        "municipalidadId",
                        data.id_municipalidad.toString()
                    );

                    localStorage.setItem(
                        "ubicacionExamen",
                        data.nombre_municipalidad
                    );

                    localStorage.setItem(
                        "tipoExamen",
                        "Primera Licencia Clase B"
                    );

                } else {
                    console.log("Error del servidor (probablemente token vencido):", data);
                }

            } catch (error) {

                console.log("Error de conexión:", error);

            }

        };

        cargarMunicipalidad();

    }, []);

    return (
        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                    <div className="container-agendar-pl">

                        <div className="panel-agendar-pl">

                            <IonText className="titulo-agendar-pl">
                                Agendar Examen
                            </IonText>

                            <IonText className="text-agendar-pl">
                                Como es su primera licencia, debe realizar el examen en la municipalidad de su comuna.
                            </IonText>

                            <IonText className="text-agendar-pl">
                                {municipalidad ? `${municipalidad} ubicada en ${direccion}, horarios de atención de lunes a domingo de 8:30 a 13:00 horas.` : "Cargando datos de su municipalidad..."}
                            </IonText>

                            <IonText className="text-agendar-pl">
                                Para agendar debe presentar un documento de residencia válido. Por favor, suba su documento de residencia a continuación:
                            </IonText>

                            <label className="file-input-agendar-pl">

                                <input
                                    type="file"

                                    onChange={(e) => {

                                        const documentoResidencia = e.target.files?.[0];

                                        if (documentoResidencia) {

                                            setArchivo(documentoResidencia);

                                        }

                                    }}

                                />

                            </label>

                            <Button
                                texto="Subir Documento"
                                ancho="200px"
                                background="#D9D9D9"
                                textColor="black"
                                routerLink="/agendar-examen-f"
                            />

                        </div>
                        
                    </div>

                </IonContent>

            </IonPage>
        </>
  );
};

export default AgendarExamenPL;