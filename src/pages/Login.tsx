import {IonContent,
  IonPage,
  IonInput,
  IonText
} from '@ionic/react';

import { useState } from 'react';

import './Login.css';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import Message from '../components/Message';

const Login: React.FC = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const login = async () => {

    try {

      const respuesta = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            identificador: user,

            password

          })

        }
      );

      const data = await respuesta.json();

      console.log(data);

      if (!respuesta.ok) {

        setMensajeError(data.mensaje);

        return;

      }

      localStorage.setItem("token", data.token);

      window.location.href = "/home";

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <IonPage>

      <IonContent fullscreen className="fondo">

        <div className="layout-login">

          <div className="left-login">

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
                  expand='block'
                  ancho="100%"
                  fontSize="15px"
                  textColor="black"
                  onClick={login}
                />

                <ButtonLink 
                  texto="¿No estás registrado? Registrater acá"
                  routerLink="/register"
                />

                {mensajeError && (

                  <Message
                    texto={mensajeError}
                    tipo="error"
                  />

                )}

              </div>

            </div>

          </div>

          <div className="right-login">

            <IonText className="nombre-login">
              ConduceFácil
            </IonText>

          </div>

        </div>
          
      </IonContent>

    </IonPage>
  );
};

export default Login;
