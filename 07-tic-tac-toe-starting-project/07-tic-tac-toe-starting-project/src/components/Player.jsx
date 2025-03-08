import { useState } from "react";

export default function Player ({name, symbol}){
    const [ isEditing, setIsEditing ] = useState(false);

    function handleIsEditing(){
        setIsEditing(!isEditing);
    }

    return(
        <li>
            <span className="player">
                {isEditing ? <input type="text" required value={name}/>
                    : <span className="player-name">{name}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}