import {
    IonContent,
    IonPage,
    IonAlert,
    IonSelect,
    IonSelectOption
} from "@ionic/react";

import "./ActualizarExamen.css";

import MenuLateral from "../components/MenuLateral";
import ToolbarHome from "../components/ToolbarHome";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ActualizarExamen: React.FC = () => {

    const [examen, setExamen] = useState<any>(null);
    const [estado, setEstado] = useState("");
    const [resultado, setResultado] = useState("");
    const [licencias, setLicencias] = useState<any[]>([]);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const {
        examenId
    } = useParams<{
        examenId: string;
    }>();

    console.log(examenId);

    useEffect(() => {

        cargarExamen();

    }, []);

    const cargarExamen = async () => {

        const token = localStorage.getItem("token");

        const respuesta =
            await fetch(
                `http://localhost:3000/api/admin/examen/${examenId}`,
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const data = await respuesta.json();

        setExamen(data);

        setEstado(data.estado);

        setResultado(data.resultado);

    };

    if (!examen) {

        return (
            <IonPage>
                <IonContent>
                    Cargando examen...
                </IonContent>
            </IonPage>
        );

    }

    const guardarCambios = async () => {

        if (
            estado === "realizado" &&
            !resultado
        ) {

            alert(
                "Debe seleccionar un resultado."
            );

            return;

        }

        const token = localStorage.getItem("token");

        await fetch(
            `http://localhost:3000/api/admin/examen/${examenId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                    "application/json",
                    Authorization:
                    `Bearer ${token}`
                },
                body: JSON.stringify({
                    estado,
                    resultado
                })
            }
        );

        alert("Examen actualizado");

    };

    return (

        <>
            <MenuLateral />

            <IonPage id="main-content">

                <ToolbarHome />

                <IonContent fullscreen className="fondo">

                    <div className="layout-actualizar-examen">

                        <div className="panel-actualizar-examen">

                            <h2>{examen.tipo_examen}</h2>

                            <p>Fecha: {examen.fecha}</p>

                            <p>Hora: {examen.hora}</p>

                            <p>Estado actual: {examen.estado}</p>

                            <IonSelect

                                value={estado}
                                placeholder="Seleccionar nuevo estado"
                                onIonChange={(e) => {

                                    const nuevoEstado = e.detail.value;

                                    setEstado(nuevoEstado);

                                    if (nuevoEstado === "ausente") {

                                        setResultado("Reprobado");

                                    } else {

                                        setResultado("");

                                    }

                                }}
                            >
                                <IonSelectOption value="ausente">
                                    Ausente
                                </IonSelectOption>

                                <IonSelectOption value="realizado">
                                    Realizado
                                </IonSelectOption>

                            </IonSelect>

                            <p>Resultado actual: {resultado}</p>

                            {
                                estado === "realizado" && (

                                    <IonSelect
                                        value={resultado}
                                        placeholder="Seleccionar resultado"
                                        disabled={estado !== "realizado"}
                                        onIonChange={(e) =>
                                            setResultado(e.detail.value)
                                        }
                                    >
                                        <IonSelectOption value="Reprobado">
                                            Reprobado
                                        </IonSelectOption>

                                        <IonSelectOption value="Aprobado">
                                            Aprobado
                                        </IonSelectOption>

                                    </IonSelect>

                                )
                            }

                            <div className="botones-actualizar-examen">

                                <Button
                                    texto="Actualizar Examenes"
                                    expand='block'
                                    ancho="60%"
                                    fontSize="15px"
                                    background="#D9D9D9"
                                    textColor="black"
                                    onClick={guardarCambios}
                                />

                                <Button
                                    texto="Eliminar Usuario"
                                    expand='block'
                                    ancho="60%"
                                    fontSize="15px"
                                    background="#D9D9D9"
                                    textColor="black"
                                    onClick={() => setMostrarAlerta(true)}
                                />

                            </div>

                        </div>

                    </div>

                    <IonAlert
                        isOpen={mostrarAlerta}
                        onDidDismiss={() => setMostrarAlerta(false)}
                        header="Confirmar actualización"
                        message="¿Desea guardar los cambios realizados en este examen?"
                        buttons={[
                            {
                                text: "Cancelar",
                                role: "cancel"
                            },
                            {
                                text: "Guardar",
                                handler: () => {
                                    guardarCambios();
                                }
                            }
                        ]}
                    />

                </IonContent>

            </IonPage>
        </>
    );
};

export default ActualizarExamen;