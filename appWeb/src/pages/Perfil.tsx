import {IonContent,
  IonLabel,
  IonPage,
  IonText
} from '@ionic/react';

import './Perfil.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import perfilIcon from '../assets/images/perfil.png';
import Button from '../components/Button';
import { useState, useEffect } from 'react';

const Perfil: React.FC = () => {

    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {

        const obtenerPerfil = async () => {

            try {

                const token = localStorage.getItem("token");

                const respuesta = await fetch(
                    "http://localhost:3000/api/auth/perfil",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await respuesta.json();

                console.log(data);

                setUsuario(data.usuario);

            } catch (error) {

                console.log(error);

            }

        };

        obtenerPerfil();

    }, []);

    const cerrarSesion = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");

        window.location.href = "/login";

    };

    return (
        <>
            <MenuLateral/>

            <IonPage id="main-content">

                <ToolbarHome/>

                <IonContent fullscreen className="fondo-perfil">

                    <div className="container-perfil">

                        <div className="columns-perfil">

                            <div className="column-perfil">

                                <IonLabel>
                                    Nombre Completo
                                </IonLabel>

                                <IonText>
                                    {usuario?.nombreUsuario || "Cargando..."}
                                </IonText>

                            </div>

                            <div className="column-perfil">

                                <IonLabel>
                                    Correo Electrónico
                                </IonLabel>

                                <IonText>
                                    {usuario?.correo || "Cargando..."}
                                </IonText>

                            </div>

                        </div>

                        <div className="columns-perfil">

                            <IonText className="titulo-perfil">
                                Mis Datos Personales
                            </IonText>

                            <img src={perfilIcon} alt="Perfil"/>

                            <div className="column-perfil">
                                <IonLabel>
                                    Tipo de Licencia Cursando
                                </IonLabel>

                                <IonText>
                                    Clase B
                                </IonText>

                            </div>

                        </div>

                        <div className="columns-perfil">

                            <div className="column-perfil">

                                <IonLabel>
                                    RUT
                                </IonLabel>

                                <IonText>
                                    {usuario?.rut || "Cargando..."}
                                </IonText>

                            </div>

                            <div className="column-perfil">

                                <IonLabel>
                                    Ubicación
                                </IonLabel>

                                <IonText>
                                    {usuario?.comuna || "Cargando..."}, Chile
                                </IonText>

                            </div>

                        </div>

                    </div>

                    <div className="buttons-perfil">

                        <Button
                            texto="Editar Datos"
                            ancho="200px"
                            background="transparent"
                            textColor="#0D678E"
                            fontSize="16px"   
                            routerLink='/editar-usuario'                     
                        />
                        
                        <Button
                            texto="Cerrar Sesión"
                            ancho="200px"
                            background="transparent"
                            textColor="#FF0000"
                            fontSize="16px"
                            onClick={cerrarSesion}
                        />

                    </div>

                </IonContent>

            </IonPage>
        </>
    );
};

export default Perfil;