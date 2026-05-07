import { IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
} from '@ionic/react';

import { useState } from 'react';

import './Home.css';

const Home: React.FC = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">

      <IonText className="nombre-home">
        ConduceFácil
      </IonText>

        <div className="container-home">

          <div className="panel-home">
          
            <IonText className="titulo-home">
              Ingresa a tu cuenta
            </IonText>

            <div className="entrada-home">

              <IonInput 
                type = "text"
                value = {user}
                placeholder="Usuario / RUT / Correo"
                onIonChange={(e) => setUser(e.detail.value!)}
              />

            </div>

            <div className="entrada-home">
              <IonInput 
                type = "password"
                value = {password}
                placeholder="Contraseña"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />

            </div>

            <IonButton className="boton-home">
              LOG IN
            </IonButton>

            <IonButton className="registro-home" routerLink="/register">
              ¿No estás registrado? Registrater acá
            </IonButton>

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
