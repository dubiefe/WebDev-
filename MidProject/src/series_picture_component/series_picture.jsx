import { useEffect, useState } from 'react'
import './series_picture.css'

function Series_Picture(props) {

    const [ seriesData, setSeriesData ] = useState();

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

    if(!seriesData) return null;

    if(!seriesData.image) return null;

    return (
        <>
            <div id='series_picture_container'>
                <img src={seriesData.image.original}></img>
            </div>
        </>
    )
}

export default Series_Picture