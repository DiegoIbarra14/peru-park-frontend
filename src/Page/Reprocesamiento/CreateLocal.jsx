import { Button } from 'primereact/button';
import React, { useState } from 'react';

export default function CreateLocal({visibleCreateLocal}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Busca tu local..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            <div style={styles.content}>
                <div style={styles.newLocalContainer}>
                    <button style={styles.newLocalButton} onClick={visibleCreateLocal} >
                        <span style={styles.plusIcon}>+</span>
                        <span>Crear Nuevo Local</span>
                    </button>
                </div>
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <div style={styles.iconContainer}>
                            <div style={styles.icon}></div>
                        </div>
                        <div style={styles.locationInfo}>
                            <h2 style={styles.locationName}>San juan de lurigancho</h2>
                            <p style={styles.locationAddress}>Calle eucalipto</p>
                        </div>
                        <span style={styles.badge}>Habilitado</span>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Departamento</span>
                            <span style={styles.infoValue}>LIMA</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Distrito</span>
                            <span style={styles.infoValue}>SAN JUAN DE LURIGANCHO</span>
                        </div>
                    </div>
                    <div style={styles.cardFooter}>
                     
                        <Button icon="pi pi-trash" style={{backgroundColor:"#ffecec",borderColor:"transparent" ,color:"#ff8082"}}/>
                        <Button icon="pi pi-pencil" style={{backgroundColor:"#bff1df",borderColor:"transparent" ,color:"#379c85"}} />
                        <Button icon="pi pi-plus" label='Crear Espacio' style={{backgroundColor:"#169",borderColor:"transparent" ,color:"#fff"}}/>
                            
                        

                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f2f5',
        padding: '20px',
        minHeight: '100vh',
    },
    searchContainer: {
        marginBottom: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '20px',
    },
    content: {
        display: 'flex',
        gap: '20px',
    },
    newLocalContainer: {
        flex: 1,
        border: '2px dashed #ccc',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
    },
    newLocalButton: {
        background: 'none',
        border: 'none',
        color: '#6c5ce7',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    plusIcon: {
        fontSize: '48px',
        marginBottom: '10px',
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    iconContainer: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#6c5ce7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '15px',
    },
    icon: {
        width: '30px',
        height: '30px',
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    locationAddress: {
        margin: 0,
        color: '#666',
    },
    badge: {
        backgroundColor: '#81ecec',
        color: '#00b894',
        padding: '5px 10px',
        borderRadius: '15px',
        fontSize: '12px',
    },
    cardContent: {
        marginBottom: '20px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    infoLabel: {
        color: '#666',
    },
    infoValue: {
        fontWeight: 'bold',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
    },
    editButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
    },
    createAreaButton: {
        backgroundColor: '#6c5ce7',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    buttonIcon: {
        fontSize: '20px',
    },
};
