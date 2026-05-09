import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonMenuButton
} from '@ionic/react';

import './ToolbarHome.css';

const ToolbarHome: React.FC = () => {

  return (

    <IonHeader>

      <IonToolbar className="toolbar">

        <IonButtons
          slot="start"
          className="left-buttons"
        >

          <IonMenuButton className="button">
            MENU
          </IonMenuButton>

        </IonButtons>

        <IonTitle className="name">

          ConduceFácil

        </IonTitle>

        <IonButtons
          slot="end"
          className="right-buttons"
        >

          <IonButton className="button">
            PERFIL
          </IonButton>

        </IonButtons>

      </IonToolbar>

    </IonHeader>

  );

};

export default ToolbarHome;