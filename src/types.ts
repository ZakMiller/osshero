export interface ScoreboardUser {
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

export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  repositories: RepositoryWithDetails[];
}

interface RepositoryDetails {
  commits: {}[];
  issues: {}[];
}

export type RepositoryWithDetails = Repository & RepositoryDetails;
