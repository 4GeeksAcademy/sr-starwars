import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallesPeople = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [personDetails, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPersonDetails(data.result.properties);
            } catch (error) {
                console.error("Error fetching details:", error);
                setError("Error loading details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return <div className="text-white">Loading details...</div>;
    }

    if (error) {
        return <div className="text-white">{error}</div>;
    }

    if (!personDetails) {
        return <div className="text-white">No details found.</div>;
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card mb-3 bg-dark border-black" style={{ maxWidth: "1200px", width: "100%" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                            className="img-fluid rounded-start"
                            alt={personDetails.name} // Usa personDetails.name
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x500?text=No+Image')}
                        />
                    </div>
                    <div className="col-md-8 text-center text-white">
                        <div className="card-body">
                            <h3 className="card-title">{personDetails.name}</h3> {/* Usa personDetails.name */}
                            <p className="card-text">
                                <small>
                                    {/* Reemplaza con la descripción real del personaje */}
                                    Descripción del personaje.
                                </small>
                            </p>
                            <table className="table text-white">
                                <tbody>
                                    <tr>
                                        <td><strong>Height:</strong></td>
                                        <td>{personDetails.height}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Mass:</strong></td>
                                        <td>{personDetails.mass}</td>
                                    </tr>
                                    {/* ... otras propiedades ... */}
                                </tbody>
                            </table>
                            <p className="card-text text-center pt-4">
                                <small className="text-muted me-5">
                                    hola
                                </small>
                                <button
                                    type="button"
                                    className="btn btn-dark ms-5"
                                    onClick={() => actions.Favorite({
                                        name: personDetails.name, // Usa personDetails.name
                                        id: id,
                                        type: "person"
                                    })}
                                >
                                    <i className="fas fa-heart"></i>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );                       }