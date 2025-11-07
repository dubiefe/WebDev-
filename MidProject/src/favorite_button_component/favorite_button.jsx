import './favorite_button.css'

function Favorite_Button(props) {

    return (
        <>
            <button onClick={props.handleClickFavorite}>
                <svg id='icon_btn_favorite' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.isFavorite ? "lightcoral" : "gray"} className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            </button>
        </>
    )
}

export default Favorite_Button