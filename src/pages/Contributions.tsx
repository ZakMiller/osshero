import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function ContributionsPage() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contributions
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          See your latest contributions (coming soon).
        </Typography>
      </Box>
    </Container>
  );
}
