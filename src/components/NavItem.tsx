import type { ListItemProps } from "@material-ui/core";
import { Box, Button, ListItem } from "@material-ui/core";
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
} from "react-router-dom";

interface NavItemProps extends ListItemProps {
  path: string;
  title: string;
}

export default function NavItem(props: NavItemProps) {
  const { path, title } = props;

  let paddingLeft = 16;
  const location = useLocation();

  const exactMatch = path
    ? !!matchPath(
        {
          path: path,
          end: true,
        },
        location.pathname
      )
    : false;


  const partialMatch = path
  ? !!matchPath(
      {
        path: path,
        end: false,
      },
      location.pathname
    )
  : false;

  const active = path === '/' ? exactMatch : partialMatch;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
    >
      <Button
        component={RouterLink}
        sx={{
          color: "text.secondary",
          fontWeight: "fontWeightNormal",
          justifyContent: "flex-start",
          textAlign: "left",
          pl: `${paddingLeft}px`,
          pr: "8px",
          py: "12px",
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightBold",
          }),
        }}
        variant="text"
        to={path}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
}
