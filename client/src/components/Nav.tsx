import { AppBar, AppBarProps, Box, Button, Container } from "@material-ui/core";
import { experimentalStyled } from "@material-ui/core/styles";
import React from "react";
import { Link, Route } from "react-router-dom";
import { getSignInCode } from "../lib/github";
import NavItem from "./NavItem";

interface NavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const Root = experimentalStyled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "none",
  color: theme.palette.primary.main,
  zIndex: 100,
}));

export default function Nav(props: NavbarProps) {
  return (
    <Root>
      <Container maxWidth="md" sx={{display: 'flex', padding: '1em'}}>
        <Box>
          <NavItem path="/" title="Leaderboard" />
        </Box>
        <Box>
          <NavItem path="/profile" title="Profile" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />
        <Box>
          <Button variant="contained" color="primary" onClick={getSignInCode}>Sign In</Button>
          
        </Box>
      </Container>
    </Root>
  );
}
