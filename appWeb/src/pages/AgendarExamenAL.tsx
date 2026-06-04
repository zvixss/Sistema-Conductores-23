import {IonContent,
  IonPage,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import './AgendarExamenAL.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';
import { useState, useEffect } from 'react';

const AgendarExamenAL: React.FC = () => {

  const [municipalidades, setMunicipalidades] = useState<any[]>([]);
  const [muniSeleccionada, setMuniSeleccionada] = useState<number | null>(null);

  useEffect(() => {

      const obtenerMunicipalidades = async () => {

          try {

              const token = localStorage.getItem("token");

              const respuesta = await fetch(
                  "http://localhost:3000/api/examenes/municipalidades",
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
              );

              const data = await respuesta.json();

              if (respuesta.ok) {

                  setMunicipalidades(data);

              }

          } catch (error) {

              console.log(error);

          }

      };

      obtenerMunicipalidades();

  }, []);

  return (
    <>
        <MenuLateral/>

        <IonPage id="main-content">

            <ToolbarHome/>

            <IonContent fullscreen className="fondo">

                <div className="container-agendar">

                    <div className="panel-agendar">

                        <IonText className="titulo-agendar">
                            Agendar Examen
                        </IonText>

                        <IonText className="text-agendar">
                            Seleccione la municipalidad donde desea realizar el examen:
                        </IonText>

                        <IonSelect

                            className="select-agendar-al"

                            interface="popover"

                            placeholder="Seleccione una municipalidad"

                            value={muniSeleccionada}

                            style={{ color: "black", display: "flex", justifyContent: "center", textAlign: "center", margin: "0 auto" }}
                            
                            onIonChange={(e) => {
                                
                                const valorId = e.detail.value;

                                if (!valorId) return;

                                const muni = municipalidades.find(m => m.id_municipalidad === valorId);
                                
                                if (muni) {
                                    const nombre = muni.nombre_municipalidad.toLowerCase();
                                    
                                    if (nombre.includes("valparaíso") || nombre.includes("valparaiso")) {
                                        
                                        setMuniSeleccionada(muni.id_municipalidad);

                                        localStorage.setItem(

                                            "municipalidadSeleccionada",

                                            muni.id_municipalidad.toString()

                                        );
                                    } else {
                                        
                                        alert("Estamos en fase Beta. Por ahora, nuestro sistema solo permite agendar en la municipalidad de Valparaíso.");
                                        
                                        setMuniSeleccionada(null);
                                    }
                                }
                            }}
                        >
                            {municipalidades.map((municipalidad) => (
                                <IonSelectOption key={municipalidad.id_municipalidad} value={municipalidad.id_municipalidad}>
                                    {municipalidad.nombre_municipalidad}
                                </IonSelectOption>
                            ))}
                        </IonSelect>

                        <Button
                            texto="Ir al mapa"
                            ancho="100%"
                            background="#D9D9D9"
                            textColor="black"
                            routerLink="/map-municipal"
                        />

                    </div>

                </div>

            </IonContent>

        </IonPage>
    </>
  );
};

export default AgendarExamenAL;