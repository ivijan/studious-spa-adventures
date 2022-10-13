const jwt = require('jsonwebtoken');

const login = (app) => {
  const accessTokenSecret = 'youraccesstokensecret';
  const db = require("./db.json");

  app.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = db.find(u => { return u.username === username && u.password === password });

    if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

      res.json({
        accessToken
      });
    } else {
      res.send('Username or password incorrect');
    }
  });

}

module.exports = login;