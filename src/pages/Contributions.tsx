import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { getContributions } from "../lib/api";

interface Repository {
  url: string;
  stars: number;
  name: string;
}
export default function ContributionsPage() {
  const user = "ZakMiller";
  const [repositories, setRepositories] = useState([] as Repository[]);

  useEffect(() => {
    async function init() {
      const contributions = await getContributions(user);
      const repos = contributions.user.repositoriesContributedTo.nodes
        .map((c) => {
          return { url: c.url, name: c.nameWithOwner, stars: c.stargazerCount };
        })
        .filter((r) => r.stars > 0);
      setRepositories(repos);
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
              </li>
            );
          })}
        </ul>
      </Box>
    </Container>
  );
}
