import { useEffect, useState } from 'react';

import './App.css'
import Search from './search_component/search'
import Favorites from './favorites_component/favorites';

function App() {

    // Initialize favorites
    const [favorites, setFavorites] = useState(() => {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored).map(String) : [];
    });

    // Store favorites series
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log("favorites updated:", favorites);
    }, [favorites]);

    // Method to add favorites or remove
    function handleClickFavorite(id) {
        if (!favorites.includes(id)) {
            // add favorite
            setFavorites(prev => [...prev, id])
        } else {
            // Delete favorite
            setFavorites(prev => prev.filter(item => item !== id))
        }
    }

    return (
      <>
        <Favorites favorites={favorites} handleClickFavorite={handleClickFavorite}/>
        <Search favorites={favorites} handleClickFavorite={handleClickFavorite}/>
      </>
    )
}

export default App
