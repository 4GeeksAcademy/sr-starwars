import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const People = React.memo(() => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.PeopleFetch();
            } catch (err) {
                setError(err);
                console.error("Error fetching people:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getIdFromUrl = (url) => {
        if (url) {
            const match = url.match(/\/(\d+)\/$/);
            return match ? match[1] : null;
        }
        return null;
    };

    const agregarAFavoritos = (person) => {
        actions.Favorite(person);
    };

    if (loading) {
        return <p>Cargando personajes...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="container">
            <div className="row flex-nowrap" style={{ overflowX: "auto" }}>
                {store.people && store.people.length > 0 ? (
                    store.people.map((person, index) => {
                        const id = getIdFromUrl(person.url);
                        if (!id) {
                            console.warn("No se pudo extraer el ID para la persona:", person);
                            return null;
                        }

                        const isFavorite = store.favorites.some(fav => fav && person && fav.name === person.name && fav.url === person.url);

                        return (
                            <div key={index} className="col-md-3">
                                <div className="card">
                                    <img
                                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                                        className="card-img-top"
                                        alt={person.name}
                                        style={{ objectFit: "cover", width: "100%", height: "200px" }}
                                        onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{person.name}</h5>
                                        <p className="card-text">
                                            <strong>Género:</strong> {person.gender} <br />
                                            <strong>Color de cabello:</strong> {person.hair_color} <br />
                                            <strong>Color de ojos:</strong> {person.eye_color}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/detallesPerson/${id}`} className="btn btn-primary">
                                                Ver detalles
                                            </Link>
                                            <button
                                                className={`btn btn-warning ${isFavorite ? 'active' : ''}`}
                                                onClick={() => agregarAFavoritos(person)}
                                            >
                                                <i className={`fa-regular fa-heart ${isFavorite ? 'fa-solid' : ''}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay personajes disponibles.</p>
                )}
            </div>
        </div>
    );
});