import { useState } from "react";

export default function Player ({name, symbol}){
    const [ isEditing, setIsEditing ] = useState(false);

    function handleIsEditing(editing){
        setIsEditing(editing);
    }

    return(
        <li>
            <span className="player">
                {isEditing ? <input/> : <span className="player-name">{name}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            {isEditing ? <button onClick={() => handleIsEditing(false)}>Save</button>
                : <button onClick={() => handleIsEditing(true)}>Edit</button>}
        </li>
    );
}