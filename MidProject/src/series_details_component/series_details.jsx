import { useEffect, useState } from 'react'
import './series_details.css'

function Series_Details() {

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

    return (
        <>
            
        </>
    )
}

export default Series_Details