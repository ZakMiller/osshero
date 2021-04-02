import { Avatar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { getContributions } from "../lib/api";
import theme from "../theme";
import { User } from "../../../backend/src/shared/types";
import ContributedRepository from "./ContributedRepository";
import ProfileSearchForm from "./ProfileSearchForm";
import ContributionsLoader from "./ContributionsLoader";

interface Props {
  id: string;
  navigate: NavigateFunction;
}

function getName(user: User) {
  if (!user.name) return user.login;
  return `${user.name} (${user.login})`;
}
export default function Contributions({ id, navigate }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadContributions(id: string) {
      try {
        setUser(null);
        const userResponse = await getContributions(id);
        setUser(userResponse);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    loadContributions(id);
  }, [id]);

  if (errorMessage)
    return (
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          User Contributions
        </Typography>
        <div>{errorMessage}</div>
        <div>Want to find another user?</div>
        <ProfileSearchForm navigate={navigate}></ProfileSearchForm>
      </>
    );
  if (user == null)
    return (
      <>
        <ContributionsLoader />
      </>
    );

  const name = getName(user);
  return (
    <div>
      <Box display="flex" alignItems="center" pb="2em">
        <Avatar
          sx={{
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginRight: "1em",
          }}
          alt={name}
          src={user.avatarUrl}
        />
        <Typography variant="h4" component="h1">
          {name}
        </Typography>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Open Source Contributions
      </Typography>
      {user.repositories.map((r) => (
        <ContributedRepository
          key={r.url}
          repository={r}
        ></ContributedRepository>
      ))}
      <Box pb={4}>
        <div>Want to find another user?</div>
        <ProfileSearchForm navigate={navigate}></ProfileSearchForm>
      </Box>
    </div>
  );
}
