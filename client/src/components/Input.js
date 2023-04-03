const Input = (props) => {
    const { maxLength , value, type, name, onChangeCallback, placeholder } = props;
    
    return (
        <input
        maxLength = {maxLength}
        value={value}
        type={type}
        id={name}
        onChange={onChangeCallback}
        placeholder={placeholder}
        />
    );
}

export default Input;