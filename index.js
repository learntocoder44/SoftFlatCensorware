import express from "express";
import db from "./db.js";
import User from "./models/user.js";
import bodyParser from "body-parser";
import passport from "passport";
import passportLocal from "passport-local";

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

passport.use(
  new passportLocal.Strategy(async (Username, Password, done) => {
    try {
      const user = await User.findOne({ username: Username });

      if (!user) {
        done(null, false, { message: "Username not found" });
        if (user.password == Password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "password does not match" });
        }
      }
    } catch (error) {
      res.status(500).send("interanl server error");
    }
  }),
);

const middleWare = passport.authenticate("local", { session: false });

app.get("/", middleWare, (req, res) => {
  res.send("Server is running");
});

app.post("/user", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);

    const response = await newUser.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
