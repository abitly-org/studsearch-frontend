import React, {useState} from "react";

function RadioBtnGender() {
    const [selectOption, setSelectOption] = useState('')

    function handleOptionChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        setSelectOption(changeEvent.target.value);
        console.log(changeEvent.target.value);
    }

    return (
        <div className={`RadioBlock`}>
            <div className="radio">
                <label htmlFor={`Чоловік`}>
                    <input type="radio" id={`Чоловік`} value="Чоловік" checked={selectOption === 'Чоловік'}
                           onChange={handleOptionChange}/>
                           <div className={`designOval`}/>
                    <span>Чоловік</span>
                </label>
            </div>
            <div className="radio">
                <label htmlFor={`Жінка`}>
                    <input type="radio" id={`Жінка`} value="Жінка" checked={selectOption === 'Жінка'}
                           onChange={handleOptionChange}/>
                    <div className={`designOval`}/>
                    <span>Жінка</span>
                </label>
            </div>
        </div>
    )
}

export default RadioBtnGender;