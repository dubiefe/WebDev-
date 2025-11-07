import { useEffect, useState } from 'react'
import './series_details.css'
import Favorite_Button from '../favorite_button_component/favorite_button';

function Series_Details(props) {

    const [ seriesData, setSeriesData ] = useState();
    const [ seriesDataSeasons, setSeriesDataSeasons ] = useState();
    
    useEffect(() => {
        // Fetch main info
        const fetchData = async () => {
            let resObj = await fetch("https://api.tvmaze.com/shows/" + props.series_id + "?embed=cast");
            if (resObj.ok) {
                // If the result is OK (Status HTTP between 200 and 299)
                const resJSON = await resObj.json();
                const series = resJSON;
                setSeriesData(series);
            }  else {
                // Else we display the error
                console.error(resObj);
            }
        };

        fetchData();
    }, [props.series_id]);

    useEffect(() => {

        if(!seriesData) return; 

        // Fetch seasons info
        const fetchDataSeasons = async () => {
            let resObj = await fetch(seriesData._links.previousepisode.href);
            if (resObj.ok) {
                // If the result is OK (Status HTTP between 200 and 299)
                const resJSON = await resObj.json();
                const series = resJSON;
                setSeriesDataSeasons(series);
            }  else {
                // Else we display the error
                console.error(resObj);
            }
        }

        fetchDataSeasons();
    }, [seriesData]);

    if(!seriesData) return null;

    return (
        <>
            <div id='series_details_container'>
                <div>
                    <h2>{seriesData.name}</h2>
                    <Favorite_Button isFavorite={props.isFavorite} handleClickFavorite={() => props.handleClickFavorite(String(seriesData.id))}/>
                </div>
            </div>
        </>
    )
}

export default Series_Details