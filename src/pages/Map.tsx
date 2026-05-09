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

import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import mapa from '../assets/images/mapa.png';

import './Map.css';

const Map: React.FC = () => {

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

                        <IonItem button className="item-menu-principal" routerLink="/principal">
                            <IonLabel>Página principal</IonLabel>
                        </IonItem>

                       <IonItem button className="item-menu-principal" routerLink="/map">
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

            <div className="mapa-container-map">

                <TransformWrapper>

                    <TransformComponent>

                        <img
                            src={mapa}
                            alt="Mapa"
                            className="mapa-imagen-map"
                        />

                    </TransformComponent>

                </TransformWrapper>

            </div>

          </IonContent>

        </IonPage>
    </>

    );
};

export default Map;