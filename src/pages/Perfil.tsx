import {IonContent,
  IonFab,
  IonFooter,
  IonItem,
  IonLabel,
  IonPage,
  IonText
} from '@ionic/react';

import './Perfil.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import perfilIcon from '../assets/images/perfil.png';
import Button from '../components/Button';

const Perfil: React.FC = () => {

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
                                Juan Pérez
                            </IonText>

                        </div>

                        <div className="column-perfil">

                            <IonLabel>
                                Correo Electrónico
                            </IonLabel>

                            <IonText>
                                juan.perez@example.com
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
                                12.345.678-9
                            </IonText>

                        </div>

                        <div className="column-perfil">

                            <IonLabel>
                                Ubicación
                            </IonLabel>

                            <IonText>
                                Santiago, Chile
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
                        routerLink="/login"
                    />

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default Perfil;