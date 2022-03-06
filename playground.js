/*
CREATE DATABASE `hyk`;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  PRIMARY KEY (`id`)
);

Random image:
https://source.unsplash.com/random
*/

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

async function main() {
  const insertResult = await knex("images").insert({
    url: "https://images.unsplash.com/photo-1646406112287-6035555cf688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NjU2NzI4OA&ixlib=rb-1.2.1&q=80&w=1080",
  });
  console.log({ insertResult });

  const queryResult = await knex("images");
  console.log({ queryResult });
}

main().finally(() => knex.destroy());
