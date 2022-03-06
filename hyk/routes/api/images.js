const express = require("express");
const router = express.Router();

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "my-secret-pw",
    database: "hyk",
  },
});

router.get("/", async function (req, res, next) {
  const data = await knex("images").orderBy("id");

  res.json({ data });
});

router.post("/", async function (req, res, next) {
  // TODO: Validate body
  const data = await knex("images").insert({ url: req.body.url });

  res.status(201).json({ data });
});

module.exports = router;
