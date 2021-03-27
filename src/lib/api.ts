import { graphql } from "@octokit/graphql";
import { Row } from "../types";

interface ContributionsCollection {
  totalRepositoryContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalIssueContributions: number;
  totalCommitContributions: number;
}
interface Node {
  name: string;
  avatarUrl: string;
  login: string;
  contributionsCollection: ContributionsCollection;
}
interface StatsResponse {
  user: {
    contributionsCollection: ContributionsCollection;
    name: string;
    avatarUrl: string;
    login: string;
    following: {
      edges: { node: Node }[];
    };
  };
}

interface ContributionsResponse {
  user: {
    repositoriesContributedTo: {
      nodes: {
        nameWithOwner: string;
        stargazerCount: number;
        url: string;
      }[];
    };
  };
}

type Response = StatsResponse | ContributionsResponse;

async function getResult(query: string): Promise<Response> {
  const token = process.env.REACT_APP_GITHUB_KEY;
  const result: Response = await graphql(query, {
    headers: {
      authorization: `token ${token}`,
    },
  });
  return result;
}

function getRow({
  name,
  contributionsCollection,
  login,
  avatarUrl,
}: Node): Row {
  const {
    totalRepositoryContributions,
    totalPullRequestContributions,
    totalPullRequestReviewContributions,
    totalIssueContributions,
    totalCommitContributions,
  } = contributionsCollection;
  return {
    name,
    login,
    avatarUrl,
    createdRepositories: totalRepositoryContributions,
    pullRequests: totalPullRequestContributions,
    pullRequestReviews: totalPullRequestReviewContributions,
    issuesCreated: totalIssueContributions,
    commits: totalCommitContributions,
  };
}

const getStats = async (name: string) => {
  const query = `{
        user(login: "${name}") {
          contributionsCollection {
            totalRepositoryContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalIssueContributions
            totalCommitContributions
          }
          following(first: 100) {
            edges {
              node {
                id
                name
                avatarUrl
                login
                contributionsCollection {
                  totalRepositoryContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                  totalIssueContributions
                  totalCommitContributions
                }
              }
            }
          }
        }
      }`;
  const result = (await getResult(query)) as StatsResponse;
  const edges = result.user.following.edges;
  const me = getRow({ ...result.user, name });
  const following = edges.map((e) => getRow(e.node));
  const all = [me, ...following];
  return all;
};

const getContributions = async (name: string) => {
  const query = `{
    user(login: "${name}") {
      repositoriesContributedTo(privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}, first: 100, includeUserRepositories: true) {
        nodes {
          nameWithOwner
          stargazerCount
          url
        }
      }
    }
  }
  `;
  const result = (await getResult(query)) as ContributionsResponse;
  return result;
};

export { getStats, getContributions };
