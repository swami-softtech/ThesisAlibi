import React from "react";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({ theme = "light", ...props }) => {
  // You can implement your own theme logic here
  // For example, detect system theme:
  // const getSystemTheme = () => {
  //   if (typeof window !== 'undefined') {
  //     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  //   }
  //   return 'light';
  // };

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };