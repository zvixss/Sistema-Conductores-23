import {
    IonContent,
    IonPage,
    IonAlert
} from "@ionic/react";

import "./AdminOptions.css";

import MenuLateral from "../components/MenuLateral";
import ToolbarHome from "../components/ToolbarHome";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AdminOptions: React.FC = () => {

    

    const { id } = useParams<{
        id: string;
    }>();

    const [usuario, setUsuario] = useState<any>(null);
    const [licencias, setLicencias] = useState<any[]>([]);
    const [examenes, setExamenes] = useState<any[]>([]);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario") || "{}");

    useEffect(() => {

        cargarUsuario();

    }, []);

    const cargarUsuario = async () => {

        try {

            const token = localStorage.getItem("token");

            const respuesta =
                await fetch(
                    `http://localhost:3000/api/admin/usuario/${id}`,
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            const data = await respuesta.json();

            console.log(data);

            setUsuario(data.usuario);
            setLicencias(data.licencias);
            setExamenes(data.examenes);

        } catch (error) {

            console.log(error);

        }

    };

    if (!usuario) {

        return (
            <IonPage>
                <IonContent>
                    Cargando...
                </IonContent>
            </IonPage>
        );

    }

    const actualizarExamenes = (
        examenId: number
    ) => {

        window.location.href = `/admin/examen/${examenId}`;

    };

    const eliminarUsuario = async () => {

        const token = localStorage.getItem("token");

        await fetch(
            `http://localhost:3000/api/admin/usuario/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        window.location.href = "/admin";

    };

    return (

        <>
            <MenuLateral />

            <IonPage id="main-content">

                <ToolbarHome />

                <IonContent fullscreen className="fondo">

                    <div className="layout-admin-options">

                        <div className="panel-admin-options">

                            <h1 className="titulo-admin-options">
                                ID: {usuario.id} | Usuario: {usuario.nombreUsuario}
                            </h1>

                            <div className="card-admin-options">

                                <p>
                                    RUT: {usuario.rut}
                                </p>

                                <p>
                                    Rol: {usuario.rol}
                                </p>

                                <p>
                                    Correo: {usuario.correo}
                                </p>

                                <p>
                                    Región: {usuario.region}
                                </p>

                                <p>
                                    Comuna: {usuario.comuna}
                                </p>

                            </div>

                            <h2 className="titulo-admin-options">Licencias</h2>

                            <div className="lista-admin-options">

                                {licencias.length === 0 ? (

                                    <p>No posee licencias.</p>

                                ) : (

                                    licencias.map((l) => (

                                        <div key={l.id}>

                                            <p>-Clase: {l.clase}</p>
                                            <p>-Estado: {l.estado}</p>

                                        </div>

                                    ))

                                )}

                            </div>

                            <h2 className="titulo-admin-options">Exámenes</h2>

                            <div className="lista-admin-options">

                                {examenes.length === 0 ? (

                                    <p>No hay exámenes registrados.</p>

                                ) : (
                                
                                    examenes.map((e) => (

                                        <div key={e.id}>

                                            <p>-{e.tipo_examen}</p>
                                            <p>-{e.fecha}</p>
                                            <p>-{e.estado}</p>
                                            <p>-{e.resultado}</p>

                                            <Button
                                                texto="Actualizar Examenes"
                                                expand='block'
                                                ancho="60%"
                                                fontSize="15px"
                                                background="#D9D9D9"
                                                textColor="black"
                                                onClick={() => actualizarExamenes(e.id)}
                                            />

                                        </div>
                                        
                                    ))

                                )}

                            </div>

                            <div className="botones-admin-options">

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
                        header="Eliminar Usuario"
                        message={
                            usuarioLogueado.id === usuario.id
                            ? "No puede eliminarse a sí mismo."
                            : `¿Seguro que desea eliminar al usuario ${usuario.nombreUsuario}?`
                        }
                        buttons={
                            usuarioLogueado.id === usuario.id
                            ? [
                                {
                                    text: "Aceptar",
                                    role: "cancel"
                                }
                            ]
                            : [
                                {
                                    text: "Cancelar",
                                    role: "cancel"
                                },
                                {
                                    text: "Eliminar",
                                    role: "destructive",
                                    handler: () => {
                                        eliminarUsuario();
                                    }
                                }
                            ]
                        }
                    />

                </IonContent>

            </IonPage>
        </>
    );

};

export default AdminOptions;