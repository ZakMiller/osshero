import { getRepoDetails, getRepositoryContributionOverview } from "../lib/api";
import { Repository } from "../types";

async function addCommitsAndIssues(user: string, repo: Repository) {
  const [owner, name] = repo.name.split("/");
  let { commits, issues } = await getRepoDetails(user, owner, name);

  // Issues include PRs (but not all of them for some reason?)
  issues = issues.filter((i) => !i.pull_request);
  return { ...repo, commits, issues };
}

async function getContributions(user: string) {
  const contributions = await getRepositoryContributionOverview(user);
  const repos: Repository[] = contributions.user.repositoriesContributedTo.nodes
    .map((c) => {
      return { url: c.url, name: c.nameWithOwner, stars: c.stargazerCount };
    })
    .filter((r) => r.stars > 0);
  const results = await Promise.all(
    repos.map(async (r) => addCommitsAndIssues(user, r))
  );
  return results.filter((r) => r.commits.length > 0 || r.issues.length > 0);
}

export { getContributions };
