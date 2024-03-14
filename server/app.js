const express = require('express')

const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  setTimeout(() => {
    if(username === 'daniele' && password === 12345) {
      res.status(200).send('user found');
    } else {
      res.statusMessage = "Current username or password does not match";
      res.status(404).end();
    }
  }, 2000);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})