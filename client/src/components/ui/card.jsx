import React from "react";
import { cn } from "../../lib/utils";

const Card = ({
  variant = "default",
  title,
  subtitle,
  children,
  image,
  actions,
  className,
  onClick,
  ...props
}) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    elevated: "bg-white shadow-lg hover:shadow-xl border-0",
    outline: "bg-transparent border-2 border-gray-200 hover:border-blue-500",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-md",
    pricing: "bg-white border-nono hover:border-amber-500 shadow-lg hover:shadow-xl",
    featured: "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 shadow-xl",
    dark: "bg-gray-900 text-white border-gray-800 shadow-lg",
  };

  const variantClass = variants[variant] || variants.default;

  const cardClasses = cn(
    "rounded-xl overflow-hidden transition-all duration-300",
    variantClass,
    onClick && "cursor-pointer",
    className
  );

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      {...props}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {variant === "featured" && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
      )}

      <div className="">
        {subtitle && (
          <div className="text-sm text-gray-500 font-medium mb-2">
            {subtitle}
          </div>
        )}

        {title && <h3 className="text-xl font-bold mb-3">{title}</h3>}

        <div className="text-gray-600">{children}</div>

        {actions && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Card Grid Component
const CardGrid = ({
  children,
  cols = 3,
  gap = 6,
  className,
  ...props
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gridGap = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div
      className={cn(
        "grid",
        gridCols[cols] || gridCols[3],
        gridGap[gap] || gridGap[6],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card sub-components
const CardHeader = ({ children, className, ...props }) => (
  <div className={cn("p-6 pb-0", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className, ...props }) => (
  <p className={cn("text-sm text-gray-500", className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div
    className={cn(
      "p-6 pt-4 border-t border-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Export all components
export {
  Card,
  CardGrid,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
