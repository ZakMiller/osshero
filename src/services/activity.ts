import { getRepoDetails, getRepositoryContributionOverview } from "../lib/api";
import { Repository, User } from "../types";

async function addCommitsAndIssues(user: string, repo: Repository) {
  const [owner, name] = repo.name.split("/");
  let { commits, issues } = await getRepoDetails(user, owner, name);

  // Issues include PRs (but not all of them for some reason?)
  issues = issues.filter((i) => !i.pull_request);
  return { ...repo, commits, issues };
}

async function getContributions(login: string) {
  const contributions = await getRepositoryContributionOverview(login);
  const repos: Repository[] = contributions.user.repositoriesContributedTo.nodes
    .map((c) => {
      return { url: c.url, name: c.nameWithOwner, stars: c.stargazerCount };
    })
    .filter((r) => r.stars > 0);
  const results = await Promise.all(
    repos.map(async (r) => addCommitsAndIssues(login, r))
  );
  const filteredRepos = results.filter(
    (r) => r.commits.length > 0 || r.issues.length > 0
  );
  const user: User = {
    login,
    name: contributions.user.name,
    avatarUrl: contributions.user.avatarUrl,
    repositories: filteredRepos,
  };
  return user;
}

export { getContributions };
