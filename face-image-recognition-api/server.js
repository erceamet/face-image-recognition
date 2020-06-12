const express = require("express");

const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Erce",
      email: "erce.amet@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Monika",
      email: "monika.zulyte@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "erce.amet@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // // Load hash from your password DB.
  // bcrypt.compare(
  //   "apples",
  //   "$2b$10$ECzVrr23t6obGlzcIAP5/.RVX4dtwgJWgtXcU2o1NPBEkHlweOcJa",
  //   function (err, result) {
  //     console.log("first guess", result);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2b$10$ECzVrr23t6obGlzcIAP5/.RVX4dtwgJWgtXcU2o1NPBEkHlweOcJa",
  //   function (err, result) {
  //     console.log("second guess", result);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
