const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
    verifyKey,
  } = require('discord-interactions');

function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');
  
      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }


async function DiscordRequest(endpoint, options) {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    // Stringify payloads
    if (options.body) options.body = JSON.stringify(options.body);
    // Use node-fetch to make requests
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
      },
      ...options
    });
    // throw API errors
    if (!res.ok) {
      const data = await res.json();
      console.log(res.status);
      throw new Error(JSON.stringify(data));
    }
    // return original response
    return res;
  }

  async function createMessage(req,res,next) {
    let {channel_ID} = req.params;
    let body = req.body;

    let endpoint = `/channels/${channel_ID}/messages`;



    try {
        console.log("ran")
        await DiscordRequest(endpoint, {method:'POST', body:body});
        console.log(await res.json());
    } catch (err) {
        console.error('Error sending message: ', err);
    }
  }
  module.exports = {
    createMessage: [
        VerifyDiscordRequest(process.env.PUBLIC_KEY),
        createMessage,
    ]
  }