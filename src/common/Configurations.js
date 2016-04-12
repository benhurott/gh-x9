'use_strict'

module.exports = (function(){

  // define the server port.
  var PORT = process.env.PORT || process.env.GH_X9_PORT || 3000;

  // define the server url
  var BASE_URL = process.env.GH_X9_URL || 'http://localhost:' + PORT;

  return {
    server: {
      base_url: BASE_URL,
      port: PORT
    },
    github: {
      url_auth: 'https://github.com/login/oauth/authorize',
      //generated by: https://github.com/settings/applications/new
      client_id: process.env.GH_X9_CLIENT_ID,
      client_secret: process.env.GH_X9_CLIENT_SECRET,
      redirect_uri: {
        relative: '/auth/github/callback',
        full: BASE_URL + '/auth/github/callback'
      },
      scope: [],
      // create a random string to use in authentication
      state: process.env.GH_X9_STATE
    }
  };
})();