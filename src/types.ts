export interface User {
  name: string;
  login: string;
  score: number;
}

export interface Row {
  name: string;
  login: string;
  avatarUrl: string;
  createdRepositories: number;
  pullRequests: number;
  pullRequestReviews: number;
  issuesCreated: number;
  commits: number;
}

export type metric =
  | "createdRepositories"
  | "pullRequests"
  | "pullRequestReviews"
  | "issuesCreated"
  | "commits";

export interface Repository {
  url: string;
  stars: number;
  name: string;

}

interface RepositoryDetails {
  commits: {}[];
  issues: {}[];
}

export type RepositoryWithDetails = Repository & RepositoryDetails;
