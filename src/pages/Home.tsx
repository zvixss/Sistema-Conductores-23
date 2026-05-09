import {IonContent,
  IonPage,
} from '@ionic/react';

import './Home.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';

const Home: React.FC = () => {

  return (
    <>
        <MenuLateral />

        <IonPage id="main-content">

            <ToolbarHome />

            <IonContent fullscreen className="fondo">

            </IonContent>

        </IonPage>
    </>
  );
};

export default Home;