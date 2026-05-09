import {
  IonMenu,
  IonContent,
  IonText,
  IonMenuToggle,
  IonItem,
  IonLabel
} from '@ionic/react';

import './MenuLateral.css';

const MenuLateral: React.FC = () => {

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
              <IonLabel>Página principal</IonLabel>
            </IonItem>

            <IonItem
              button
              className="item-menu"
              routerLink="/map"
            >
              <IonLabel>Mapa interactivo</IonLabel>
            </IonItem>

          </IonMenuToggle>

        </div>

      </IonContent>

    </IonMenu>

  );

};

export default MenuLateral;