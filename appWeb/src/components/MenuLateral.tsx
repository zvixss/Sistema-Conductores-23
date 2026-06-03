import {
  IonMenu,
  IonContent,
  IonText,
  IonMenuToggle,
  IonItem,
  IonLabel
} from '@ionic/react';

import './MenuLateral.css';
import { useEffect, useState } from "react";

const MenuLateral: React.FC = () => {

  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {

      const datos = JSON.parse(
          localStorage.getItem("usuario") || "{}"
      );

      setUsuario(datos);

  }, []);

  return (

    <IonMenu contentId="main-content" className="lateral-menu">

      <IonContent className="content-menu">

        <div className="header-menu">

          <IonText className="titulo-menu">
            MENÚ
          </IonText>

        </div>

        <div className="options-menu">

          <IonMenuToggle autoHide={false}>

            <IonItem
              button
              className="item-menu"
              routerLink="/home"
            >
              <IonLabel>Página Principal</IonLabel>
            </IonItem>

            <IonItem
              button
              className="item-menu"
              routerLink="/map"
            >
              <IonLabel>Mapa Interactivo</IonLabel>
            </IonItem>

            <IonItem
              button
              className="item-menu"
              routerLink="/agendar-examen"
            >
              <IonLabel>Agendar Examen</IonLabel>
            </IonItem>

            <IonItem
              button
              className="item-menu"
              routerLink="/notificaciones"
            >
              <IonLabel>Notificaciones</IonLabel>
            </IonItem>

            {
              usuario?.rol === "admin" && (
                <IonItem
                  button
                  className="item-menu"
                  routerLink="/admin"
                >
                  <IonLabel>
                    Panel Administrador
                  </IonLabel>
                </IonItem>
              )
            }

          </IonMenuToggle>

        </div>

      </IonContent>

    </IonMenu>

  );

};

export default MenuLateral;