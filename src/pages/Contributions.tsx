import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { getContributions } from "../services/activity";
import { RepositoryWithDetails } from "../types";

export default function ContributionsPage() {
  const user = "ZakMiller";
  const [repositories, setRepositories] = useState(
    [] as RepositoryWithDetails[]
  );

  useEffect(() => {
    async function init() {
      const contributions = await getContributions(user);
      setRepositories(contributions);
    }
    init();
  }, []);
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Contributions
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          The repositories you've contributed to with at least one star.
        </Typography>
        <ul>
          {repositories.map((r) => {
            return (
              <li key={r.url}>
                <a href={r.url}>{r.name}</a> ({r.stars}☆)
                <div>{r.commits.length} commits</div>
                <div>{r.issues.length} issues</div>
              </li>
            );
          })}
        </ul>
      </Box>
    </Container>
  );
}
