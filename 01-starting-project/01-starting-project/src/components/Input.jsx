import { useState } from "react";

export default function Input({ label, input, initialValue, onChangeValue}) {
    const [value, setValue] = useState(initialValue);

    function handleChange(event){
        setValue(event.target.value);
        onChangeValue(input, event.target.value);
    }

    console.log(value);

    return <p>
            <label>{label}</label>
            <input type="number" required value={value} onChange={handleChange}/>
    </p>;
}