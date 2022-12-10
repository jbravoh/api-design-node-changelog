import express from "express";

const app = express();

// app is the entire api
app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});


export default app;
