import { useState } from "react";

export default function Player ({name, symbol}){
    const [ isEditing, setIsEditing ] = useState(false);

    function handleIsEditing(){
        setIsEditing((editing) => !editing);
    }

    let playerName = <span className="player-name">{name}</span>;
    if(isEditing){
        playerName = <input type="text" required value={name}/>;
    }

    return(
        <li>
            <span className="player">
                {playerName}
            </span>
            <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}