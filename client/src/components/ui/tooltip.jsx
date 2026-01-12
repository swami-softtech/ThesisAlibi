import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

// Simple Tooltip Provider for managing global tooltip state
const TooltipProvider = ({ children, delayDuration = 300 }) => {
  return children;
};

// Main Tooltip component
const Tooltip = ({ 
  children, 
  content, 
  delayDuration = 300,
  side = "top",
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  let timeoutId = null;

  const handleMouseEnter = (e) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      
      // Calculate position based on side
      let x = rect.left + rect.width / 2;
      let y = rect.top;
      
      switch (side) {
        case "top":
          y = rect.top;
          break;
        case "bottom":
          y = rect.bottom;
          break;
        case "left":
          x = rect.left;
          y = rect.top + rect.height / 2;
          break;
        case "right":
          x = rect.right;
          y = rect.top + rect.height / 2;
          break;
      }
      
      setPosition({ x, y });
    }
    
    timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsOpen(false);
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block"
      >
        {children}
      </div>
      
      {isOpen && content && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            getSlideAnimation(side),
            className
          )}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, 0)",
          }}
        >
          {content}
          {/* Tooltip arrow */}
          <div className={cn(
            "absolute w-2 h-2 bg-popover border border-popover-foreground/20",
            getArrowPosition(side)
          )} />
        </div>
      )}
    </div>
  );
};

// Helper functions for positioning
const getSlideAnimation = (side) => {
  switch (side) {
    case "top":
      return "slide-in-from-top-2";
    case "bottom":
      return "slide-in-from-bottom-2";
    case "left":
      return "slide-in-from-left-2";
    case "right":
      return "slide-in-from-right-2";
    default:
      return "slide-in-from-top-2";
  }
};

const getArrowPosition = (side) => {
  switch (side) {
    case "top":
      return "-bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-t-0 border-l-0";
    case "bottom":
      return "-top-1 left-1/2 -translate-x-1/2 rotate-45 border-b-0 border-r-0";
    case "left":
      return "-right-1 top-1/2 -translate-y-1/2 rotate-45 border-b-0 border-l-0";
    case "right":
      return "-left-1 top-1/2 -translate-y-1/2 rotate-45 border-t-0 border-r-0";
    default:
      return "-bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-t-0 border-l-0";
  }
};

// Simple Trigger wrapper (just passes children through)
const TooltipTrigger = ({ children, ...props }) => {
  return <>{children}</>;
};

// Simple Content wrapper
const TooltipContent = ({ children, className, ...props }) => {
  return (
    <div className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      className
    )} {...props}>
      {children}
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };