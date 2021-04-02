function getSignInCode() {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  console.log(clientId)
  const redirectUri = "http://localhost:3000/callback";
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  window.location.replace(url);
}

function signOut() {}

export { getSignInCode, signOut };
