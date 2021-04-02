const getStats = async (name: string) => {
  const result = await fetch(`http://localhost:3001/stats/${name}`);
  return result.json();
};

const getContributions = async (name: string) => {
  const result = await fetch(`http://localhost:3001/contributions/${name}`);
  return result.json();
};

const getAccessToken = async (code: string) => {
  const result = await fetch(`http://localhost:3001/accesstoken/${code}`);
  return result.json();
};

export { getStats, getContributions, getAccessToken };
