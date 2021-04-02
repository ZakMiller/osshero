import { Button, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { getStats } from "../lib/api";
import ErrorMessage from "../components/ErrorMessage";
import Leaderboard from "../components/Leaderboard";
import MetricRadio from "../components/MetricRadio";
import { metric, Row } from "../types";
import { getUser } from "../util/factory";

export default function LeaderboardPage() {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [metric, setMetric] = useState<metric>("commits");
  const users = rows.map((r) => getUser(r, metric));
  const [username, setUsername] = useState("SylvanSign");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  async function getRecords(username: string) {
    try {
      setRows([]);
      const result = await getStats(username);
      setRows(result);
    } catch (error) {
      setOpen(true);
      setMessage(error.message);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username) {
      getRecords(username);
    }
  };

  const clickedUser = (username: string) => {
    setUsername(username);
    getRecords(username);
  };

  useEffect(() => {
    getRecords("SylvanSign");
  }, []);
  return (
    <Container maxWidth="md">
      <ErrorMessage open={open} setOpen={setOpen} message={message} />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Open Source Leaderboard
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          See how you compare to your friends on GitHub.
        </Typography>
        <Box display="flex" p={4}>
          <MetricRadio metric={metric} setMetric={setMetric} />
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="GitHub Username"
              value={username}
              onChange={handleChange}
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              size="large"
            >
              Update
            </Button>
          </form>
        </Box>

        {!open ? <Leaderboard users={users} setUser={clickedUser} /> : <></>}
      </Box>
    </Container>
  );
}
