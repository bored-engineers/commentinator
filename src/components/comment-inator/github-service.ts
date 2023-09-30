const GITHUB_URL = 'https://api.github.com/user/';
export const getGithubUser = githubId =>
  fetch(GITHUB_URL + githubId)
    .then(result => result.json())
    .then(user => ({ imageUrl: user.avatar_url, username: user.login, name: user.name }));
