import { Box, Container } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import Contributions from "../components/Contributions";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
  let params = useParams();
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Contributions id={params.id} navigate={navigate} />
      </Box>
    </Container>
  );
}
