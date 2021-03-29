import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { NavigateFunction } from "react-router";

interface Props {
  navigate: NavigateFunction;
}
export default function SearchForm({ navigate }: Props) {
  const [username, setUsername] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username) {
      navigate(`/profile/${username}`, { replace: true, state: {id: username} });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size="small"
        label="GitHub Username"
        value={username}
        onChange={handleChange}
      />
      <Button color="primary" type="submit" variant="contained" size="large">
        Search
      </Button>
    </form>
  );
}
