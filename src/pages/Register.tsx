import {IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonCheckbox,
  IonLabel
} from '@ionic/react';

import { useState } from 'react';

import './Register.css';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';

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
  const [telefono, setTelefono] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [aceptado, setAceptado] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">

      <div className="layout-register">

      <div className="left-register">

      <IonText className="nombre-register">
        ConduceFácil
      </IonText>

      </div>

      <div className="right-register">

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

            <div className="entrada-register">

              <IonInput 
                type = "text"
                value = {telefono}
                placeholder="telefono"
                onIonChange={(e) => setTelefono(e.detail.value!)}
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

            <IonItem className="checkBox-register">

              <IonCheckbox 
            
                checked={aceptado}

                onIonChange={(e) => setAceptado(e.detail.checked)}
            
              />

              <IonLabel>

                He leido los TERMINOS Y CONDICIONES y acepto.

              </IonLabel>

            </IonItem>

            <Button
              texto="PARA REGISTRARSE HAGA CLICK AQUÍ"
              talla="large"
              ancho="250px"
              fontSize="15px"
              textColor="black"
              routerLink="/login"
              disabled={!aceptado}
            />

            <ButtonLink 
              texto="¿Ya estás registrado? Ingresa acá"
              routerLink="/login"
            />

          </div>

          </div>

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
