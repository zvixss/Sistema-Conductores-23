import {IonContent,
  IonPage,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonCheckbox,
  IonLabel
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
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [aceptado, setAceptado] = useState(false);

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
                              value = {telefono}
                              placeholder="Telefono"
                              onIonChange={(e) => setTelefono(e.detail.value!)}
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

                    <IonItem className="checkBox-editar">
                    
                        <IonCheckbox 
                                
                            checked={aceptado}
                    
                            onIonChange={(e) => setAceptado(e.detail.checked)}
                                
                        />
                    
                        <IonLabel>
                    
                            Acepto que no  puedo realizar cambios en 30 días
                    
                        </IonLabel>
                    
                    </IonItem>

                    <div className="row-editar-usuario">

                        <Button
                            texto="Atras"
                            talla="large"
                            ancho="200px"
                            fontSize="20px"
                            textColor="black"
                            background="red"
                            routerLink="/perfil"
                        />

                        <Button
                            texto="GUARDAR CAMBIOS"
                            talla="large"
                            ancho="200px"
                            fontSize="20px"
                            textColor="black"
                            disabled={!aceptado}
                            routerLink="/login"
                        />

                    </div>

                    <IonText className="texto_editar-usuario">
                        *Usted tendrá que entrar a su cuenta nuevamente
                    </IonText>

                </div>

            </div>
        
        </IonContent>

    </IonPage>

  );
};

export default EditarUsuario;
