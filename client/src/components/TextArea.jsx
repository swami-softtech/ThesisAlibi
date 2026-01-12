import { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      value,
      onChange,
      className = "",
      disabled = false,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-amber-500 transition 
          disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...rest}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
