import { useEffect, useState } from 'react'
import './series_picture.css'
import Favorite_Button from '../favorite_button_component/favorite_button';

function Series_Picture(props) {

    const [ seriesData, setSeriesData ] = useState();

    // Fetch data for the series
    useEffect(() => {
        const fetchData = async () => {
            let resObj = await fetch("https://api.tvmaze.com/shows/" + props.series_id);
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
    }, []);

    if(!seriesData || !seriesData.image) return null;

    return (
        <>
            <div id='series_picture_container' onClick={props.handleClickSeries}>
                <img src={seriesData.image.original}></img>
                {props.displayFavBtn && <Favorite_Button isFavorite={props.isFavorite} handleClickFavorite={() => props.handleClickFavorite(String(seriesData.id))}/>}
            </div>
        </>
    )
}

export default Series_Picture