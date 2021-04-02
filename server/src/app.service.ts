import { HttpService, Injectable } from '@nestjs/common';
import {
  getRepoDetails,
  getRepositoryContributionOverview,
  getStats,
} from './api';
import { Repository, User } from './shared/types';
import request from 'request';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getStats(user: string) {
    const token = process.env.GITHUB_KEY;
    return getStats(user, token);
  }

  async addCommitsAndIssues(user: string, repo: Repository) {
    const token = process.env.GITHUB_KEY;
    const [owner, name] = repo.name.split('/');
    let { commits, issues } = await getRepoDetails(user, owner, name, token);

    // Issues include PRs (but not all of them for some reason?)
    issues = issues.filter((i) => !i.pull_request);
    return { ...repo, commits, issues };
  }

  async getContributions(login: string) {
    const token = process.env.GITHUB_KEY;
    const contributions = await getRepositoryContributionOverview(login, token);
    const repos: Repository[] = contributions.user.repositoriesContributedTo.nodes
      .map((c) => {
        return {
          url: c.url,
          name: c.nameWithOwner,
          stars: c.stargazerCount,
          languages: c.languages.nodes,
          description: c.description,
        };
      })
      .filter((r) => r.stars > 0);
    const results = await Promise.all(
      repos.map(async (r) => this.addCommitsAndIssues(login, r)),
    );
    const filteredRepos = results.filter(
      (r) => r.commits.length > 0 || r.issues.length > 0,
    );
    const user: User = {
      login,
      name: contributions.user.name,
      avatarUrl: contributions.user.avatarUrl,
      repositories: filteredRepos,
    };
    return user;
  }

  async getAccessToken(code: string) {
    interface GithubAccessTokenResponse {
      access_token: string;
      token_type: string;
      scope: string;
    }
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    const result: GithubAccessTokenResponse = (await this.httpService
      .post(
        url,
        {},
        {
          headers: { Accept: 'application/json' },
        },
      )
      .toPromise()).data;

    return {accessToken: result.access_token};
  }
}
