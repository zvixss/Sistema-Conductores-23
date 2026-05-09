import {IonContent,
  IonPage,
  IonInput,
  IonText,
  IonButton
} from '@ionic/react';

import { useState } from 'react';

import './Login.css';
import Button from '../components/Button';

const Login: React.FC = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">

      <IonText className="nombre-login">
        ConduceFácil
      </IonText>

        <div className="container-login">

          <div className="panel-login">
          
            <IonText className="titulo-login">
              Ingresa a tu cuenta
            </IonText>

            <div className="entrada-login">

              <IonInput 
                type = "text"
                value = {user}
                placeholder="Usuario / RUT / Correo"
                onIonChange={(e) => setUser(e.detail.value!)}
              />

            </div>

            <div className="entrada-login">
              <IonInput 
                type = "password"
                value = {password}
                placeholder="Contraseña"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />

            </div>

            <Button
              texto="PARA INGRESAR HAGA CLICK AQUÍ"
              talla="large"
              ancho="250px"
              fontSize="15px"
              textColor="black"
              routerLink="/home"
            />

            <IonButton className="registro-login" routerLink="/register">
              ¿No estás registrado? Registrater acá
            </IonButton>

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
