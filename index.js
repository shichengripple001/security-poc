const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.json());

app.post('/run', (req, res) => {
  const userCommand = req.body.command;

  //  Command injection vulnerability
  exec(userCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

