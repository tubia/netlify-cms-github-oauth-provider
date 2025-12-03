const { randomBytes } = require('crypto');

module.exports = (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const scope = req.query.scope || 'repo,user';
  const state = randomBytes(16).toString('hex');
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${process.env.REDIRECT_URL}`;
  
  res.redirect(authUrl);
};
