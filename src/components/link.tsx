import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  return (
    <a
      ref={ref}
      {...props}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md bg-background",
        "hover:bg-primary/20 data-[status=active]:bg-secondary",
        props.className,
      )}
    />
  );
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
