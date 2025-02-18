import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: { ...state.store, ...updatedStore },
                        actions: state.actions // Mantén las actions originales
                    })
            })
        );

        useEffect(() => {
            // Este useEffect se ejecuta una vez al montar el componente.
            // Puedes usarlo para cargar datos iniciales si es necesario.
        }, []);

        // *******************************************************************
        //  CORRECCIÓN IMPORTANTE: Las funciones addFavorite y removeFavorite
        //  deben acceder al state usando state.store y NO store directamente.
        // *******************************************************************
        const addFavorite = (item) => {
            const isDuplicate = state.store.favorites.some(fav => fav.name === item.name);
            if (!isDuplicate) {
                const updatedFavorites = [...state.store.favorites, item];
                setStore({ favorites: updatedFavorites }); // Actualiza el state con setStore
            }
        };

        const removeFavorite = (item) => {
            const updatedFavorites = state.store.favorites.filter(fav => fav.name !== item.name);
            setStore({ favorites: updatedFavorites }); // Actualiza el state con setStore
        };

        // *******************************************************************
        //  CORRECCIÓN IMPORTANTE: Las funciones deben estar dentro del objeto
        //  value para que los componentes puedan acceder a ellas.
        // *******************************************************************

        const value = {
            store: state.store,
            actions: { 
                ...state.actions, // Mantén las actions originales
                addFavorite: addFavorite,  // Incluye addFavorite
                removeFavorite: removeFavorite // Incluye removeFavorite
            }
        };

        return (
            <Context.Provider value={value}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;