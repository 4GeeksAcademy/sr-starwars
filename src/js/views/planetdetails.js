import React from 'react';

const PlanetDetails = ({ planet, onClose }) => {
    return (
        <div className="modal show" style={{ display: 'block' }}> {/* Estilos para simular un modal */}
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{planet.name}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Clima:</strong> {planet.climate}</p>
                        <p><strong>Terreno:</strong> {planet.terrain}</p>
                        <p><strong>Población:</strong> {planet.population}</p>
                        {/* ... más detalles del planeta ... */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetDetails;