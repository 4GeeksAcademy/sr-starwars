const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            favorites: [],
            planets: [],
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
                /**
                    fetch().then().then(data => setStore({ "foo": data.bar }))
                */
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            PeopleFetch: async () => {
                try {
                    const resp = await fetch("https://swapi.dev/api/people/");
                    const data = await resp.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.error("Error fetching people:", error);
                }
            },

            PlanetsFetch: async () => {
                try {
                    const res = await fetch("https://swapi.dev/api/planets");
                    if (res.ok) {
                        const data = await res.json();
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.error("Error fetching planets list:", error);
                }
            },

            Favorite: (item) => {
                const store = getStore();
                const isFavorite = store.favorites.some(fav => {
                    // Comparación robusta: primero verifica si existen las propiedades name y url
                    return fav && item && fav.name === item.name && fav.url === item.url;
                });
                let updatedFavorites;

                if (isFavorite) {
                    // Filtra usando tanto name como url para mayor seguridad
                    updatedFavorites = store.favorites.filter(fav => {
                        return !(fav.name === item.name && fav.url === item.url);
                    });
                } else {
                    updatedFavorites = [...store.favorites, item];
                }

                setStore({ favorites: updatedFavorites });
            }
        }
    };
};

export default getState;