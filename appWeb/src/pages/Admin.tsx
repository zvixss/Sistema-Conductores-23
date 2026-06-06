import {IonContent,
  IonPage,
} from '@ionic/react';

import './Admin.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';
import { useEffect, useState } from "react";

const Admin: React.FC = () => {

    const [usuarios, setUsuarios] = useState<any[]>([]);

    useEffect(() => {

        const cargarUsuarios = async () => {

            try {

                const token = localStorage.getItem("token");

                const respuesta = await fetch(
                    "http://localhost:3000/api/auth/usuarios",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                const data = await respuesta.json();

                setUsuarios(data.usuarios);

            } catch (error) {

                console.log(error);

            }

        };

        const usuario = JSON.parse(
            localStorage.getItem("usuario") || "{}"
        );

        if (usuario.rol !== "admin") {

            window.location.href = "/home";
            return;

        }

        cargarUsuarios();

    }, []);

    return (

        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo">

                <div className="layout-admin">

                    <div className="panel-admin">

                        {usuarios.map((usuario) => (

                            <div key={usuario.id} className="usuario-card-admin">

                                <p>
                                    <strong>| ID : </strong>{" "}
                                    {usuario.id}
                                </p>

                                <p>
                                    <strong>| Usuario : </strong>{" "}
                                    {usuario.nombreUsuario}
                                </p>

                                <p>
                                    <strong>| RUT : </strong>{" "}
                                    {usuario.rut}
                                </p>

                                <p>
                                    <strong>| Rol : </strong>{" "}
                                    {usuario.rol}
                                </p>

                                <div className="boton-admin">
                                    <Button
                                        texto="Más Información"
                                        expand='block'
                                        ancho="60%"
                                        fontSize="15px"
                                        background="#D9D9D9"
                                        textColor="black"
                                        routerLink={`/admin-options/${usuario.id}`}
                                    />
                                </div>

                            </div>


                        ))}

                    </div>

                </div>

                </IonContent>

            </IonPage>

        </>
        
    )
};

export default Admin;