const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4
         text-white
        rounded-lg
        font-semibold
        transition
        focus:outline-none
        focus:ring-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
