import { Container, Typography } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileSearchForm from "../components/ProfileSearchForm";

export default function ProfileSearch() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Lookup Github user
      </Typography>
      <Typography variant="subtitle1" component="p" gutterBottom>
        See an overview of a user's open source contributions!
      </Typography>
      <ProfileSearchForm navigate={navigate}></ProfileSearchForm>
    </Container>
  );
}
