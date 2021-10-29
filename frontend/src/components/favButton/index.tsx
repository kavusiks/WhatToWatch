import React, { useState } from 'react';

import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons';

interface FavButtonProps {
    isFavorited: boolean;
}

const FavButton: React.FC<FavButtonProps> =({isFavorited}) => {

    const [favorited, setFavorited] = useState(isFavorited);

    return(
        <>
            <button className="btn-fav" onClick={() => 
                {setFavorited(!favorited)
                console.log("click")}}>
                <FontAwesomeIcon icon={faHeart} color={favorited ? 'red' : 'lightgray'}></FontAwesomeIcon>
            </button>
        </>
    )
}

export default FavButton;

function setFavorite() {
    throw new Error('Function not implemented.');
}
