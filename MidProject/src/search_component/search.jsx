import { useEffect, useState } from 'react'
import './search.css'
import search_logo from '../assets/search.svg'
import Series_Picture from '../series_picture_component/series_picture';

function Search(props) {

    const [ allSeries, setAllSeries ] = useState();
    const [ searchField, setSearchField ] = useState("");
    const [ searchTriggered, setSearchTriggered ] = useState(false);
    
    useEffect(() => {

        // Check if the field is blank
        if (!searchTriggered || !searchField) return;

        // Launch research if it is not
        const fetchData = async () => {
            let resObj = await fetch("https://api.tvmaze.com/search/shows?q=" + searchField);
            if (resObj.ok) {
                // If the result is OK (Status HTTP between 200 and 299)
                const resJSON = await resObj.json();
                const series = resJSON;
                setAllSeries(series);
            }  else {
                // Else we display the error
                console.error(resObj);
            }
            setSearchTriggered(false);
        };

        fetchData();
    }, [searchTriggered]);

    // Handle change of the field
    function changeSearchField(input) {
      setSearchField(input.target.value);
    }

    // Handle key press on "Enter"
    function handleKeyPress(e) {
      if (e.key === "Enter") {
        setSearchTriggered(true);
      }
    }

    return (
        <>
            <div id='search_container'>
              <div id='search_input_container'>
                <input type="text" value={searchField} onChange={changeSearchField} onKeyDown={handleKeyPress} placeholder='search for a series'/>
                <img src={search_logo} alt="search_logo" onClick={() => {setSearchTriggered(true)}} />
              </div>
              <div id='result_container'>
                  {allSeries ? (
                    allSeries.map((series) => {
                        return(
                          <>
                            {series.show.externals.thetvdb && <Series_Picture key={series.show.id} displayFavBtn={true} series_id={String(series.show.externals.thetvdb)} isFavorite={props.favorites.includes(String(series.show.externals.thetvdb))} handleClickFavorite={() => props.handleClickFavorite(String(series.show.externals.thetvdb))} handleClickSeries={() => props.handleClickSeries(String(series.show.externals.thetvdb))}/>}
                          </>
                        )
                    })
                  ) : (
                    <p>Loading Image...</p>
                  )}
              </div>
            </div>
        </>
    )
}

export default Search