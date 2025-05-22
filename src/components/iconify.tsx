import { Icon } from "@iconify/react";

type IconifyProps = Omit<React.ComponentProps<typeof Icon>, "icon"> & {
  name: string;
  size?: number;
};

function Iconify({ name, size = 16, ...rest }: IconifyProps) {
  return <Icon {...rest} icon={name} height={size} width={size} />;
}

export { Iconify };
