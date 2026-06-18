import { IonContent, IonPage, IonText, IonButton, IonIcon, IonAlert, IonGrid, IonRow, IonCol } from '@ionic/react';
import { trashOutline, arrowBackOutline } from 'ionicons/icons';
import './Admin.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import { useEffect, useState } from 'react';

const Admin: React.FC = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        const token = localStorage.getItem("token");
        try {
            const respuesta = await fetch("http://localhost:3000/api/admin/usuarios", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (respuesta.ok) {
                const data = await respuesta.json();
                setUsuarios(data.usuarios || []);
            } else {
                if(respuesta.status === 403) {
                    alert("No tienes permisos de administrador para ver esta pantalla.");
                    window.location.href = "/home";
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const confirmarEliminacion = (id: number) => {
        setUsuarioSeleccionado(id);
        setShowDeleteAlert(true);
    };

    const borrarUsuario = async () => {
        if (usuarioSeleccionado === null) return;
        const token = localStorage.getItem("token");
        
        try {
            const respuesta = await fetch(`http://localhost:3000/api/admin/usuarios/${usuarioSeleccionado}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (respuesta.ok) {
                setShowDeleteAlert(false);
                setUsuarioSeleccionado(null);
                cargarUsuarios();
            } else {
                const data = await respuesta.json();
                alert(data.mensaje || "Error al eliminar el usuario");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión al servidor");
        }
    };

    const volverAtras = () => {
        window.history.back();
    };

    return (
        <>
            <MenuLateral />
            <IonPage id="main-content">
                <ToolbarHome />
                <IonContent fullscreen className="fondo">
                    <div className="container-admin" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '10px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <IonButton fill="clear" onClick={volverAtras} color="dark">
                                <IonIcon icon={arrowBackOutline} slot="icon-only" />
                            </IonButton>
                            <IonText color="primary">
                                <h1 style={{ margin: 0, marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>Gestión de Usuarios</h1>
                            </IonText>
                        </div>
                        
                        <IonGrid>
                            <IonRow style={{ backgroundColor: '#f4f5f8', fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px 0' }}>
                                <IonCol size="1">ID</IonCol>
                                <IonCol size="3">Nombre</IonCol>
                                <IonCol size="4">Correo</IonCol>
                                <IonCol size="2">Rol</IonCol>
                                <IonCol size="2" className="ion-text-center">Acciones</IonCol>
                            </IonRow>

                            {usuarios.length === 0 ? (
                                <IonRow>
                                    <IonCol className="ion-text-center" style={{ padding: '20px' }}>No hay usuarios registrados.</IonCol>
                                </IonRow>
                            ) : (
                                usuarios.map((u) => (
                                    <IonRow key={u.id} style={{ borderBottom: '1px solid #eee', alignItems: 'center', padding: '8px 0' }}>
                                        <IonCol size="1">{u.id}</IonCol>
                                        <IonCol size="3">{u.nombreUsuario}</IonCol>
                                        <IonCol size="4">{u.correo}</IonCol>
                                        <IonCol size="2">{u.rol}</IonCol>
                                        <IonCol size="2" className="ion-text-center">
                                            <IonButton color="danger" fill="outline" size="small" onClick={() => confirmarEliminacion(u.id)}>
                                                <IonIcon icon={trashOutline} slot="start" />
                                                Eliminar
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                ))
                            )}
                        </IonGrid>
                    </div>

                    <IonAlert
                        isOpen={showDeleteAlert}
                        onDidDismiss={() => setShowDeleteAlert(false)}
                        header="¿Eliminar Usuario?"
                        message="Esta acción es irreversible y borrará todo el historial del usuario. ¿Deseas continuar?"
                        buttons={[
                            { text: 'Cancelar', role: 'cancel' },
                            { text: 'Sí, eliminar', handler: borrarUsuario }
                        ]}
                    />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Admin;