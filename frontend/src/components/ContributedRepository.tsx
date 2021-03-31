import {
    Card,
    CardContent,
    Chip,
    Container,
    Typography
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { Star } from "@material-ui/icons";
import React from "react";
import { Commit, Language, RepositoryWithDetails } from "../../../backend/src/shared/types"

function commitMessage(commit: Commit) {
  const messageLength = 60;
  const message =
    commit.commit.message.length > messageLength
      ? `${commit.commit.message.slice(0, messageLength)}...`
      : commit.commit.message;
  return (
    <Typography variant="body1" color="textSecondary" component="p" key={message}>
      {message}
    </Typography>
  );
}

function languageChip(language: Language) {
  return (
    <Chip
      key={language.name}
      size="small"
      sx={{ margin: ".2rem", backgroundColor: language.color, color: "#fff" }}
      label={language.name}
    />
  );
}

interface Props {
  repository: RepositoryWithDetails;
}
export default function ContributedRepository({ repository }: Props) {
  const languagesToDisplay = repository.languages.slice(0, 5);
  const commitsToDisplay = repository.commits.slice(0, 5);
  return (
    <Container maxWidth="sm" sx={{ marginTop: "1em", marginLeft: "0" }} disableGutters>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ display: "flex" }}
          >
            {repository.stars}
            <Star style={{ color: yellow[700] }} />{" "}
            {languagesToDisplay.map((l) => languageChip(l))}
          </Typography>
          <Typography variant="h3" component="h3">
            {repository.name}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="p">
            {repository.description}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="p">
            {repository.commits.length} commits {repository.issues.length}{" "}
            issues
          </Typography>
          {commitsToDisplay.map((c) => commitMessage(c))}
        </CardContent>
      </Card>
    </Container>
  );
}
