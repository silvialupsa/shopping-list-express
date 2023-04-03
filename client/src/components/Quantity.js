const units = ["gram", "kilogram", "liter", "milliliter", "ounce", "pound", "gallon", "quart", "pint", "cup", "tablespoon", "teaspoon", "count"]
const Quantity = (props) => {
    const decrementCallBack = props.decrement
    const value = props.value
    const incrementCallBack = props.increment
    const handleSelectChange = props.handleSelectChange
    const onChangeCallback = props.onChangeCallback
    const className = props.className

    return (
        <div id="quantityContainer" className={className}>
            <button className="itemFromQuantity" id="decrement" onClick={decrementCallBack}>-</button>
            <input className="itemFromQuantity" id="quantityValue" value={value} onChange={onChangeCallback} />
            <button className="itemFromQuantity" id="increment" onClick={incrementCallBack}>+</button>
            <select className="itemFromQuantity" id="unit-select" onChange={handleSelectChange} style={value.length === 0 ? { border: '1px solid rgb(255,0,0)' } : {}}>
                {units.map((unit) => (value === 1 ?
                    <option key={unit} value={unit}>{unit}</option> :
                    <option key={unit} value={unit.concat("s")}>{unit}s</option>
                ))}
            </select>
        </div>
    )
}

export default Quantity;