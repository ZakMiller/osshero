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
  
    export interface Language {
      color: string;
      name: string;
  
    }
  
  export interface Repository {
    url: string;
    stars: number;
    name: string;
    description: string;
    languages: Language[];
  }
  
  export interface User {
    name: string;
    login: string;
    avatarUrl: string;
    repositories: RepositoryWithDetails[];
  }
  
  export interface Commit {
    commit: {
      message: string;
    };
  }
  
  interface RepositoryDetails {
    commits: Commit[];
    issues: {}[];
  }
  
  export type RepositoryWithDetails = Repository & RepositoryDetails;
  