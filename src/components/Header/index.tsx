import { Toolbar, ToolbarProps, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

export interface HeaderProps extends ToolbarProps {
  left?: ReactElement,
  title?: string,
  right?: ReactElement
}

export const Header: FC<HeaderProps> = ({ left, title, right, ...props }) => (
  <Toolbar component="header" disableGutters sx={{ pl: 2 }} variant="dense" {...props}>
    {left}
    <Typography
      variant="h6"
      component="h1"
    >
      {title}
    </Typography>
    {right}
  </Toolbar>
)