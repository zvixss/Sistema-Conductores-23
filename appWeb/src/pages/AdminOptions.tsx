import {
    IonContent,
    IonPage
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

    const eliminarUsuario = async () => {

        const confirmar =
            window.confirm(
                "¿Eliminar usuario?"
            );

        if (!confirmar) return;

        const token =
            localStorage.getItem("token");

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

                            <h2>
                                ID usuario: {usuario.id}
                            </h2>

                            <h2>
                                {usuario.nombreUsuario}
                            </h2>

                            <div className="card-row-admin-options">

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

                                    <h3>Licencias</h3>

                                    {licencias.length === 0 ? (

                                        <p>No posee licencias.</p>

                                    ) : (

                                        licencias.map((l) => (

                                            <div key={l.id}>

                                                <p>Clase: {l.clase}</p>
                                                <p>Estado: {l.estado}</p>

                                            </div>

                                        ))

                                    )}

                                    <h3>Exámenes</h3>

                                    {examenes.map((e) => (

                                        <div key={e.id}>

                                            <p>{e.tipo_examen}</p>
                                            <p>{e.fecha}</p>
                                            <p>{e.estado}</p>
                                            <p>{e.resultado}</p>

                                        </div>

                                    ))}

                                    <div className="botones-admin-options">

                                        <Button
                                            texto="Actualizar Examenes"
                                            expand='block'
                                            ancho="60%"
                                            fontSize="15px"
                                            background="#D9D9D9"
                                            textColor="black"
                                        />

                                        <Button
                                            texto="Eliminar Usuario"
                                            expand='block'
                                            ancho="60%"
                                            fontSize="15px"
                                            background="#D9D9D9"
                                            textColor="black"
                                            onClick={eliminarUsuario}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </IonContent>

            </IonPage>
        </>
    );

};

export default AdminOptions;