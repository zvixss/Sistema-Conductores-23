import { IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
  IonToolbar,
  IonHeader,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

import { useState } from 'react';

import './Principal.css';

const Principal: React.FC = () => {

  return (
    <>
        <IonMenu contentId="main-content" className="lateral-menu-principal">

            <IonContent className="content-menu-principal">

                <div className="header-menu-principal">

                    <IonText className="titulo-menu-principal">
                        MENÚ
                    </IonText>

                </div>

                <div className="options-menu-principal">

                    <IonMenuToggle autoHide={false}>

                        <IonItem button className="item-menu-principal">
                            <IonLabel>Página principal</IonLabel>
                        </IonItem>

                       <IonItem button className="item-menu-principal">
                           <IonLabel>Mapa Interactivo centros</IonLabel>
                        </IonItem>

                        <IonItem button className="item-menu-principal">
                           <IonLabel>Mis agendas</IonLabel>
                        </IonItem>

                        <IonItem button className="item-menu-principal">
                           <IonLabel>Mi Trayectoria</IonLabel>
                        </IonItem>

                    </IonMenuToggle>

                </div>

            </IonContent>

        </IonMenu>

        <IonPage id="main-content">

          <IonContent fullscreen className="fondo">

            <IonHeader>

                <IonToolbar className="toolbar-principal">

                    <IonButtons slot="start" className="left-buttons">

                        <IonMenuToggle className="boton-principal">

                            <IonButton className="boton-principal">
                                MENU
                            </IonButton>

                        </IonMenuToggle>

                 </IonButtons>

                    <IonTitle className="nombre-principal">
                        ConduceFácil
                    </IonTitle>

                    <IonButtons slot="end" className="right-buttons">

                        <IonButton className="boton-principal">
                            PERFIL
                        </IonButton>

                    </IonButtons>

                </IonToolbar>

            </IonHeader>

          </IonContent>

        </IonPage>
    </>
  );
};

export default Principal;