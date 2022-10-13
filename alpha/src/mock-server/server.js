//npm modules
const express = require('express');
const uuid = require('uuid').v4;
const bodyParser = require('body-parser');
const db = require("./db.json");
const auth = require("./auth");
const login = require("./login");

// create the server
const app = express();
const port = 4000;

app.use(bodyParser.json());

// create the homepage route at '/'
app.get('/', (req, res) => {
  // console.log(req)
  const uniqueId = uuid();
  res.send(`Hit home page. Received the unique id: ${uniqueId}\n`);
});

app.get('/user', auth, (req, res) => {
  const { username, password } = req.user;
  const user = db.find(u => { return u.username === username });
  res.status(200).json(user);
})

app.get('/users', auth, (req, res) => {
  res.status(200).json(db);
})

// login route
login(app);

// tell the server what port to listen on
app.listen(port, () => {
  console.log('Listening on localhost:' + port);
});
