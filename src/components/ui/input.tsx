import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as React from "react";

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  disabled?: boolean;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  size?: "large" | "medium" | "small";
  variant?: "rounded" | "default";
};

const inputWrapperVariants = cva(
  "flex border border-input bg-background container-input flex-row group items-center rounded-md focus-within:ring-[3px] focus-within:ring-blue-500/20 focus-within:border-blue-500",
  {
    variants: {
      size: {
        large: "h-10",
        medium: "h-9",
        small: "h-8",
      },
      variant: {
        rounded: "rounded-full",
        default: "",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const inputVariants = cva(
  `
    bg-transparent flex-1 h-full text-foreground
    file:bg-transparent file:border-0 file:font-medium placeholder:text-muted-foreground
    w-full outline-none
  `,
  {
    variants: {
      size: {
        large: "px-4 text-lg py-2",
        medium: "px-3 text-base lg:text-sm  py-2",
        small: "px-2 text-sm py-1",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, size, disabled, prependIcon, appendIcon, variant, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!, []);
    const handleViewPress = () => {
      inputRef.current?.focus();
    };
    return (
      <div
        className={cn(
          inputWrapperVariants({ size, variant }),
          disabled && "bg-foreground/10",
          className,
          "my-0.5"
        )}
        style={props.style}
        onTouchStart={handleViewPress}
      >
        {<div className="flex items-center justify-center px-3">{prependIcon}</div>}
        <input
          {...props}
          ref={inputRef}
          disabled={disabled}
          type={type}
          className={cn(
            inputVariants({ size }),
            disabled && "opacity-50 web:cursor-not-allowed",
            className,
            (prependIcon) && "m-0 pl-0",
            appendIcon && "m-0 pr-0"
          )}
        />
        {<div className="flex items-center justify-center px-3">{appendIcon}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
