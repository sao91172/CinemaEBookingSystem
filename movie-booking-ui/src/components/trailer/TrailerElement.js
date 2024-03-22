import React from "react";
import ReactPlayer from "react-player";
import './TrailerElement.css';
import { useParams } from "react-router-dom";

const TrailerElement = () => {

    const youtubeId = useParams().youtubeId;

    return (
        <div className="trailer-element-container">
            <ReactPlayer controls="true" playing={true} url={`https://www.youtube.com/watch?v=${youtubeId}`} width='100%' height='100%'/>

        </div>
    )

}

export default TrailerElement;