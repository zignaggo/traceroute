import { cn } from "@/lib/utils";
import { createLink, LinkComponent } from "@tanstack/react-router";
import * as React from "react";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  return (
    <a
      ref={ref}
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 p-2 rounded-md bg-background",
        "hover:bg-primary/20 hover:text-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-foreground text-muted-foreground",
        props.className,
      )}
    />
  );
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
