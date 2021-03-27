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
interface Response {
  user: {
    contributionsCollection: ContributionsCollection;
    name: string;
    avatarUrl: string;
    login: string;
    following: {
      edges: {node: Node}[];
    };
  };
}

function getRow({name, contributionsCollection, login, avatarUrl}: Node): Row {
    const { totalRepositoryContributions,
        totalPullRequestContributions,
        totalPullRequestReviewContributions,
        totalIssueContributions,
        totalCommitContributions} = contributionsCollection;
    return {
        name,
        login,
        avatarUrl,
        createdRepositories: totalRepositoryContributions,
        pullRequests: totalPullRequestContributions,
        pullRequestReviews: totalPullRequestReviewContributions,
        issuesCreated: totalIssueContributions,
        commits: totalCommitContributions
    }
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
  const token = process.env.REACT_APP_GITHUB_KEY;
    const result: Response = await graphql(query, {
      headers: {
        authorization: `token ${token}`,
      },
    });
    const edges = result.user.following.edges;
    const me = getRow({...result.user, name})
    const following = edges.map(e => getRow(e.node));
    const all = [me, ...following];
    return all;
};

export {getStats};
