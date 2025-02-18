import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext"; // Importa el contexto


export const Planets = () => {
    const { store, setStore } = useContext(Context); // Accede al store y setStore
    const [planets, setPlanets] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/planets/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPlanets(data.results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanets();
    },);

    const agregarAFavoritos = (planet) => {
        // Verifica si el planeta ya está en favoritos (usando el nombre como ID único)
        if (!store.favorites.find(fav => fav.name === planet.name)) {
            setStore({...store, favorites: [...store.favorites, planet] });
            alert(`${planet.name} se agregó a favoritos`);
        } else {
            alert(`${planet.name} ya está en favoritos`);
        }
    };

    if (loading) {
        return <div>Cargando planetas...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h3>Planetas</h3>
            <div className="container">
                <div className="row flex-nowrap" style={{ overflowX: "auto" }}>
                    {planets.map((planet) => (
                        <div className="col-md-3" key={planet.name}>
                            <div className="card">
                                <img
                                    className="card-img-top"
                                    style={{ objectFit: "cover", width: "100%", height: "200px" }}
                                    src={`https://starwars-visualguide.com/assets/img/planets/${planet.url.match(/\/(\d+)\/$/)}.jpg`}
                                    onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <p className="card-text">
                                        <strong>Clima:</strong> {planet.climate}<br />
                                        <strong>Terreno:</strong> {planet.terrain}<br />
                                        <strong>Población:</strong> {planet.population}<br />
                                    </p>
                                    <div className="d-flex justify-content-between"> {/* Contenedor para botones */}
                                        <a href={planet.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Ver detalles</a>
                                        <button className="btn btn-warning" onClick={() => agregarAFavoritos(planet)}>
                                        <i className="fa-regular fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};