import fetch from "node-fetch";
import express from "express";


// promises style - new since version 3

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  next();
});

app.use("/api/whoami", async (req, res, next) => {
  const response = await fetch(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=b0006e8aee8644b3aae459519a12de80"
  );
  const data = await response.json();
  const result = {
    ipaddress: data.ip_address,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  };
  return res.json(result);
});

app.use("/", (req, res, next) => {
  return res.render("index");
});

app.listen(3000);
