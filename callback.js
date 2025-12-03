module.exports = async (req, res) => {
  const { code } = req.query;
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: process.env.REDIRECT_URL
    })
  });
  
  const data = await tokenResponse.json();
  
  const script = `
    <script>
      if (window.opener) {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
          window.location.origin
        );
        window.close();
      }
    </script>
  `;
  
  res.send(script);
};
