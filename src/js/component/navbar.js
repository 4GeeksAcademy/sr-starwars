import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const handleDelete = (index) => {
        actions.removeFavorite(store.favorites[index]); // Usa la action removeFavorite
    };

    const getIdFromUrl = (url) => {
        if (url) { // Verifica si la URL existe antes de intentar hacer match
            const match = url.match(/\/(\d+)\/$/);
            return match ? match[1] : null;
        }
        return null; // Devuelve null si la URL no existe
    };


    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">React Boilerplate hola </span>
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Favoritos ({store.favorites ? store.favorites.length : 0})
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        {store.favorites && store.favorites.length > 0 ? (
                            store.favorites.map((favorite, index) => {
                                const id = getIdFromUrl(favorite.url); // Obtén el ID de la URL
                                return (
                                    <div key={index} className="d-flex align-items-center">
                                        <Link className="dropdown-item flex-grow-1" to={id ? `/detallesPerson/${id}` : "#"}> {/* Enlace condicional */}
                                            {favorite.name}
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                            X
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <span className="dropdown-item">No hay favoritos</span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};