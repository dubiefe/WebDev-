import { use, useEffect, useState } from 'react';

import './App.css'
import Search from './search_component/search'
import Favorites from './favorites_component/favorites';
import Series_Details from './series_details_component/series_details';

function App() {

    // Variable for the details of the series
    const [ displayedSeriesId, setDisplaySeriesId ] = useState();
    const [ displaySeries, setDisplaySeries ] = useState(false);

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

    // Method to display the details of a series
    function handleClickSeries(id) {
        setDisplaySeriesId(id);
        setDisplaySeries(true);
    }

    return (
      <>
        <Favorites favorites={favorites} handleClickFavorite={handleClickFavorite} handleClickSeries={handleClickSeries} displayedSeriesId={displayedSeriesId}/>
        <Search favorites={favorites} handleClickFavorite={handleClickFavorite} handleClickSeries={handleClickSeries} displayedSeriesId={displayedSeriesId}/>
        {displaySeries && <Series_Details series_id={displayedSeriesId} isFavorite={favorites.includes(displayedSeriesId)} handleClickFavorite={handleClickFavorite}/>}
        {!displaySeries && <div id="default_container"></div>}
      </>
    )
}

export default App
