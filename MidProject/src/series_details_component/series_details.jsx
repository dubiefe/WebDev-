import { useEffect, useState } from 'react'
import './series_details.css'
import x_icon from "../assets/x.svg"

import Favorite_Button from '../favorite_button_component/favorite_button';

function Series_Details(props) {

    const [ seriesData, setSeriesData ] = useState();
    const [ seriesDataSeasons, setSeriesDataSeasons ] = useState();

    // Regex to display the summary
    const regex = /<[^<>]+>/;
    const newRegex = new RegExp(
        regex.source,
        `${regex.flags}g`,
    );

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

    function printGenres(genres) {
        let finalGenres = "";
        genres.map((genre) => {
            finalGenres += genre + ", ";
        })
        return finalGenres.substring(0, finalGenres.length - 2);
    }

    function printMainActors(actors) {
        let finalActors = "";
        actors.slice(0, 6).map((actor) => {
            finalActors += actor.person.name + ", ";
        })
        return finalActors.substring(0, finalActors.length - 2) + "...";
    }

    if(!seriesData) return null;

    return (
        <>
            <div id='series_details_container'>
                <img src={x_icon} alt="close_details"/>
                <div id='series_name_favorite_container'>
                    <h2>{seriesData.name}</h2>
                    <Favorite_Button isFavorite={props.isFavorite} handleClickFavorite={() => props.handleClickFavorite(String(seriesData.id))}/>
                </div>
                <div id='series_main_image_info_container'>
                    <img src={seriesData.image.original} alt="image_series"/>
                    <div id='main_info_container'>
                        {seriesDataSeasons && <p>{seriesData.status} - {seriesDataSeasons.season} season(s)</p>}
                        {seriesData.status === "Ended" && <p>Broadcasted between {seriesData.premiered.slice(0, 4)} and {seriesData.ended.slice(0, 4)}</p>}
                        {seriesData.status === "Running" && <p>Broadcasted since {seriesData.premiered.slice(0, 4)}</p>}
                        <p>Average rating (<a href='https://www.tvmaze.com/' target='_blank'>TvMaze</a>) : {seriesData.rating.average} / 10</p>
                    </div>
                </div>
                <div id='series_other_info_container'>
                    <p>{printGenres(seriesData.genres)}</p>
                    <p>Strarring {printMainActors(seriesData._embedded.cast)}</p>
                    <p>{seriesData.summary.replaceAll(newRegex, "")}</p>
                </div>
            </div>
        </>
    )
}

export default Series_Details