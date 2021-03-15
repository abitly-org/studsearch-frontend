import React, {useEffect, useState} from "react";

function FirstLastName() {
    const [query, setQuery] = useState<string | undefined>("");
    const [inputError, setInputError] = useState(false);

    // useEffect(() => {
    //         console.log(inputError)
    //         setInputError(!inputError);
    //     }
    //     , [submit])

    return (<div className="input-block">
        <input
            className={`input`}
            type="text"
            value={query}
            onChange={(event) => {
                setQuery(event.target.value);
                console.log(event.target.value)
            }}
        />
        <span className={"placeholder"}>{"Ім’я,Прізвище"}</span>
    </div>)
}

export default FirstLastName;
