import React from 'react'
import LikedIcon from '../Icons/LikedIcon';
import UnlikedIcon from '../Icons/UnlikedIcon';
export default function Liked(props) {

    let heartIcon = props.like ? <LikedIcon /> : <UnlikedIcon />;
    return <div className="Like">{heartIcon}</div>;
}
