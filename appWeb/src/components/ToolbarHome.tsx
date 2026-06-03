import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton
} from '@ionic/react';

import './ToolbarHome.css';
import Button from './Button';
import menuIcon from '../assets/images/menu_icon.png';
import perfilIcon from '../assets/images/perfil.png';

const ToolbarHome: React.FC = () => {

  return (

    <IonHeader>

      <IonToolbar className="toolbar">

        <IonButtons
          slot="start"
          className="left-buttons"
        >

          <IonMenuButton className="button-menu">
            <img
              src={menuIcon}
              alt="MenuIcono"
              className="button-icon"
            />
          </IonMenuButton>

        </IonButtons>

        <IonTitle className="name">
          ConduceFácil
        </IonTitle>

        <IonButtons
          slot="end"
          className="right-buttons"
        >

          <Button
            texto="MI PERFIL"
            expand='block'
            background="transparent"
            textColor="#006089"
            fontSize="16px"
            ancho="100%"
            icono={perfilIcon}
            routerLink="/perfil"
          />

        </IonButtons>

      </IonToolbar>

    </IonHeader>

  );

};

export default ToolbarHome;