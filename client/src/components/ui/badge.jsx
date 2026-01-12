import React from "react";
import { cn } from "../../lib/utils";

const Badge = ({
  variant = "default",
  size = "md",
  children,
  className,
  rounded = "full",
  icon,
  ...props
}) => {
  // Variant styles
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-purple-100 text-purple-800 border-purple-200",
    destructive: "bg-red-100 text-red-800 border-red-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    gold: "bg-amber-50 text-amber-800 border-amber-200",
    navy: "bg-indigo-50 text-indigo-800 border-indigo-200",
    outline: "bg-transparent text-gray-700 border-gray-300",
  };

  // Size styles
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // Rounded styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;
  const roundedClass = roundedStyles[rounded] || roundedStyles.full;

  return (
    <span
      className={cn(
        "inline-flex items-center border font-medium transition-colors",
        variantClass,
        sizeClass,
        roundedClass,
        className
      )}
      {...props}
    >
      {icon && (
        <span className="mr-1.5">{icon}</span>
      )}
      {children}
    </span>
  );
};

// Simple Badge component with dot indicator
const StatusBadge = ({
  status = "default",
  children,
  className,
  showDot = true,
  ...props
}) => {
  const statusColors = {
    default: "bg-gray-100 text-gray-800",
    online: "bg-green-100 text-green-800",
    offline: "bg-gray-100 text-gray-500",
    busy: "bg-red-100 text-red-800",
    away: "bg-yellow-100 text-yellow-800",
    draft: "bg-gray-100 text-gray-600",
    published: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  const dotColors = {
    default: "bg-gray-400",
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
    draft: "bg-gray-400",
    published: "bg-green-500",
    pending: "bg-yellow-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        statusColors[status] || statusColors.default,
        className
      )}
      {...props}
    >
      {showDot && (
        <span className={cn(
          "h-2 w-2 rounded-full mr-2",
          dotColors[status] || dotColors.default
        )} />
      )}
      {children}
    </span>
  );
};

export { Badge };
export { StatusBadge };