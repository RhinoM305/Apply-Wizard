const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const discordRouter = require('./Discord/discord.router')

const express = require("express");

const app = express();

app.use(express.json());

app.use("/channels", discordRouter)


module.exports = app;