const Input = ({ id, type = "text", placeholder, value, onChange, className = "", disabled, ...rest }) => {
  return (
    <input
      id={id}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border-0 border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-amber-500 transition 
          disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...rest}
    />
  );
};

export default Input;
