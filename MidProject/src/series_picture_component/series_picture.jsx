import { useEffect, useState } from 'react'
import './series_picture.css'

function Series_Picture(props) {

    const [ seriesData, setSeriesData ] = useState();

    // Fetch data for the series
    useEffect(() => {
        const fetchData = async () => {
            let resObj = await fetch("https://api.tvmaze.com/lookup/shows?thetvdb=" + props.series_id);
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
            <div id='series_picture_container'>
                <img src={seriesData.image.original}></img>
                <button onClick={props.handleClickFavorite}>
                    <svg id='icon_btn_favorite' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.isFavorite ? "lightcoral" : "gray"} className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default Series_Picture