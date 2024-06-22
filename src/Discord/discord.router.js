const router = require("express").Router();
const controller = require("./discord.controller");

router
    .route("/:channel_ID/messages")
        .post(controller.createMessage)


module.exports = router