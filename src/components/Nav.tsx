import { AppBar, AppBarProps, Box, Container } from "@material-ui/core";
import { experimentalStyled } from "@material-ui/core/styles";
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
      <Container maxWidth="md" sx={{display: 'flex'}}>
        <Box>
          <NavItem path="/" title="Leaderboard" />
        </Box>
        <Box>
          <NavItem path="/contributions" title="Contributions" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />
      </Container>
    </Root>
  );
}
