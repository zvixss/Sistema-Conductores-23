import { IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import { useState } from 'react';

import './Register.css';

const Register: React.FC = () => {

  const regiones = [
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Región Metropolitana",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
  ];
  const comunas = [
    "Arica",
    "Iquique",
    "Antofagasta",
    "Copiapó",
    "La Serena",
    "Calama",
    "Valparaíso",
    "Viña del Mar",
    "Santiago",
    "Rancagua",
    "Talca",
    "Chillán",
    "Concepción",
    "Temuco",
    "Valdivia",
    "Puerto Montt",
    "Coyhaique",
    "Punta Arenas"
  ];

  const [userName, setUserName] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">

      <IonText className="nombre-register">
        ConduceFácil
      </IonText>

        <div className="container-register">

          <div className="panel-register">
          
            <IonText className="titulo-register">
              Registro de cuenta
            </IonText>

            <div className="row-register">

              <div className="entrada-register">

                <IonInput 
                  type = "text"
                  value = {userName}
                  placeholder="Usuario"
                  onIonChange={(e) => setUserName(e.detail.value!)}
                />

              </div>

              <div className="entrada-register">

                <IonInput 
                  type = "text"
                  value = {rut}
                  placeholder="RUT"
                  onIonChange={(e) => setRut(e.detail.value!)}
                />


              </div>

            </div>

            <div className="entrada-register">

              <IonInput 
                type = "text"
                value = {correo}
                placeholder="Correo"
                onIonChange={(e) => setCorreo(e.detail.value!)}
              />

            </div>

            <div className="row-register">

              <div className="selector-register">

                <IonSelect
                  value={region}
                  placeholder="Región"
                  interface="popover"
                  onIonChange={(e) => setRegion(e.detail.value)}
                  >

                  {regiones.map((item, index) => (

                    <IonSelectOption 
                    key={index}
                    value={item}
                    >
                      {item}
                    </IonSelectOption>

                  ))}
                
                </IonSelect>

              </div>

              <div className="selector-register">
                <IonSelect
                  value={comuna}
                  interface="popover"
                  placeholder="Comuna"
                  onIonChange={(e) => setComuna(e.detail.value)}
                  >

                  {comunas.map((item, index) => (

                    <IonSelectOption 
                      key={index}
                      value={item}
                      >
                        {item}
                    </IonSelectOption>

                  ))}
                
                </IonSelect>

              </div>

            </div>

            <div className="entrada-register">
              <IonInput 
                type = "password"
                value = {password1}
                placeholder="Contraseña"
                onIonChange={(e) => setPassword1(e.detail.value!)}
              />

            </div>

            <div className="entrada-register">
              <IonInput 
                type = "password"
                value = {password2}
                placeholder="Repita Contraseña"
                onIonChange={(e) => setPassword2(e.detail.value!)}
              />

            </div>

            <IonButton className="boton-register">
              PARA REGISTRARSE HAGA CLICK AQUÍ
            </IonButton>

            <IonButton className="login-register" routerLink="/home">
              ¿Ya estás registrado? Ingresa acá
            </IonButton>

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
