import React from "react";
import { Link } from "react-router-dom";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, to, children, ...props }, ref) => {
    const variants = {
      primary: "bg-white text-black hover:bg-brand-primary",
      secondary: "glass text-white hover:bg-white/10",
      outline: "border border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10",
      ghost: "text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-[10px]",
      md: "px-8 py-4 text-xs",
      lg: "px-12 py-5 text-sm",
    };

    const content = (
      <>
        {/* Subtle Inner Glow on Hover (for primary) */}
        {variant === "primary" && (
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />
        )}

        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <>
            {leftIcon && <span className="relative z-10">{leftIcon}</span>}
            <span className="relative z-10">{children}</span>
            {rightIcon && <span className="relative z-10">{rightIcon}</span>}
          </>
        )}
      </>
    );

    const commonClasses = cn(
      "relative inline-flex items-center justify-center gap-2 font-display font-medium uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group text-center",
      variants[variant],
      sizes[size],
      className
    );

    if (to) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Link to={to} className={commonClasses}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={commonClasses}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
