import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-[#0f172a] text-white": variant === "default",
          "bg-secondary text-[#0f172a]": variant === "secondary",
          "bg-muted text-muted-foreground": variant === "muted",
          "bg-destructive text-white": variant === "destructive",
          "bg-yellow-400 text-black": variant === "gold",
        },
        className
      )}
      {...props}
    />
  );
}
