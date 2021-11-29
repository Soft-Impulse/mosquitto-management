const express = require("express");
const app = express();
const { exec } = require("child_process");

app.use(express.json());

app.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") return res.status(400).send("Username or password cannot be empty");

  exec(`mosquitto_passwd /etc/mosquitto/passwordfile ${username} ${password}`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (stderr) {
      return res.status(500).send(stderr);
    }
    return res.status(200).send(stdout);
  });
});

app.listen(3113, () => {
  console.log("Server started on port 3113");
});
