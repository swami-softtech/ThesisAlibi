import React from "react";

const Label = React.forwardRef(({ 
  className = "", 
  htmlFor, 
  children, 
  ...props 
}, ref) => {
  const labelClasses = `text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`;
  
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={labelClasses}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };