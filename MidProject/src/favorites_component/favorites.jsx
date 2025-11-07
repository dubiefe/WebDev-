import './favorites.css'
import Series_Picture from '../series_picture_component/series_picture'

function Favorites(props) {
  return (
    <>
      <div id='favorites_container'>
        <h2>All your favorites</h2>
        <div id='favorites_details_container'>
          { props.favorites.map((favorite) => {
            return(
              <>
                <Series_Picture displayFavBtn={false} series_id={String(favorite)} handleClickSeries={() => props.handleClickSeries(String(favorite))}/>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Favorites