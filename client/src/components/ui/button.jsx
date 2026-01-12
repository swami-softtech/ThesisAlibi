import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  
  variants: {
    default: "text-white shadow-md hover:shadow-lg",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
    secondary: "bg-secondary text-secondary-foreground hover:bg-gold-dark shadow-md hover:shadow-lg",
    ghost: "hover:bg-muted hover:text-secondary",
    link: "text-primary underline-offset-4 hover:underline",
    gold: "bg-amber-500 text-gray-800 hover:bg-amber-600 shadow-md hover:shadow-lg font-semibold",
    hero: "bg-gold text-navy font-semibold hover:bg-gold-dark shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5",
    "hero-outline": "border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary font-semibold transition-all duration-300",
    nav: "text-foreground hover:text-gold transition-colors bg-transparent",
  },
  
  sizes: {
    default: "h-10 px-4 py-1",
    sm: "h-9 rounded-md px-4",
    lg: "h-12 rounded-lg px-8 text-base",
    xl: "h-14 rounded-lg px-10 text-lg",
    icon: "h-10 w-10",
  },
};

const Button = React.forwardRef(function Button(
  { 
    className, 
    variant = "default", 
    size = "default", 
    asChild = false, 
    children,
    ...props 
  }, 
  ref
) {
  // Get the appropriate variant and size classes
  const variantClass = buttonVariants.variants[variant] || buttonVariants.variants.default;
  const sizeClass = buttonVariants.sizes[size] || buttonVariants.sizes.default;
  
  // Combine all classes
  const buttonClasses = cn(
    buttonVariants.base,
    variantClass,
    sizeClass,
    className
  );
  
  // If asChild is true, clone the first child element
  if (asChild && React.Children.count(children) > 0) {
    const child = React.Children.toArray(children)[0];
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: cn(buttonClasses, child.props.className),
        ref: ref,
        ...props
      });
    }
  }
  
  // Otherwise, render a regular button
  return (
    <button 
      className={buttonClasses} 
      ref={ref} 
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
