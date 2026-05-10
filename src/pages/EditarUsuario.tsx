import {IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import { useState } from 'react';

import './EditarUsuario.css';
import Button from '../components/Button';

const EditarUsuario: React.FC = () => {

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

            <div className="container-editar">

                <div className="panel-editar">
          
                    <IonText className="titulo-editar">
                        Editar Usuario
                    </IonText>

                    <div className="row-editar">

                        <div className="entrada-editar">

                            <IonInput 
                              type = "text"
                              value = {userName}
                              placeholder="Usuario"
                              onIonChange={(e) => setUserName(e.detail.value!)}
                            />

                        </div>

                        <div className="entrada-editar">

                            <IonInput 
                              type = "text"
                              value = {rut}
                              placeholder="RUT"
                              onIonChange={(e) => setRut(e.detail.value!)}
                            />


                        </div>

                    </div>

                    <div className="entrada-editar">

                        <IonInput 
                            type = "text"
                            value = {correo}
                            placeholder="Correo"
                            onIonChange={(e) => setCorreo(e.detail.value!)}
                        />

                    </div>

                    <div className="row-editar">

                        <div className="selector-editar">

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

                        <div className="selector-editar">

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

                    <div className="entrada-editar">

                        <IonInput 
                            type = "password"
                            value = {password1}
                            placeholder="Contraseña"
                            onIonChange={(e) => setPassword1(e.detail.value!)}
                        />

                    </div>

                    <div className="entrada-editar">
            
                        <IonInput 
                            type = "password"
                            value = {password2}
                            placeholder="Repita Contraseña"
                            onIonChange={(e) => setPassword2(e.detail.value!)}
                        />

                    </div>

                    <Button
                        texto="GUARDAR CAMBIOS"
                        talla="large"
                        ancho="200px"
                        fontSize="20px"
                        textColor="black"
                        routerLink="/perfil"
                    />

                </div>

            </div>
        
        </IonContent>

    </IonPage>

  );
};

export default EditarUsuario;
